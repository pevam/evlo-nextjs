-- Create certificate_emails table
CREATE TABLE IF NOT EXISTS certificate_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  car_model TEXT NOT NULL,
  report_id TEXT NOT NULL,
  score NUMERIC NOT NULL,
  sent_at TIMESTAMP NOT NULL,
  resend_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_certificate_emails_email ON certificate_emails(email);
CREATE INDEX IF NOT EXISTS idx_certificate_emails_report_id ON certificate_emails(report_id);
CREATE INDEX IF NOT EXISTS idx_certificate_emails_sent_at ON certificate_emails(sent_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE certificate_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow inserts" ON certificate_emails
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reads
CREATE POLICY "Allow reads" ON certificate_emails
  FOR SELECT
  USING (true);
