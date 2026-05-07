# Admin Dashboard - Technical Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           AuthProvider (Context)                     │   │
│  │  - Manages authentication state                      │   │
│  │  - Persists login in localStorage                    │   │
│  │  - Provides useAuth hook                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
│    ┌──────────────────────┼──────────────────────┐           │
│    │                      │                      │           │
│    ▼                      ▼                      ▼           │
│  Portfolio           AdminPanel              Dashboard      │
│  - Hero              - Login Form            - Header        │
│  - About             - Modal Toggle          - Tab Nav       │
│  - Education         - Auth Guard            - Content       │
│  - Projects          - Button UI             - Managers      │
│  - Skills            │                       │               │
│  - Certificates      │                       ├─ ProjectsMgr  │
│  - Contact           │                       ├─ SkillsMgr    │
│  - Strengths         │                       └─ CertsMgr     │
│                      │                                        │
│                      └────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Sanity CMS (Data Layer)                 │   │
│  │  - Projects collection                               │   │
│  │  - Skills collection                                 │   │
│  │  - Certificates collection                           │   │
│  │  - PersonalInfo collection                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │
                            ▼
              Sanity API (GraphQL/REST)
```

---

## Component Hierarchy

```
App
├── AuthProvider (Context Provider)
│   ├── PortfolioClient
│   │   ├── Navbar
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── EducationSection
│   │   ├── ProjectsSection
│   │   ├── SkillsSection
│   │   ├── StrengthsSection
│   │   ├── CertificatesSection
│   │   └── ContactSection
│   │
│   └── AdminPanel (Overlay)
│       ├── LoginForm (Modal)
│       │   ├── Email Input
│       │   ├── Password Input
│       │   └── Login Button
│       │
│       └── Dashboard (Full Screen)
│           ├── Header
│           │   ├── Title
│           │   └── Logout Button
│           │
│           ├── Tab Navigation
│           │   ├── Projects Tab
│           │   ├── Skills Tab
│           │   └── Certificates Tab
│           │
│           └── Content Area
│               ├── ProjectsManager
│               │   ├── Project List
│               │   └── Project Form Modal
│               │
│               ├── SkillsManager
│               │   ├── Skills Grid
│               │   └── Skill Form Modal
│               │
│               └── CertificatesManager
│                   ├── Certificates Grid
│                   └── Certificate Form Modal
```

---

## State Management Flow

### Authentication State
```typescript
// lib/auth-context.tsx
interface AuthContextType {
  isAuthenticated: boolean    // true/false
  isLoading: boolean          // during login
  login(email, password)      // async function
  logout()                    // sync function
}
```

### Dashboard State
```typescript
// components/dashboard/dashboard.tsx
const [activeTab, setActiveTab] = useState<"projects" | "skills" | "certificates">()
const [data, setData] = useState<PortfolioData | null>()
const [isLoading, setIsLoading] = useState<boolean>()
```

### Manager State
```typescript
// components/dashboard/*-manager.tsx
const [isModalOpen, setIsModalOpen] = useState(false)
const [editingItem, setEditingItem] = useState<Item | null>()
const [formData, setFormData] = useState(initialFormData)
```

---

## Data Flow Diagram

### Adding a Project
```
User Input
    │
    ▼
Form Component
    │ (validate)
    ▼
Sanity Client (create)
    │ (network request)
    ▼
Sanity CMS
    │ (saves document)
    ▼
Success Response
    │
    ▼
onRefresh()
    │ (fetches all projects)
    ▼
setData() (updates state)
    │
    ▼
ProjectsManager re-renders with new project
    │
    ▼
Portfolio fetches new data
    │
    ▼
User sees updated project immediately
```

### Editing a Project
```
User Clicks Edit Icon
    │
    ▼
Modal Opens with Pre-filled Form
    │ (formData from selected project)
    ▼
User Modifies Fields
    │
    ▼
Submits Form
    │
    ▼
Sanity Client (patch)
    │ (updates specific document)
    ▼
Sanity CMS
    │ (updates & versions change)
    ▼
Success Response
    │
    ▼
onRefresh() & UI Updates
```

---

## API Integration Points

### Sanity Client Operations

```typescript
// CREATE (Project)
await client.create({
  _type: "project",
  title: "...",
  description: "...",
  technologies: [...],
  githubUrl: "...",
  liveUrl: "...",
  featured: true,
  image: {...}
})

// READ (All Projects)
const projects = await client.fetch(
  `*[_type == "project"] | order(featured desc, _createdAt desc)`
)

// UPDATE (Project)
await client.patch(projectId)
  .set({
    title: "...",
    description: "...",
    ...
  })
  .commit()

// DELETE (Project)
await client.delete(projectId)
```

---

## Authentication Flow

### Login Flow
```
1. User clicks "Admin" button
2. LoginForm modal opens
3. User enters email & password
4. Form submission → login() function
5. AuthContext validates credentials
   - Checks against DEFAULT_CREDENTIALS
   - If match: sets isAuthenticated = true
   - Saves to localStorage
6. AdminPanel detects isAuthenticated change
7. Shows Dashboard instead of LoginForm
```

### Session Persistence Flow
```
1. App loads
2. AuthProvider useEffect runs
3. Checks localStorage for "admin_auth"
4. If found and true: setIsAuthenticated(true)
5. Dashboard accessible without re-login
```

### Logout Flow
```
1. User clicks "Logout" button
2. logout() function called
3. Sets isAuthenticated = false
4. Removes from localStorage
5. AdminPanel shows LoginForm again
6. Dashboard hidden
```

---

## Form Validation

### Client-Side Validation
```typescript
// LoginForm
- Email: required, format check
- Password: required, length check

