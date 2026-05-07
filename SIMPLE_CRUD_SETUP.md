# 🚀 Simple CRUD Admin Dashboard - Setup Guide

Your admin dashboard now works with a **simple local backend** - no Sanity tokens or credentials needed!

## ✅ What's New?

✔️ Simple Node.js backend with Express  
✔️ Local JSON file storage  
✔️ Easy CRUD operations (Create, Read, Update, Delete)  
✔️ **After login → Perform CRUD operations directly**  
✔️ Success/Error alerts on every action  

---

## 📦 Installation & Setup

### Step 1: Install Dependencies

Run this command to install the new backend dependencies:

```bash
npm install
```

This will install:
- `express` - Backend framework
- `cors` - Enable cross-origin requests

### Step 2: Start the Backend Server

Open a **new terminal** and run:

```bash
npm run server
```

You should see:
```
✅ Portfolio API Server running at http://localhost:3001
📁 Data stored in: E:\portfolio\data
```

### Step 3: Start Your Frontend Dev Server

In another terminal, run:

```bash
npm run dev
```

This starts your Vite dev server at `http://localhost:5173`

---

## 🎯 How It Works

### Architecture

```
Frontend (Vite + React)
    ↓
API Client (lib/api-client.ts)
    ↓
Express Backend (server.js) on port 3001
    ↓
JSON Files (data/*.json)
```

### Endpoints Available

**Projects:**
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Skills:**
- `GET /api/skills` - Fetch all skills
- `POST /api/skills` - Create skill
- `PATCH /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

**Certificates:**
- `GET /api/certificates` - Fetch all certificates
- `POST /api/certificates` - Create certificate
- `PATCH /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

---

## 🎮 Using the Dashboard

1. **Login** as admin (use your auth system)
2. **Click Admin Dashboard**
3. **Select a tab**: Projects, Skills, or Certificates
4. **CRUD Operations:**
   - ➕ **Add** - Click "Add Project/Skill/Certificate"
   - ✏️ **Edit** - Click the pencil icon on any item
   - 🗑️ **Delete** - Click the trash icon (with confirmation)

5. **Success!** - You'll see a confirmation alert
   - ✅ Created successfully!
   - ✅ Updated successfully!
   - ✅ Deleted successfully!

---

## 📁 Data Storage

All data is stored in JSON files:

```
portfolio/
└── data/
    ├── projects.json      (All projects)
    ├── skills.json        (All skills)
    └── certificates.json  (All certificates)
```

These files are **automatically created** when you first run the server.

---

## ⚙️ Configuration

To change the backend port, edit `server.js`:

```javascript
const PORT = 3001; // Change this to any available port
```

To change the API base URL in frontend, edit `lib/api-client.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3001/api'; // Adjust if needed
```

---

## 🆘 Troubleshooting

### ❌ "Cannot POST /api/projects"
- [ ] Check backend is running: `npm run server`
- [ ] Verify port 3001 is not in use
- [ ] Check API URL in `lib/api-client.ts`

### ❌ "Error saving project"
- [ ] Check server console for error messages
- [ ] Ensure all required fields are filled
- [ ] Check browser DevTools → Network tab

### ❌ Backend won't start
- [ ] Kill any process using port 3001
- [ ] Delete `node_modules` and run `npm install` again
- [ ] Check you're in the correct directory

### ❌ Data not persisting
- [ ] Check `data/` directory exists
- [ ] Verify `data/*.json` files are created
- [ ] Check file permissions

---

## 📋 Required Fields

### Projects
- `title` (string)
- `description` (string)
- `technologies` (comma-separated string or array)
- `githubUrl` (string)
- `liveUrl` (string)
- `featured` (boolean)

### Skills
- `name` (string)
- `category` (string: "Frontend", "Backend", "Tools", etc.)
- `proficiency` (number: 0-100)

### Certificates
- `title` (string)
- `issuer` (string)
- `date` (string)
- `certificateUrl` (string)

---

## 🚀 Production Deployment (Optional)

For production, you can:

1. **Use a database** (MongoDB, PostgreSQL, etc.) instead of JSON files
2. **Deploy backend separately** (Heroku, Railway, Render)
3. **Update API_BASE_URL** to production server

---

## ✨ Features

✅ **Zero Configuration** - Works out of the box  
✅ **Local Development** - No external dependencies  
✅ **Data Persistence** - Saved in JSON files  
✅ **CORS Enabled** - Frontend can call backend  
✅ **Error Handling** - Detailed error messages  
✅ **Success Alerts** - User feedback on every action  

---

## 📞 Need Help?

If something isn't working:

1. Check the **server console** for error messages
2. Check the **browser console** (F12 → Console tab)
3. Check the **Network tab** to see API requests

---

Done! Your admin dashboard is ready to use. 🎉

Login → Add/Edit/Delete sections → That's it! 🚀
