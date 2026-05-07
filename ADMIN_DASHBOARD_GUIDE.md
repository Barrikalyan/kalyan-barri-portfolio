# Admin Dashboard & Login System

## 🎯 Overview

Your portfolio now includes a complete admin panel with authentication and content management dashboard. You can log in to manage projects, skills, and certificates directly from your portfolio without touching code.

---

## 🚀 Getting Started

### 1. Access the Admin Panel

**Location**: Look for the **"Admin"** button floating in the bottom-right corner of your portfolio.

- **Before Login**: Blue gradient button showing "Admin"
- **After Login**: Green gradient button showing "Dashboard"

### 2. Login Credentials

Use the following default credentials:

```
📧 Email: admin@portfolio.com
🔐 Password: Portfolio@2025
```

**Change these credentials immediately after first login!** They are stored in `lib/auth-context.tsx`.

---

## 📋 Dashboard Features

### Projects Manager
- **Add Projects**: Click "Add Project" button
- **Edit Projects**: Click the edit icon on any project
- **Delete Projects**: Click the trash icon and confirm
- **Fields**:
  - Title (required)
  - Description (required)
  - Technologies (comma-separated, e.g., "React, TypeScript, Tailwind")
  - GitHub URL
  - Live URL
  - Featured (checkbox - featured projects appear first)

### Skills Manager
- **Add Skills**: Click "Add Skill" button
- **Edit Skills**: Click the edit icon on any skill
- **Delete Skills**: Click the trash icon and confirm
- **Fields**:
  - Skill Name (e.g., "React", "Python")
  - Category: Frontend, Backend, AI/ML, or Tools
  - Proficiency: 0-100% (use the slider)
- **Display**: Skills organized by category with visual proficiency bars

### Certificates Manager
- **Add Certificates**: Click "Add Certificate" button
- **Edit Certificates**: Click the edit icon on any certificate
- **Delete Certificates**: Click the trash icon and confirm
- **Fields**:
  - Certificate Title (required)
  - Issuing Organization (required)
  - Year/Date (e.g., "2025", "Jan 2025")
  - Certificate URL (optional - link to verify)

---

## 💾 Data Synchronization

All changes made in the dashboard are automatically saved to Sanity CMS:

1. **Make Changes**: Add, edit, or delete content in the dashboard
2. **Auto-Save**: Changes are instantly saved to Sanity
3. **Portfolio Updates**: Your portfolio automatically fetches the latest data
4. **Real-Time**: Switch between portfolio and dashboard to see changes reflected

### Refresh Data
If changes don't appear immediately:
- Use browser refresh (F5)
- Close and reopen the dashboard
- The portfolio automatically fetches fresh data on load

---

## 🔒 Authentication

### How It Works
1. Click the **"Admin"** button
2. Enter your credentials (or the defaults provided)
3. Click **"Login to Dashboard"**
4. Access opens instantly to manage content

### Session Persistence
- Your login status is saved in browser's localStorage
- Closing the dashboard doesn't log you out
- Close all browser windows and reopen to stay logged in
- Manually click **"Logout"** in the dashboard to log out

### Logout
- Click the **"Logout"** button in the dashboard header
- Or click the close (X) button to exit the dashboard (session remains)

---

## 🛠️ Managing Content

### Adding a Project
```
1. Click "Add Project" button
2. Fill in project details:
   - Title: "E-Commerce Platform"
   - Description: "A full-stack e-commerce solution..."
   - Technologies: "React, Node.js, MongoDB, Stripe"
   - GitHub URL: "https://github.com/yourname/project"
   - Live URL: "https://project-demo.com"
   - Check "Featured" if it should appear prominently
3. Click "Create"
4. Project appears in your portfolio immediately
```

### Adding a Skill
```
1. Click "Add Skill" button
2. Fill in skill details:
   - Name: "TypeScript"
   - Category: "Frontend"
   - Proficiency: Drag slider to 95%
3. Click "Create"
4. Skill appears in individual boxes on portfolio
```

### Adding a Certificate
```
1. Click "Add Certificate" button
2. Fill in certificate details:
   - Title: "AWS Certified Solutions Architect"
   - Issuer: "Amazon Web Services"
   - Year: "2025"
   - URL: "https://verify.cert.com/abc123"
3. Click "Create"
4. Certificate appears in portfolio gallery
```

---

## 🔐 Changing Default Credentials

To change the admin password:

1. Open `lib/auth-context.tsx`
2. Find the `DEFAULT_CREDENTIALS` object:
```typescript
const DEFAULT_CREDENTIALS: AdminCredentials = {
  email: "admin@portfolio.com",
  password: "Portfolio@2025",
};
```
3. Replace with your desired credentials
4. Save the file
5. Rebuild: `npm run build`