// ProjectForm
- Title: required, string
- Description: required, string
- Technologies: comma-separated strings
- URLs: optional, URL format

// SkillForm
- Name: required, string
- Category: required, select from list
- Proficiency: required, 0-100 number

// CertificateForm
- Title: required, string
- Issuer: required, string
- Date: optional, string
- URL: optional, URL format
```

### Server-Side Validation
```
// In Sanity Schema (sanity/schemaTypes/)
- Required fields marked with validation rules
- Number ranges validated (0-100)
- String formats validated
- Custom validators can be added
```

---

## Performance Optimization

### Code Splitting
```typescript
// Dashboard components loaded on-demand
const [activeTab, setActiveTab] = useState("projects")

// Only render active manager
{activeTab === "projects" && <ProjectsManager />}
{activeTab === "skills" && <SkillsManager />}
{activeTab === "certificates" && <CertificatesManager />}
```

### Caching
```typescript
// getPortfolioData() called once on app load
// Results cached in React state
// onRefresh() manually triggers new fetch
// Subsequent loads use cached data
```

### Lazy Loading
```typescript
// Dashboard only loads when authenticated
// CRUD modals only render when open
// Manager components lazy-render by tab
```

---

## Error Handling

### Login Errors
```typescript
try {
  const success = await login(email, password)
  if (!success) {
    setError("Invalid credentials")
  }
} catch (error) {
  console.error("Login error:", error)
}
```

### CRUD Errors
```typescript
try {
  await client.patch(id).set(data).commit()
  onRefresh() // Re-fetch data
} catch (error) {
  console.error("Save error:", error)
  // User-facing error message shown
}
```

### Network Errors
```typescript
// Fallback data used if Sanity API fails
const fallbackProjects = [...]
const fallbackSkills = [...]
const fallbackCertificates = [...]

// getPortfolioData() returns fallback if API error
```

---

## Styling Architecture

### Tailwind CSS Classes
```
glass-panel       // Glassmorphic background
rounded-lg        // Border radius
px-4 py-2        // Padding
bg-gradient-to-r // Gradient background
from-blue-600 to-cyan-500  // Color stops
hover:scale-110  // Hover animations
dark:bg-slate-900 // Dark mode
```

### Framer Motion Animations
```typescript
// Initial → Animate → Exit
motion.div
  initial={{ opacity: 0, y: 20 }}    // Start state
  animate={{ opacity: 1, y: 0 }}     // End state
  whileHover={{ scale: 1.05 }}       // Hover effect
  transition={{ duration: 0.3 }}     // Animation timing
```

---

## Security Considerations

### Authentication
- Default credentials hardcoded (dev only)
- Should use environment variables for production
- Consider JWT or API-based auth for production

### Data Protection
- No sensitive data stored in localStorage (only auth flag)
- Sanity API tokens should be in .env files
- Never commit credentials to Git

### Input Sanitization
- Form validation on client-side
- Sanity validates on server-side
- HTML content escaped by default

---

## Testing Checklist

### Login Flow
- [ ] Click Admin button shows login form
- [ ] Invalid credentials show error
- [ ] Valid credentials open dashboard
- [ ] Refresh page keeps session alive
- [ ] Logout removes session

### Projects Manager
- [ ] Add project creates new item
- [ ] Edit project updates existing item
- [ ] Delete project removes item
- [ ] Changes appear in portfolio
- [ ] Refresh loads latest data

### Skills Manager
- [ ] Add skill with proficiency
- [ ] Edit skill updates name/category/proficiency
- [ ] Delete skill removes item
- [ ] Skills display in portfolio boxes
- [ ] Proficiency slider works (0-100)

### Certificates Manager
- [ ] Add certificate with all fields
- [ ] Edit certificate updates fields
- [ ] Delete certificate removes item
- [ ] Certificates appear in portfolio
- [ ] Links work correctly

### Responsive Design
- [ ] Dashboard works on mobile (1 column)
- [ ] Dashboard works on tablet (2 columns)
- [ ] Dashboard works on desktop (full width)
- [ ] Modals work on all sizes
- [ ] Buttons/inputs accessible on all sizes

---

## Future Enhancements

Potential additions:
- [ ] Session timeout (auto-logout after inactivity)
- [ ] Two-factor authentication
- [ ] Admin user management
- [ ] Activity logging
- [ ] Bulk import/export
- [ ] Image uploads
- [ ] SEO management
- [ ] Analytics integration
- [ ] API token management
- [ ] Webhook integrations
- [ ] Advanced filtering/search
- [ ] Content scheduling
- [ ] Version history viewer
- [ ] Dark mode toggle in dashboard

---

## Debugging Tips

### Check Authentication State
```javascript
// In browser console
localStorage.getItem("admin_auth")  // "true" or null
```

### Monitor API Calls
```
F12 → Network Tab
- Look for client.create/patch/delete calls
- Check response status and data
- Verify Sanity API responding
```

### React DevTools
```
F12 → React DevTools
- Inspect AuthContext state
- Check component tree
- Monitor prop changes
```

### Console Logs
```typescript
// Already logging errors
console.error("Error saving project:", error)
```

---

**This architecture provides a scalable, maintainable admin dashboard for portfolio content management.** 🚀
