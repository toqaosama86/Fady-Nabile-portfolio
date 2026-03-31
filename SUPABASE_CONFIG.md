# Supabase Configuration for Vercel Deployment

This guide ensures your Supabase authentication works correctly on all Vercel deployments.

## ⚠️ CRITICAL: URL Configuration in Supabase

Your authenticated user has confirmed that **Supabase auth is working**, but login appears broken on the main Vercel domain. This is because Supabase needs to know which domains can redirect after login.

### Step 1: Add Your Domains to Supabase

1. Go to your Supabase project dashboard
2. Navigate to: **Authentication → URL Configuration**
3. Update the following fields:

#### Site URL (Main Production Domain)
```
https://fady-nabile-portfolio.vercel.app
```

#### Redirect URLs (Add ALL of these)
```
https://fady-nabile-portfolio.vercel.app
https://fady-nabile-portfolio.vercel.app/admin
https://fady-nabile-portfolio.vercel.app/admin/login
https://[YOUR_PREVIEW_URL]
https://[YOUR_PREVIEW_URL]/admin
https://[YOUR_PREVIEW_URL]/admin/login
```

**To find your preview URL:**
- Go to Vercel dashboard → Your project → Deployments
- Copy the Git preview deployment URL (looks like: `https://fady-nabile-portfolio-git-main-toqaosama86-XXXXXX.vercel.app`)

### Step 2: Verify Admin User Exists

Your authenticated user has ID: `8bdb256f-53ab-4455-8882-a1fd7c4df71b`

1. Go to your Supabase project dashboard
2. Navigate to: **SQL Editor**
3. Run this query to check if the admin user exists:

```sql
SELECT * FROM public.admin_users 
WHERE user_id = '8bdb256f-53ab-4455-8882-a1fd7c4df71b';
```

**If the query returns no rows:**
- Run this to add your user as admin:

```sql
INSERT INTO public.admin_users (user_id, is_active) 
VALUES ('8bdb256f-53ab-4455-8882-a1fd7c4df71b', true)
ON CONFLICT (user_id) DO NOTHING;
```

### Step 3: Verify Email is Confirmed

Your user shows `confirmed_email: true` in Supabase, which is correct. No action needed.

---

## 🔍 Troubleshooting: Why Preview Works but Main Domain Doesn't

### Possible Causes:

1. **Missing URL Configuration** ← Most likely
   - Preview URL may be automatically added, but main domain needs manual configuration
   - Fix: Add all URLs from Step 1 above

2. **Missing Admin Record** ← Second most likely
   - User exists in Supabase auth but not in `admin_users` table
   - Fix: Run the SQL insert from Step 2 above

3. **Environment Variables Not Set** ← Verify but less likely
   - The fact that auth works on preview suggests these are set
   - Verify in Vercel dashboard that these exist:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`

4. **Browser Cache** ← Try this first
   - Open an **Incognito/Private window**
   - Go directly to: `https://fady-nabile-portfolio.vercel.app/admin/login`
   - Test login without switching domains during the test

---

## 📋 Testing Checklist

- [ ] Added Site URL to Supabase
- [ ] Added all Redirect URLs (both main and preview domains)
- [ ] Verified admin user exists in `admin_users` table
- [ ] Cleared browser cache (or use incognito window)
- [ ] Environment variables set in Vercel
- [ ] Test login on main domain only (don't switch between preview and main)
- [ ] Check browser console for error messages (F12)

---

## 🛠️ Debug: Check Console Logs

When testing login on Vercel, open the browser developer console (F12) and check for:

**Good signs:**
```
[Auth] Step 1: Attempting sign-in with email: your-email@example.com
[Auth] Step 2: Sign-in successful, user ID: 8bdb256f-53ab-4455-8882-a1fd7c4df71b
[Auth] Step 3: Verifying admin access...
[Auth] Admin verification result: { isAdminUser: true, adminError: null }
[Auth] Step 4: Updating session state...
[Auth] Sign-in complete!
```

**Bad signs to debug:**
- `adminError` is not null → Check admin_users table
- `isAdminUser: false` → User is in auth but not marked as admin
- Network errors → Check Supabase URL configuration
- Redirect not happening → Check redirect URLs in Supabase

---

## 🚀 After Fixing

1. Re-deploy on Vercel (or trigger a redeploy from Vercel dashboard)
2. Test login in incognito window on main domain only
3. You should see the debug logs in console following the "Good signs" pattern
4. You should redirect to `/admin` dashboard

---

## 📞 Still Having Issues?

1. **Test Supabase connection directly:**
   ```bash
   curl "https://[YOUR_PROJECT_ID].supabase.co/rest/v1/admin_users?select=*" \
   -H "Authorization: Bearer [YOUR_PUBLIC_KEY]" \
   -H "apikey: [YOUR_PUBLIC_KEY]"
   ```

2. **Check Supabase logs:**
   - Go to Supabase → Logs
   - Filter for authentication errors
   - Look for the timestamp when you tried to log in

3. **Verify function permission:**
   - Go to SQL Editor
   - Run: `SELECT * FROM pg_proc WHERE proname = 'is_admin';`
   - This checks if the `is_admin` function exists and is accessible
