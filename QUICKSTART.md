# Epoch Moments - Quick Start Guide

## ✅ What's Been Completed

### 1. Live Availability Calendar ✓
- **Location**: New component in `src/components/landing/AvailabilityCalendar.tsx`
- **Features**:
  - Real-time availability display
  - Interactive calendar interface
  - Shows booked slots
  - Displays availability notes
  - Integrated with Supabase
- **Status**: Live on landing page

### 2. Code Changes Committed ✓
- Removed all Lovable references
- Added live availability calendar
- Created admin privileges for `veerambaufx@gmail.com`
- Updated documentation

### 3. Git Repository Ready ✓
- All changes committed locally
- Ready to push to GitHub

## 📋 Next Steps: Deploy to GitHub & Vercel

### Step 1: Create GitHub Repository (5 minutes)
1. Go to https://github.com/new
2. Repository name: `epoch-moments`
3. Click "Create repository"

### Step 2: Push to GitHub (2 minutes)
```powershell
cd 'c:\Users\HP 280\OneDrive\Desktop\epoch-moments'
git remote set-url origin https://github.com/YOUR_USERNAME/epoch-moments.git
git push -u origin main
```

### Step 3: Deploy to Vercel (5 minutes)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Enter: `https://github.com/YOUR_USERNAME/epoch-moments`
4. Set Environment Variables:
   - `VITE_SUPABASE_URL` = [Your Supabase URL]
   - `VITE_SUPABASE_ANON_KEY` = [Your Supabase Anon Key]
5. Click "Deploy"

**Done!** Your app will be live at `https://yourproject.vercel.app`

---

## 🔑 Environment Variables Needed for Vercel

Get these from your Supabase dashboard (Settings > API):
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...xxxxx
```

## 📱 Local Development

```powershell
# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🔍 Testing the Availability Calendar

The calendar is now live and will:
1. Fetch availability data from Supabase `availability` table
2. Show available/booked dates
3. Display remaining slots
4. Show notes for specific dates

To populate the calendar, add dates to your Supabase `availability` table.

## 📦 Current Git Status

Recent commits:
- `0620dc9` - docs: Add deployment instructions
- `ff186a0` - feat: Add live availability calendar

Ready to push to GitHub!

---

## Support Files

- `DEPLOYMENT.md` - Detailed deployment instructions
- `.env.example` - Environment variable template
- `vercel.json` - Vercel configuration

See `DEPLOYMENT.md` for comprehensive troubleshooting and advanced setup options.
