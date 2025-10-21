# Supabase Setup Guide

This guide will walk you through setting up Supabase for the authentication system.

## 1. Database Migrations

Run the SQL migrations in order:

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Run each migration file from the `migrations/` folder in order:
   - `001_create_users_table.sql`
   - `002_create_verification_codes_table.sql`

## 2. Phone Authentication Setup

1. Navigate to **Authentication** → **Providers** in your Supabase dashboard
2. Enable **Phone** authentication
3. Configure Twilio settings:
   - Add your Twilio Account SID
   - Add your Twilio Auth Token
   - Add your Twilio phone number
4. Save the configuration

## 3. Storage Bucket Setup

Create a storage bucket for profile pictures:

1. Navigate to **Storage** in the left sidebar
2. Click **New bucket**
3. Configure the bucket:
   - **Name**: `profile-pictures`
   - **Public bucket**: ✅ Yes (checked)
4. Click **Create bucket**

### Set Storage Policies

After creating the bucket, set up the following policies:

1. Click on the `profile-pictures` bucket
2. Go to **Policies** tab
3. Add the following policies:

#### Policy 1: Allow Public Read Access
```sql
CREATE POLICY "Public can view profile pictures"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');
```

#### Policy 2: Allow Authenticated Users to Upload
```sql
CREATE POLICY "Authenticated users can upload profile pictures"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-pictures');
```

#### Policy 3: Allow Users to Update Their Pictures
```sql
CREATE POLICY "Users can update their own pictures"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-pictures');
```

## 4. Environment Variables

Make sure your `.env` file has the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

You can find these values in:
- **Settings** → **API** in your Supabase dashboard

## 5. Testing the Setup

1. Navigate to `/artist` in your app
2. Click the profile icon in the top right
3. Enter your phone number
4. You should receive a 4-digit verification code via SMS
5. Enter the code and complete your profile setup

## Troubleshooting

### SMS not sending
- Verify Twilio credentials are correct in Supabase
- Check Twilio account balance
- Ensure phone number is in E.164 format (+1XXXXXXXXXX)

### Upload errors
- Verify storage bucket is public
- Check storage policies are set correctly
- Ensure user is authenticated before uploading

### Database errors
- Verify all migrations ran successfully
- Check RLS policies are enabled
- Review Supabase logs in the dashboard
