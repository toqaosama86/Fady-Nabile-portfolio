# Admin Dashboard Setup Guide

## Overview

This admin dashboard provides a complete content management system (CMS) for your portfolio. You can manage all portfolio content sections directly from the admin panel without need to edit code.

## Features

- ✅ **Authentication**: Secure admin login with Supabase Auth  
- ✅ **Complete CRUD Operations**: Create, Read, Update, Delete for all content types
- ✅ **Content Management**: 
  - Projects (with featured flag)
  - Brands/Logos
  - Testimonials (with ratings)
  - Services (with features list)
  - Experience (with skills list)
  - Tools & Technologies (with proficiency levels)
  - Settings (key-value metadata)
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Real-time Updates**: Changes reflected immediately
- ✅ **Role-based Access**: Admin-only dashboard access
- ✅ **Fast Login**: Optimized admin verification (0.5s)

## Getting Started

### 1. Environment Setup

Create a `.env.local` file in your project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Get these values from your Supabase project settings.

### 2. Database Setup - CRITICAL STEPS

Follow these steps **in order**:

#### Step 1: Create Core Tables
In Supabase SQL Editor, run: `supabase/migrations/001_create_portfolio_tables.sql`

This creates all tables and RLS policies.

#### Step 2: Create Admin Verification Function (NEW!)
In Supabase SQL Editor, run: `supabase/migrations/20260331_add_check_admin_function.sql`

This creates a secure `is_admin()` function that bypasses RLS restrictions for admin verification.
**⚠️ This step is REQUIRED** or admin login will fail with "Could not verify admin access"

#### Step 3: Add Design Settings  
In Supabase SQL Editor, run: `supabase/migrations/20260331120000_add_design_settings.sql`

#### Step 4: Add Favicon & CV Support
In Supabase SQL Editor, run: `supabase/migrations/20260331_add_favicon_cv.sql`

### 3. Create Admin User

Once all migrations are applied:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Create new user"
3. Enter email and password
4. Copy the User UUID from the list
5. Go to SQL Editor and run:

```sql
INSERT INTO admin_users (user_id, role, is_active)
VALUES ('YOUR_USER_UUID_HERE', 'admin', true);
```

Replace `YOUR_USER_UUID_HERE` with the actual UUID (e.g., `550e8400-e29b-41d4-a716-446655440000`)

**Verify it worked:**
```sql
SELECT * FROM admin_users WHERE user_id = 'YOUR_USER_UUID_HERE';
```

You should see one row with `is_active = true`.

### 4. Access Admin Dashboard

- Visit `http://localhost:5173/admin/login` 
- Login with the email and password you created
- You'll be redirected to the admin dashboard

**Login Performance:**
- ✅ Should take **0.5 seconds** (not 2-3 seconds)
- ✅ Dashboard loads immediately after redirect

## Troubleshooting

### "Could not verify admin access" Error

This happens when:

❌ **Cause 1**: Migration `20260331_add_check_admin_function.sql` was not applied
- **Fix**: Apply this migration to Supabase SQL Editor

❌ **Cause 2**: User is not in `admin_users` table
- **Fix**: Check that you inserted a row in admin_users (see Step 3 above)

❌ **Cause 3**: User's `is_active` flag is false
- **Fix**: Run this to activate:
```sql
UPDATE admin_users SET is_active = true WHERE user_id = 'YOUR_USER_UUID_HERE';
```

### Login takes too long (>2 seconds)

- **Verify**: Database queries should be cached (5 min TTL)
- **Check**: Browser console for any error messages
- **Restart**: Clear browser cache and try again

### Still can't login?

1. Check Supabase logs for auth errors
2. Verify environment variables are correct (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)
3. Try creating a new test user to verify the admin_users insert works

## Admin Dashboard Structure

### Navigation Menu

The sidebar provides quick access to all management sections:

- **Dashboard**: Overview with content statistics
- **Projects**: Manage portfolio projects
- **Brands**: Manage brands/logos
- **Testimonials**: Manage client testimonials
- **Services**: Manage service offerings
- **Experience**: Manage work experience
- **Tools**: Manage tools and technologies
- **Settings**: Manage portfolio metadata

### Using Each Section

Each management section follows the same pattern:

1. **View**: Table showing all items
2. **Add**: Dialog form to create new items
3. **Edit**: Click pencil icon to edit existing items
4. **Delete**: Click trash icon to delete (with confirmation)
5. **Reorder**: Use display_order field to control item order

## Content Sections Explained

