# Vercel Deployment Guide

This guide walks you through deploying the portfolio with full admin login functionality on Vercel.

## Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Search for your `fadyportfolio` repository
5. Click **"Import"**

## Step 3: Set Environment Variables in Vercel

This is **CRITICAL** for login to work. Follow these exact steps:

### 3.1 Find Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Anon Public Key** (JWT token)
   - **Project ID** (alphanumeric code)

### 3.2 Add Environment Variables to Vercel

**IMPORTANT**: Environment variables must have the `VITE_` prefix to be accessible in the frontend.

In the Vercel project settings, add these environment variables:

| Variable Name | Value | Example |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase Project URL | `https://yourproject.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Anon Public Key | `eyJhbGciOiJIUzI1NiIs...` |
| `VITE_SUPABASE_PROJECT_ID` | Your Project ID | `abcdef1234567` |

**To add them in Vercel:**
1. Click your project
2. Go to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Enter each variable name and value from above
5. Select **"Production"**, **"Preview"**, and **"Development"**
6. Click **"Save"**
7. Repeat for all three variables

### 3.3 Verify Variables in Vercel UI

You should see all three variables listed:
- ✅ VITE_SUPABASE_URL
- ✅ VITE_SUPABASE_PUBLISHABLE_KEY
- ✅ VITE_SUPABASE_PROJECT_ID

## Step 4: Trigger Deployment

After setting environment variables:

1. Go back to the **Deployments** tab
2. Click on the most recent deployment
3. Click **"Redeploy"** button
4. Wait for build to complete (usually 1-2 minutes)

## Step 5: Test Login on Vercel

1. Once deployment is complete, click the **"Domains"** link
2. Visit your Vercel deployment URL
3. Test admin login with your credentials

### If Login Still Fails:

**Check 1: CORS Issues**
- Open browser DevTools (F12)
- Go to **Console** tab
- Check for CORS or network errors
- If you see CORS errors, update Supabase CORS settings

**Check 2: Database Admin User Record**
- Go to your Supabase Dashboard
- Navigate to **SQL Editor**
- Run this query to verify your admin user exists:
  ```sql
  SELECT * FROM admin_users WHERE user_id = 'YOUR_USER_ID_HERE';
  ```
- If no results, add yourself as admin:
  ```sql
  INSERT INTO admin_users (user_id, is_active) 
  VALUES ('YOUR_USER_ID_HERE', true);
  ```
- You can find your user ID in the Supabase **Authentication** → **Users** table

**Check 3: Verify Environment Variables**
- In Vercel, go to **Settings** → **Environment Variables**
- Check that all three VITE_ variables are present and contain correct values
- The values should NOT have quotes around them

## Step 6: Supabase CORS Configuration (Optional but Recommended)

To ensure smooth login across domains:

1. Go to your Supabase project settings
2. Click **Settings** → **API**
3. Scroll to **CORS Settings**
4. Add your Vercel domain (e.g., `https://yourname.vercel.app`)
5. Save changes

## Troubleshooting

### Build Fails on Vercel
- Check build logs: Click the failed deployment → Build tab
- Common causes:
  - Missing environment variables
  - TypeScript errors
  - Incompatible Node.js version (should be 18+)

### Build Succeeds but Login Fails
- This usually means environment variables aren't loaded
- Verify all three `VITE_` variables are in Vercel settings
- Redeploy after adding variables

### Admin Dashboard Not Accessible
- Check that you're logged in with an admin account
- Verify admin user exists in `admin_users` table in Supabase
- Check browser console for errors (F12)

### Getting "Could not verify admin access" Again
- This means the Supabase function call is failing
- Usually caused by missing admin record in database
- Add your user ID to `admin_users` table as shown in "Check 2" above

## Environment Variables Explained

| Variable | Purpose | Format |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase backend | HTTPS URL ending in `.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public authentication key | JWT token (starts with `eyJ`) |
| `VITE_SUPABASE_PROJECT_ID` | Project identifier | Alphanumeric code from dashboard |

The `VITE_` prefix is **required** for Vite to inject these into the frontend build.

## Local Development vs. Production

**For local development**, create a `.env` file in the project root:
```
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
VITE_SUPABASE_PROJECT_ID=abcdef1234567
```

**For Vercel**, these MUST be set in Vercel's Environment Variables dashboard.

## Next Steps

After successful deployment:

1. Update your portfolio content via the admin dashboard
2. Configure design settings for your portfolio
3. Verify all features work on the production domain
4. Set up a custom domain (optional)

## Support

If you encounter issues:

1. Check Vercel deployment logs (Deployments → Failed build)
2. Verify all Environment Variables are set correctly
3. Check browser console for errors (F12)
4. Verify admin user exists in Supabase database
