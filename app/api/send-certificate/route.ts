import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabase';

interface CertificateRequest {
  email: string;
  carModel: string;
  reportId: string;
  score: string;
  pdfData: string; // Base64 encoded PDF
}

export async function POST(request: NextRequest) {
  try {
    const body: CertificateRequest = await request.json();
    const { email, carModel, reportId, score, pdfData } = body;

    // Validate input
    if (!email || !carModel || !reportId || !pdfData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Resend with API key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Send email with PDF attachment
    const pdfBuffer = Buffer.from(pdfData, 'base64');
    
    const emailResponse = await resend.emails.send({
      from: 'certificates@evlo.io',
      to: email,
      subject: `EVLO Certificate - ${carModel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>EVLO Battery Diagnostic Certificate</h2>
          <p>Dear User,</p>
          <p>Your EVLO battery diagnostic certificate is ready!</p>
          <div style="background: #f0f8ff; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Vehicle:</strong> ${carModel}</p>
            <p><strong>Certificate ID:</strong> ${reportId}</p>
            <p><strong>Battery Health (SoH):</strong> ${score}%</p>
          </div>
          <p>Please find the detailed certificate attached to this email.</p>
          <p>You can also download it using the link provided in your dashboard.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">
            This is an automated message from EVLO. Please do not reply to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `EVLO-${reportId}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (emailResponse.error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Store email record in Supabase
    const supabase = getSupabase();
    const { data, error: supabaseError } = await supabase
      .from('certificate_emails')
      .insert([
        {
          email,
          car_model: carModel,
          report_id: reportId,
          score: parseFloat(score),
          sent_at: new Date().toISOString(),
          resend_id: emailResponse.data?.id || reportId,
        },
      ])
      .select();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Email was sent successfully, so don't fail the response
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Certificate email sent successfully',
        emailId: emailResponse.data?.id,
        databaseId: data?.[0]?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Certificate email error:', error);
    return NextResponse.json(
      { error: 'Failed to send certificate email' },
      { status: 500 }
    );
  }
}