### Projects
- **Title**: Project name
- **Description**: Detailed project description
- **Category**: Type of project (e.g., "Web", "Mobile")
- **Image URL**: Link to project image
- **Project Link**: URL to live project or repository
- **Featured**: Mark important projects
- **Display Order**: Position on portfolio (lower numbers appear first)

### Brands
- **Name**: Brand name
- **Logo URL**: Link to brand logo
- **Link URL**: Website or profile link
- **Display Order**: Position order

### Testimonials
- **Author Name**: Client/reviewer name
- **Author Title**: Client role (e.g., "CEO at Company")
- **Author Image**: Profile photo URL
- **Content**: Testimonial text
- **Rating**: 1-5 star rating
- **Display Order**: Position order

### Services
- **Title**: Service name
- **Description**: Detailed service description
- **Icon**: Emoji or icon name
- **Features**: List of service features
- **Display Order**: Position order

### Experience
- **Company Name**: Company/employer name
- **Position**: Job title
- **Description**: Job responsibilities
- **Start Date**: When you started
- **End Date**: When you ended (leave empty if current)
- **Currently Working Here**: Check if ongoing
- **Skills**: List of skills used
- **Display Order**: Position order

### Tools
- **Name**: Tool/technology name (e.g., "React", "TypeScript")
- **Category**: Category (e.g., "Frontend", "Backend", "Database")
- **Icon URL**: Icon image link
- **Proficiency Level**: 0-100 skill level
- **Years of Experience**: How long you've used it
- **Display Order**: Position order

### Settings
- **Key**: Setting name (e.g., "site_title", "email")
- **Value**: Setting value (can be JSON for complex data)

**Recommended Settings to Add:**
- `site_title`: Your portfolio site name
- `site_description`: Meta description for SEO
- `email`: Contact email
- `phone`: Contact phone
- `resume_url`: Link to your resume
- `github_url`: GitHub profile URL
- `linkedin_url`: LinkedIn profile URL
- `twitter_url`: Twitter profile URL

## Connecting Portfolio to Database

To display database content on your portfolio, update the section components to fetch from Supabase:

```tsx
import { useProjects } from '@/hooks/useDatabase';

export const ProjectsSection = () => {
  const { data: projects } = useProjects();
  
  return (
    <section>
      {projects?.map((project) => (
        // Render project...
      ))}
    </section>
  );
};
```

## Security & Best Practices

1. **Strong Passwords**: Use strong admin passwords
2. **Row Level Security**: All operations are protected by RLS policies
3. **Public Read Access**: Portfolio content is publicly readable
4. **Admin Write Access**: Only admins can modify content
5. **Multiple Admins**: You can invite more admins by creating additional users and adding them to the `admin_users` table

## Troubleshooting

### Can't Login
- Check email and password are correct
- Ensure user exists in Supabase Authentication
- Verify user_id is in `admin_users` table with `is_active = true`

### Can't See Data
- Ensure migration SQL was executed successfully
- Check Supabase project URL and key are correct
- Verify browser console for errors (F12)

### Can't Create/Edit Items
- Check Row Level Security policies are applied
- Ensure you're logged in as an admin
- Check browser console for validation errors

### Database Connection Issues
- Verify `.env.local` file exists with correct credentials
- Check network tab in browser dev tools
- Ensure Supabase project is active

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Run database migrations
3. ✅ Create admin user
4. ✅ Login to admin dashboard
5. ✅ Add your portfolio content
6. ✅ Update portfolio components to fetch from database
7. ✅ Deploy to production

## File Structure

```
src/
├── components/admin/
│   ├── AdminLayout.tsx           # Main admin layout
│   ├── AdminDashboard.tsx        # Dashboard home
│   ├── AdminLogin.tsx            # Login form
│   ├── ProtectedRoute.tsx        # Route protection
│   ├── ProjectsManager.tsx
│   ├── BrandsManager.tsx
│   ├── TestimonialsManager.tsx
│   ├── ServicesManager.tsx
│   ├── ExperienceManager.tsx
│   ├── ToolsManager.tsx
│   └── SettingsManager.tsx
├── contexts/
│   └── AuthContext.tsx           # Authentication context
├── hooks/
│   └── useDatabase.ts            # CRUD operations hooks
└── pages/admin/
    ├── Login.tsx
    ├── Home.tsx
    ├── Projects.tsx
    ├── Brands.tsx
    ├── Testimonials.tsx
    ├── Services.tsx
    ├── Experience.tsx
    ├── Tools.tsx
    └── Settings.tsx
```

## Support

For issues or questions:
1. Check the browser console (F12) for error messages
2. Review Supabase logs in dashboard
3. Verify database structure matches schema
4. Ensure all environment variables are set correctly

Happy managing! 🚀
