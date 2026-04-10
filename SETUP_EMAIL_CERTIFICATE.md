# Email Certificate Setup Instructions

## Environment Variables Required

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. In the SQL Editor, run the migration from: `supabase/migrations/001_create_certificate_emails.sql`
3. Copy your project URL and anon key to `.env.local`

## Resend Setup

1. Sign up at https://resend.com (free tier available)
2. Get your API key from the dashboard
3. Verify your domain or use the default `@evlo.io` subdomain
4. Add API key to `.env.local`

## API Endpoint

The email endpoint is available at: `POST /api/send-certificate`

### Request Body:
```json
{
  "email": "user@example.com",
  "carModel": "Tesla Model 3",
  "reportId": "EVLO-ABC123",
  "score": "85.5",
  "pdfData": "base64_encoded_pdf_string"
}
```

### Response:
```json
{
  "success": true,
  "message": "Certificate email sent successfully",
  "emailId": "email_id_from_resend",
  "databaseId": "database_record_id"
}
```

## Implementation in EmailModal

The EmailModal component should:

1. Collect the user's email
2. Generate the PDF (already done via react-to-print)
3. Convert PDF to Base64
4. Call `/api/send-certificate` with the PDF data
5. Show success/error message

## Database Schema

Table: `certificate_emails`
- id: UUID (primary key)
- email: TEXT
- car_model: TEXT
- report_id: TEXT
- score: NUMERIC
- sent_at: TIMESTAMP
- resend_id: TEXT
- created_at: TIMESTAMP (auto)

## Features

✅ Email with PDF attachment
✅ Email with download link
✅ Database storage of email records
✅ Indexed for fast queries
✅ Error handling

## Next Steps

1. Configure environment variables
2. Run Supabase migration
3. Update EmailModal to call /api/send-certificate
4. Test email sending in development
5. Deploy to production