---

## 📱 Responsive Design

The dashboard works on all screen sizes:
- **Desktop**: Full-featured with multi-column layouts
- **Tablet**: Optimized grid layout
- **Mobile**: Single-column responsive design

---

## 🎨 UI Components

### Dashboard Layout
- **Header**: Sticky with "Admin Dashboard" title and Logout button
- **Tab Navigation**: Projects, Skills, Certificates tabs with item counts
- **Content Area**: Tab-specific managers with create/edit/delete buttons
- **Modals**: Overlay forms for adding/editing content

### Color Scheme
- **Primary**: Blue gradient (from-blue-600 to-cyan-500)
- **Danger**: Red for delete actions
- **Success**: Green for authenticated state
- **Backgrounds**: Glassmorphic panels with transparency

---

## 💡 Best Practices

### Before Deploying
1. ✅ Change default credentials in `lib/auth-context.tsx`
2. ✅ Set up your Sanity project (if not using fallback data)
3. ✅ Configure `.env.local` with Sanity credentials
4. ✅ Test all CRUD operations in development

### Backup Strategy
- Sanity CMS automatically versions all changes
- You can revert changes in Sanity dashboard if needed
- Keep a backup of important project descriptions

### Content Guidelines
- Keep project descriptions concise but informative
- Use real GitHub and live URLs
- Include 4-6 relevant technologies per project
- Proficiency should reflect your actual expertise (0-100%)

---

## 🚀 Deployment

### When Deploying to Production
1. **Update Credentials**: Change default password in `lib/auth-context.tsx`
2. **Environment Variables**: Add any Sanity credentials to hosting platform
3. **Redeploy**: Build and deploy updated portfolio
4. **Test**: Verify login works on production domain

### Vercel Deployment Example
```bash
# Environment variables to set in Vercel:
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

---

## 🐛 Troubleshooting

### Login Button Not Appearing
- Make sure you're viewing the portfolio page (not just visiting root)
- Check browser console for errors (F12)
- Hard refresh the page (Ctrl+Shift+R)

### Can't Login
- Verify you're using the correct credentials
- Default: `admin@portfolio.com` / `Portfolio@2025`
- Check if credentials were changed in `lib/auth-context.tsx`

### Changes Not Appearing in Portfolio
- Close the dashboard and check the portfolio
- Hard refresh portfolio (Ctrl+Shift+R)
- If using Sanity, check network tab to verify saves succeeded

### Dashboard Slow to Load
- First load caches data, subsequent loads are instant
- Check network tab (F12 → Network) for slow requests
- May be due to Sanity API rate limiting

### Modal Not Closing
- Click outside the modal overlay
- Press Escape key (if implemented)
- Click the X button in the modal

---

## 📞 Support & References

### File Structure
```
lib/
  ├── auth-context.tsx      ← Authentication logic
  ├── site-data.ts          ← Data fetching from Sanity
  └── types.ts              ← TypeScript interfaces

components/
  ├── auth/
  │   ├── login-form.tsx    ← Login form UI
  │   └── admin-panel.tsx   ← Main admin entry point
  └── dashboard/
      ├── dashboard.tsx     ← Dashboard layout
      ├── projects-manager.tsx
      ├── skills-manager.tsx
      └── certificates-manager.tsx
```

### Key Components
- **AuthProvider**: Wraps app and manages auth state
- **AdminPanel**: Entry point, shows login button and dashboard
- **LoginForm**: Login form with validation
- **Dashboard**: Main dashboard with tabs
- **Managers**: Project/Skill/Certificate CRUD components

---

## 🎓 Common Tasks

### Task: Add a new project
→ See "Adding a Project" section above

### Task: Update a skill's proficiency
1. Click Skills tab
2. Click edit icon on the skill
3. Adjust proficiency slider
4. Click "Update"

### Task: Remove a certificate
1. Click Certificates tab
2. Click trash icon on certificate
3. Confirm deletion
4. Certificate removed from portfolio

### Task: Change admin password
→ See "Changing Default Credentials" section above

---

## ✨ Features Summary

✅ **Login System**: Secure authentication with default credentials
✅ **Session Persistence**: Stay logged in across sessions
✅ **Projects CRUD**: Add, edit, delete projects
✅ **Skills CRUD**: Add, edit, delete individual skills
✅ **Certificates CRUD**: Add, edit, delete certificates
✅ **Real-Time Sync**: Changes instantly appear in portfolio
✅ **Responsive Design**: Works on desktop, tablet, mobile
✅ **Glassmorphic UI**: Modern design with transparency effects
✅ **Dark/Light Mode**: Dashboard matches portfolio theme

---

**Your admin dashboard is ready to use! Click the "Admin" button at the bottom right of your portfolio to get started.**
