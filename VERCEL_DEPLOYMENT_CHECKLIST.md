# Vercel Deployment - Quick Checklist

Complete this checklist to get your portfolio with working login on Vercel.

## Step-by-Step Deployment

### ✅ Step 1: Code is Pushed (DONE)
Your code has been committed and pushed to GitHub main branch.

```bash
# Already done!
# git push origin main
```

### ✅ Step 2: Create Vercel Project
- [ ] Go to https://vercel.com
- [ ] Click "Add New" → "Project"
- [ ] Import your `fadyportfolio` GitHub repository
- [ ] Click "Import"

### ✅ Step 3: Configure Environment Variables (CRITICAL!)
**This is the most important step for login to work.**

In Vercel project settings → Environment Variables:

1. [ ] Add `VITE_SUPABASE_URL`
   - Get from Supabase Dashboard → Settings → API → Project URL
   - Example: `https://yourproject.supabase.co`

2. [ ] Add `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Get from Supabase Dashboard → Settings → API → Anon Public Key
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. [ ] Add `VITE_SUPABASE_PROJECT_ID`
   - Get from Supabase Dashboard → Settings → General → Project ID
   - Example: `xyzabc123456`

**IMPORTANT**: Select **Production**, **Preview**, and **Development** for each variable.

### ✅ Step 4: Trigger Deploy
- [ ] Go back to Deployments tab
- [ ] Click on the most recent deployment
- [ ] Click "Redeploy"
- [ ] Wait for build to complete (1-2 minutes)

### ✅ Step 5: Test Login
- [ ] Click the domain link to visit your Vercel site
- [ ] Try logging in with your admin account
- [ ] If login fails, see troubleshooting below

## If Login Still Fails

### Check 1: Verify Admin User Exists
Go to Supabase Dashboard:
1. Click **SQL Editor**
2. Run this query:
   ```sql
   SELECT * FROM admin_users;
   ```
3. If no results:
   - Go to **Authentication** → **Users**
   - Copy your user ID
   - Go back to **SQL Editor**
   - Run:
     ```sql
     INSERT INTO admin_users (user_id, is_active) 
     VALUES ('YOUR_USER_ID_HERE', true);
     ```

### Check 2: Verify Environment Variables in Vercel
1. Click your Vercel project
2. Go to **Settings** → **Environment Variables**
3. Confirm all three `VITE_` variables are present:
   - ✅ VITE_SUPABASE_URL (should look like https://...)
   - ✅ VITE_SUPABASE_PUBLISHABLE_KEY (should look like eyJ...)
   - ✅ VITE_SUPABASE_PROJECT_ID (alphanumeric)
4. If missing, add them and **Redeploy**

### Check 3: Check Browser Console for Errors
1. On your Vercel domain, press **F12**
2. Go to **Console** tab
3. Look for red error messages
4. Common errors:
   - "CORS" → Add your Vercel domain to Supabase CORS
   - "Could not verify" → Admin user missing from database
   - "Unauthorized" → Environment variables not set

## Environment Variables Quick Copy-Paste

In Vercel Environment Variables, set these exactly:

| Name | Value |
|------|-------|
| VITE_SUPABASE_URL | `https://[project-id].supabase.co` |
| VITE_SUPABASE_PUBLISHABLE_KEY | (Copy from Supabase Settings → API) |
| VITE_SUPABASE_PROJECT_ID | (Found in Supabase Settings → General) |

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails on Vercel | Check build logs. Verify Node.js version (18+) |
| Build succeeds, login fails | Environment variables not set. Add all three VITE_ vars |
| "Could not verify admin access" | Admin user missing from database. Add to admin_users table |
| CORS errors in console | Add your Vercel domain to Supabase CORS settings |
| Login form appears but submit fails | Network error. Check Supabase status page |

## Need Help?

Refer to the full guide: [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)

## Files Updated for Vercel

- ✅ `vercel.json` - Build configuration
- ✅ `.vercelignore` - Optimized build files
- ✅ `VERCEL_DEPLOYMENT_GUIDE.md` - Detailed guide
