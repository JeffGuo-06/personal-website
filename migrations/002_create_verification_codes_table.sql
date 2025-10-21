-- Create verification codes table for SMS authentication
CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on phone_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_verification_codes_phone_number ON verification_codes(phone_number);

-- Create index on expires_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);

-- Enable Row Level Security
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow inserts (for creating verification codes)
CREATE POLICY "Allow inserting verification codes"
  ON verification_codes
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Allow reads (for checking verification codes)
CREATE POLICY "Allow reading verification codes"
  ON verification_codes
  FOR SELECT
  USING (true);

-- Create policy: Allow updates (for marking as verified)
CREATE POLICY "Allow updating verification codes"
  ON verification_codes
  FOR UPDATE
  USING (true);

-- Create function to clean up old verification codes
CREATE OR REPLACE FUNCTION cleanup_old_verification_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM verification_codes
  WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;
