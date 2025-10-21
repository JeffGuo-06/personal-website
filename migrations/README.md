# Database Migrations

This folder contains SQL migration files for the Supabase database.

## How to Apply Migrations

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to the SQL Editor
3. Copy and paste each migration file in order (001, 002, etc.)
4. Execute each migration

## Migration Files

- `001_create_users_table.sql` - Creates the users table for storing profile information
- `002_create_verification_codes_table.sql` - Creates the verification_codes table for SMS authentication

## Tables

### users
- Stores user profile information (name, phone number, profile picture)
- Has RLS (Row Level Security) enabled

### verification_codes
- Stores SMS verification codes with expiration
- Used for phone number authentication
- Has RLS enabled
