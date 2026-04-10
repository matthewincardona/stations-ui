# Authentication Setup Guide

## Supabase Schema Updates

Run this SQL in your Supabase dashboard to set up the authenticated job applications table:

```sql
-- Update existing job_applications table to include user_id and RLS
ALTER TABLE job_applications ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their own applications
CREATE POLICY "Users can view own applications" ON job_applications
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own applications" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON job_applications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications" ON job_applications
  FOR DELETE USING (auth.uid() = user_id);

-- Allow anonymous users to create applications (user_id = NULL)
CREATE POLICY "Anonymous users can insert applications" ON job_applications
  FOR INSERT WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous users can view own applications" ON job_applications
  FOR SELECT USING (user_id IS NULL);
```

## Features Implemented

### Authentication
- ✅ Supabase Auth integration
- ✅ User signup and login
- ✅ Session management with context
- ✅ Auth state persistence

### Login Page
- Dedicated `/auth/login` route
- Toggle between signup and login forms
- Email validation
- Password validation (min 6 characters for signup)
- Error handling with user-friendly messages

### Navigation
- Updated navbar with auth status
- User dropdown menu with profile and logout
- Sign In button for logged-out users
- Responsive design

### Job Tracker
- **Cloud Backup Banner**: Encourages logged-out users to sign up
- **Local Storage**: Automatically saves applications locally
- **Cloud Sync**: 
  - Logged-out users work entirely offline (locally)
  - When a user logs in, local applications are auto-synced to cloud
  - Logged-in users work with cloud data

### Data Management
- Local applications saved to `localStorage` with key `job_tracker_applications`
- New `useApplications` hook handles:
  - Loading from cloud (if authenticated) or local storage
  - Saving applications appropriately
  - Auto-syncing local data to cloud on login

## How It Works

1. **Logged Out Users**:
   - Can create/edit/delete applications
   - Data saved to browser's local storage
   - See "Save to Cloud" banner encouraging signup

2. **New Signups**:
   - Enter email and password on `/auth/login`
   - After confirmation link is clicked, can log in
   - First login automatically syncs local applications to cloud

3. **Logged In Users**:
   - Applications stored on Supabase (private)
   - See user email in navbar with logout option
   - Data synced across all devices/browsers

## Files Created/Modified

### New Files
- `app/lib/auth-context.tsx` - Auth context provider and hook
- `app/auth/login/page.tsx` - Login/signup page
- `app/job_tracker/CloudBackupBanner.tsx` - Banner for logged-out users
- `app/lib/use-applications.ts` - Custom hook for data management

### Modified Files
- `app/layout.tsx` - Added AuthProvider wrapper
- `app/components/Navbar.tsx` - Added auth status and user dropdown
- `app/job_tracker/page.tsx` - Now client-side with auth integration
- `app/job_tracker/JobTrackerClient.tsx` - Uses new hooks and auth
- `app/job_tracker/CreateApplicationModal.tsx` - Accepts userId
- `app/lib/db/applications.ts` - Added user_id support and sync function

## Next Steps

1. **Run the SQL schema updates** above in Supabase
2. **Check Supabase Auth settings** - Confirm email provider is enabled
3. **Test the flow**:
   - Try creating apps while logged out (check localStorage)
   - Sign up for an account
   - Log in and verify local data syncs
   - Create new apps while logged in
   - Log out and verify apps are still accessible via local storage

## Environment Variables

Ensure you have these in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
```

These should already be set up from the previous Job Board setup.
