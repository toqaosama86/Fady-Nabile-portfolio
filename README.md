# Fady Portfolio

A modern, full-featured portfolio website with an admin dashboard. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

**Author:** Toqa Osama | Full Stack Developer

---

## 🌟 Features

- **Responsive Design** - Works seamlessly on all devices
- **Admin Dashboard** - Comprehensive management interface
- **Content Management** - Manage projects, services, testimonials, and more
- **Design Customization** - Customize colors, fonts, and layout in real-time
- **File Uploads** - Upload CV, favicon, and project images
- **Authentication** - Secure admin login with Supabase
- **Performance Optimized** - Fast loading and smooth animations
- **Dark/Light Mode** - Toggle between themes
- **Real-time Updates** - Changes reflect immediately

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fadyportfolio.git
cd fadyportfolio

# Install dependencies
npm install
# or
bun install

# Create .env file with your Supabase credentials
cp .env.example .env
```

### Configure Environment Variables

Edit `.env` and add your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

**How to get these values:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project → **Settings** → **API**
3. Copy your **Project URL**, **Anon Public Key**, and **Project ID**

### Run Development Server

```bash
npm run dev
# or
bun run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Build & Deploy

### Local Build

```bash
npm run build
npm run preview
```

### Deploy to Vercel

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your `fadyportfolio` repository

#### Step 3: Set Environment Variables in Vercel
**IMPORTANT:** These must have the `VITE_` prefix to work in the frontend.

In Vercel project settings → **Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Anon Public Key |
| `VITE_SUPABASE_PROJECT_ID` | Your Project ID |

**Select:** Production, Preview, and Development for each variable.

#### Step 4: Deploy
1. Click the deployment (or redeploy if it failed)
2. Wait for build to complete
3. Visit your Vercel domain

---

## 🔐 Admin Login

### Access Admin Dashboard
- Navigate to `/admin` on your deployed site
- Login with your Supabase credentials

### First Time Setup

**If login fails with "Could not verify admin access":**

You need to create an admin user record in Supabase.

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** and run:

```sql
-- First, get your user ID from the auth.users table
SELECT id, email FROM auth.users;

-- Then insert your user into admin_users
INSERT INTO admin_users (user_id, is_active) 
VALUES ('your-user-id-here', true);
```

Or use the Table Editor:
1. Go to **Tables** → **admin_users**
2. Click **Insert Row**
3. Add your user ID and set `is_active` to `true`

### Admin Dashboard Sections

- **Dashboard** - Overview and analytics
- **Projects** - Add, edit, delete portfolio projects
- **Services** - Manage services offered
- **Testimonials** - Manage client testimonials
- **Messages** - View and manage contact form messages
- **Experience** - Add work experience and education
- **Tools & Skills** - Manage technical skills
- **Brands** - Add client/brand logos
- **Design Settings** - Customize colors, fonts, and themes
- **CV Upload** - Upload resume/CV file
- **Favicon** - Upload site favicon
- **Settings** - General site settings

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS + Shadcn/ui |
| **State Management** | React Context API |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Build Tool** | Vite |
| **Testing** | Vitest + Playwright |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
fadyportfolio/
├── src/
│   ├── components/
│   │   ├── admin/           # Admin dashboard components
│   │   ├── sections/        # Portfolio sections
│   │   └── ui/             # Shadcn UI components
│   ├── contexts/            # React Context (Auth, Design)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── integrations/       # Supabase integration
│   └── lib/                # Utilities
├── supabase/
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── test/                   # Test files
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

---

## 🔒 Security

- Admin access is restricted to verified users
- Authentication via Supabase with secure session management
- RPC functions use database-level security policies
- Environment variables are never exposed in the frontend (except `VITE_` prefixed)
- All file uploads are validated server-side

---

## 🐛 Troubleshooting

### Login Issues

**"Could not verify admin access"**
- Verify you have an active record in the `admin_users` table
- Check that your user ID matches in both `auth.users` and `admin_users`
- Clear browser cache and localStorage

**"Wrong email or password"**
- Verify credentials are correct
- Check if account exists in Supabase
- Try password reset in Supabase Auth panel

**Network/Connection Errors on Vercel**
- Check that environment variables are set correctly on Vercel
- Verify Supabase project is active and accessible
- Check Vercel deployment logs for errors

### Build Issues

**Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**Module not found errors**
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Database Schema

The application uses these main tables:

- **auth.users** - Supabase authentication table
- **admin_users** - Stores admin user access control
- **projects** - Portfolio projects
- **services** - Services offered
- **testimonials** - Client testimonials
- **messages** - Contact form messages
- **experience** - Work experience and education
- **tools** - Technical skills and tools
- **brands** - Client/partner brands
- **design_settings** - Customization settings

---

## 🚀 Performance

- Optimized bundle size with tree-shaking
- Image optimization with modern formats
- Lazy loading for images and components
- Admin status caching (5-minute TTL)
- Database query optimization

---

## 📄 Environment Variables Reference

```env
# Required for Vercel deployment (must have VITE_ prefix)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

---

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, feel free to open an issue.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review environment variables configuration
3. Check Supabase dashboard for database errors
4. Verify Vercel deployment logs

---

## 📄 License

Private project. All rights reserved.

---

**Last Updated:** March 31, 2026  
**Version:** 1.0.0

---

**Built with ❤️ by Toqa Osama**
