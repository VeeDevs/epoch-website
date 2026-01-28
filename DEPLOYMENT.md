# Deployment Instructions

## Prerequisites
- GitHub account (https://github.com)
- Vercel account (https://vercel.com)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `epoch-moments`
3. Choose "Private" or "Public"
4. DO NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Push Code to GitHub

Run the following commands in PowerShell:

```powershell
cd 'c:\Users\HP 280\OneDrive\Desktop\epoch-moments'

# Update the remote origin to your repository
git remote set-url origin https://github.com/YOUR_USERNAME/epoch-moments.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste your GitHub repository URL: `https://github.com/YOUR_USERNAME/epoch-moments`
4. Select the repository and click "Import"
5. Configure environment variables:
   - Go to "Environment Variables" tab
   - Add the following:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase anonymous key
6. Click "Deploy"

### Option B: Using Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd 'c:\Users\HP 280\OneDrive\Desktop\epoch-moments'
vercel

# For production deployment
vercel --prod
```

## Step 4: Configure Vercel Settings

After deployment:

1. Go to your Vercel project dashboard
2. Go to Settings > Environment Variables
3. Add your Supabase credentials:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy by going to Deployments > Click latest > Redeploy

## Step 5: Update Supabase Credentials (If Needed)

If you're moving between environments:

1. Go to your Supabase project dashboard
2. Get your project URL and anon key from Settings > API
3. Update these in Vercel environment variables

## Step 6: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Update your domain's DNS settings according to Vercel's instructions

## Testing Locally Before Deployment

```powershell
# Install dependencies
npm install

# Create .env.local with your Supabase credentials
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Build Fails on Vercel
- Check that all environment variables are set correctly
- Ensure Node.js version compatibility (check `package.json` engines field)
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify Supabase credentials are correct
- Ensure Supabase project is active and has data
- Check RLS policies in Supabase dashboard

### Blank Page on Vercel
- Check browser console for errors
- Verify React Router configuration
- Check that all imports are correct

---

**Note**: The availability calendar is now integrated and will automatically fetch data from your Supabase `availability` table. Make sure to populate this table with dates and availability information in your Supabase dashboard.
