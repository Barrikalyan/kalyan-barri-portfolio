# Sanity Write Token Setup Guide

## ⚠️ Important: Your `.env` file is created but incomplete

You need to complete these steps to enable CRUD operations in your dashboard:

---

## STEP 1: Get Your Sanity Project ID & Write Token

1. **Go to Sanity Dashboard**: https://manage.sanity.io/

2. **Select your project** (or create one if you haven't already)

3. **Navigate to API section**:
   - Click on **Settings** (⚙️) in the sidebar
   - Select **API**
   - Go to **Tokens** tab

4. **Create a new token** (if you don't have one):
   - Click **"Add API token"**
   - Name it: `Portfolio Write Token` (or any name)
   - Permission: Select **"Editor"** (or custom with create/read/update/delete permissions)
   - Click **"Save"**

5. **Copy your credentials**:
   - Copy your **Project ID** (visible in the API section header or URL)
   - Copy the **Write Token** (click the three dots → Copy)

---

## STEP 2: Update Your `.env` File

Open `.env` in your editor and replace the placeholders:

```env
VITE_SANITY_PROJECT_ID=YOUR_PROJECT_ID_HERE
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_API_TOKEN=YOUR_WRITE_TOKEN_HERE
```

**Example** (do NOT use these):
```env
VITE_SANITY_PROJECT_ID=abc123def456
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_API_TOKEN=skdc_abc123def456...
```

---

## STEP 3: Configure CORS (Allow localhost)

In Sanity, you need to whitelist your local development URL:

### Option A: Using Sanity CLI (Recommended)

Run this command in your terminal:

```bash
npx sanity cors add http://localhost:5173
```

When prompted, select your project.

### Option B: Manual CORS Setup in Dashboard

1. Go to: https://manage.sanity.io/ → Your Project → **Settings** → **API** → **CORS origins**

2. Click **"Add CORS origin"**

3. Enter: `http://localhost:5173`

4. Click **"Save"**

---

## STEP 4: Restart Your Dev Server

After updating the `.env` file, **restart your development server**:

```bash
npm run dev
```

The old server process needs to reload the environment variables.

---

## ✅ Verify Setup

Your dashboard CRUD operations should now work! Check:

1. ✅ Can you see the admin panel?
2. ✅ Can you add/edit/delete items?
3. ✅ Do changes sync to Sanity Studio?

---

## 🆘 Troubleshooting

### Still getting token errors?
- [ ] Check `.env` file is in the root directory (same level as `package.json`)
- [ ] Verify token is correctly pasted (no extra spaces)
- [ ] Restart dev server after editing `.env`
- [ ] Check browser console for specific error messages

### CORS error?
- [ ] Verify origin is exactly: `http://localhost:5173`
- [ ] If using a different port, add that instead (e.g., `http://localhost:3000`)
- [ ] Run: `npx sanity cors list` to verify your origins

### Token has no permission?
- [ ] Re-generate token with **"Editor"** role or full CRUD permissions
- [ ] Tokens are tied to specific datasets—verify you're using the right one

---

## 📝 Security Note

- **Never commit `.env` to Git** (it's in `.gitignore`)
- **Don't share your write token** publicly
- Use different tokens for development/production

---

Done! Your dashboard should now have full CRUD capabilities. 🎉
