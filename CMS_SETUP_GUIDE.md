# CMS Setup Guide - Sanity Studio

## Overview
Your portfolio now includes a Sanity CMS integration that allows you to manage projects, certificates, and skills directly from the Sanity Studio dashboard without touching code.

## Setup Instructions

### Step 1: Create a Sanity Project (if not already done)

1. Go to [sanity.io](https://www.sanity.io/) and sign up for a free account
2. Create a new project
3. Choose **"Structured Content"** as your project type
4. Copy your **Project ID** and **Dataset** (usually "production")

### Step 2: Configure Environment Variables

Update your `.env.local` file with your Sanity credentials:

```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
```

### Step 3: Generate API Token (for server-side operations)

1. Go to [manage.sanity.io](https://manage.sanity.io/)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions
5. Copy the token and add it to `.env.local` as `SANITY_API_TOKEN`

### Step 4: Set CORS Origins

1. In [manage.sanity.io](https://manage.sanity.io/), go to **API** → **CORS origins**
2. Add the following origins:
   - `http://localhost:3000` (if using Next.js)
   - `http://localhost:5173` (if using Vite - your current setup)
   - `http://localhost:3333` (Sanity Studio default)
   - Your production domain (e.g., `https://yourportfolio.com`)

### Step 5: Access Sanity Studio

Two options:

**Option A: Local Development**
```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Deploy your studio (optional, for hosted version)
sanity deploy

# Run Sanity Studio locally
sanity start

# Studio will be available at http://localhost:3333
```

**Option B: Hosted Studio (Recommended for simplicity)
- Deploy once and access anywhere
- Runs the command: `sanity deploy`
- Your studio will be available at: `https://your-project-id.sanity.studio`

### Step 6: Populate Your CMS

Once Sanity Studio is running, you can:

1. **Add Projects**: Go to Projects → Create new
2. **Add Certificates**: Go to Certificates → Create new
3. **Add Skills**: Go to Skills → Create new
4. **Update Personal Info**: Go to Personal Info → Edit

### Schema Documentation

#### Skills Schema (Individual Skill Items)
```
- Name: Skill name (e.g., "React", "TypeScript")
- Category: Frontend / Backend / AI/ML / Tools
- Proficiency: 0-100% (will appear in Strengths section)
```

#### Projects Schema
```
- Title: Project name
- Description: Detailed description
- Technologies: Array of tech stack items
- GitHub URL: Link to repository
- Live URL: Link to live demo
- Image: Project preview image
- Featured: Toggle to show prominently
```

#### Certificates Schema
```
- Title: Certificate name
- Issuer: Issuing organization
- Date: Completion date
- Certificate URL: Link to verify certificate
- Image: Certificate preview image
```

#### Personal Info Schema
```
- Name: Your name
- Role: Your professional role
- Bio: Short biography
- Email: Contact email
- Phone: Contact number
- Image: Profile picture
- Social Links: GitHub, LinkedIn, Twitter URLs
```

## Default Credentials (For Initial Setup)

If you want to test with demo data:

**Email**: demo@sanity.test
**Password**: DemoPassword123!

(These are placeholders - use your actual Sanity account credentials)

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
npm run build
```

### CORS errors when fetching from Sanity
- Make sure your localhost URL is added to CORS origins in manage.sanity.io
- Verify your API token has the correct permissions

### Studio not loading
- Clear browser cache
- Try incognito/private mode
- Verify environment variables are set correctly
- Check that your Project ID is correct

### Changes not appearing in portfolio
- Make sure Sanity dataset is set to "production"
- Clear browser cache
- Rebuild the app: `npm run build`

## Development Workflow

1. **Local Development**:
   ```bash
   npm run dev              # Run portfolio on localhost:5173
   sanity start             # Run Studio on localhost:3333
   ```

2. **Add/Edit Content**: 
   - Make changes in Sanity Studio
   - Portfolio automatically fetches fresh data

3. **Deployment**:
   - Deploy portfolio to Vercel
   - Keep Sanity project active for content management
   - Changes sync automatically

## Security Note

- Never commit `.env.local` to version control
- Keep your API tokens secure
- Use Editor permissions (not Admin) for content creators
- Regularly rotate API tokens

## Next Steps

1. Set up your Sanity project
2. Configure environment variables
3. Deploy Sanity Studio (or run locally)
4. Start adding your content
5. Deploy portfolio to Vercel or your preferred host
