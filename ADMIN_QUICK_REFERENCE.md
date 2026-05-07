# Admin Dashboard - Quick Reference

## 🔑 Default Credentials
```
Email: admin@portfolio.com
Password: Portfolio@2025
```

## 📍 How to Access
1. Look for the blue **"Admin"** button in the bottom-right corner
2. Click it → Login form appears
3. Enter credentials → Click "Login to Dashboard"
4. Dashboard opens as a full-screen overlay

## 🎯 Dashboard Tabs

### 📌 Projects Tab
- Click **"Add Project"** to create new project
- Click **edit icon** to modify existing project
- Click **trash icon** to delete project

**Fields**: Title, Description, Technologies (comma-separated), GitHub URL, Live URL, Featured (checkbox)

### 🏆 Skills Tab
- Click **"Add Skill"** to add new skill
- Click **edit icon** to modify skill
- Click **trash icon** to delete skill

**Fields**: Skill Name, Category (dropdown), Proficiency % (slider 0-100)

**Categories**: Frontend, Backend, AI/ML, Tools

### 🎓 Certificates Tab
- Click **"Add Certificate"** to add new certificate
- Click **edit icon** to modify certificate
- Click **trash icon** to delete certificate

**Fields**: Title, Issuer, Year/Date, Certificate URL (optional)

## 💾 Save & Sync
- All changes auto-save to Sanity CMS
- Portfolio updates instantly
- No manual refresh needed (usually)

## 🚪 Logout
- Click **"Logout"** button in dashboard header
- Or click **X** button to exit dashboard (stays logged in)

## ⚙️ Change Password
1. Open `lib/auth-context.tsx`
2. Edit `DEFAULT_CREDENTIALS` object
3. Save and rebuild: `npm run build`

## ❌ Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't find Admin button | Hard refresh page (Ctrl+Shift+R) |
| Login fails | Check default credentials above |
| Changes not appearing | Close dashboard, refresh portfolio |
| Modal won't close | Click outside modal or press X |
| Slow dashboard | First load caches data, subsequent loads faster |

## 📱 Mobile Access
Dashboard fully responsive - works on phones and tablets with same features

## 🔒 Security Notes
- Change default password before deploying
- Credentials stored in browser localStorage (for session)
- Never commit credentials to version control
- Use HTTPS in production

## 🚀 Quick Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 💡 Pro Tips
- Keep descriptions concise (100-200 characters)
- Use real URLs for GitHub and live demos
- Match proficiency to your actual skill level
- Add 4-6 technologies per project
- Mark featured projects to highlight them

---

**Everything is ready! Click the Admin button to start managing your portfolio.** 🎉
