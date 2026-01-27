# Portfolio Data Files

This directory contains all the centralized data for your portfolio website. Simply edit the JSON files to update your portfolio content - no code changes required!

## 📁 File Structure

| File | Purpose |
|------|---------|
| `profile.json` | Personal info, social links, contact details |
| `experience.json` | Work experience entries |
| `achievements.json` | Awards and accomplishments |
| `projects.json` | All projects (featured, more, archive) |
| `skills.json` | Technical skills with categories |
| `contact.json` | Contact page content and form labels |
| `blog.json` | Blog posts and page content |
| `navigation.json` | Navigation items, social links, and footer data |
| `index.ts` | TypeScript types and exports (don't edit) |

---

## 📝 How to Update Each File

### profile.json
Update your personal information:
```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "email": "your.email@example.com",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://x.com/yourusername"
  }
}
```

### experience.json
Add/edit work experiences:
```json
[
  {
    "id": "unique-id",
    "role": "Job Title",
    "company": "Company Name",
    "period": "Jan 2024 - Present",
    "description": "Brief description of your role",
    "highlights": [
      "Achievement 1",
      "Achievement 2"
    ],
    "current": true
  }
]
```

### achievements.json
Add/edit achievements:
```json
[
  {
    "id": "unique-id",
    "year": "2024",
    "title": "Achievement Title",
    "subtitle": "Subtitle or context",
    "description": "Full description of the achievement"
  }
]
```

### projects.json
The projects file has three sections:

1. **featured** - Main showcase projects (3 recommended)
2. **more** - Secondary projects shown on homepage (6 recommended)
3. **archive** - All projects for the /projects page

```json
{
  "featured": [...],
  "more": [...],
  "archive": [...]
}
```

### skills.json
Update your technical skills:
```json
{
  "technical": {
    "AI/ML/DL": ["PyTorch", "TensorFlow"],
    "Web": ["React", "Next.js"]
  },
  "all": [
    { "name": "PyTorch", "category": "AI/ML/DL" },
    { "name": "React", "category": "Web" }
  ]
}
```

### contact.json
Update contact page content:
```json
{
  "methods": [
    { "name": "Email", "value": "your@email.com", "icon": "FaEnvelope", "href": "mailto:your@email.com" }
  ],
  "formLabels": { "name": "Name", "email": "Email", ... },
  "pageContent": { "title": "Get in Touch", "description": "..." }
}
```

### blog.json
Add/edit blog posts:
```json
{
  "posts": [
    { "id": 1, "title": "Post Title", "excerpt": "...", "date": "2024-03-15", "readTime": "5 min", "category": "..." }
  ],
  "pageContent": { "title": "Blog" }
}
```

### navigation.json
Update navigation, social links, and footer:
```json
{
  "socialLinks": [{ "name": "GitHub", "url": "...", "icon": "FaGithub" }],
  "navItems": [{ "name": "Home", "href": "/#hero", "icon": "RiHome5Line" }],
  "footer": { "copyright": "Your Name", "email": "...", "socialLinks": [...] }
}
```

---

## ⚠️ Important Notes

1. **Don't edit `index.ts`** - This file contains TypeScript types and import logic
2. **Keep valid JSON** - Use a JSON validator if unsure
3. **Maintain structure** - Don't change field names, only values
4. **Images** - Place project images in `/public/projects/`
5. **Hot reload** - Changes appear immediately in dev mode

---

## 🔄 Updating Content Workflow

1. Open the relevant JSON file
2. Edit the values you want to change
3. Save the file
4. Refresh your browser (or wait for hot reload)
5. Deploy when ready!

---

## 📦 TypeScript Types

All data is fully typed. Import types like this:

```typescript
import { 
  profile, 
  experience, 
  featuredProjects,
  contact,
  blog,
  navigation,
  footerData,
  type Profile,
  type Experience,
  type FeaturedProject,
  type ContactData,
  type BlogPost,
  type NavigationData
} from '@/data'
```
