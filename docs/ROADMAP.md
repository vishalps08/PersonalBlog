# Personal Blog - Development Roadmap

This document tracks the progress of the Personal Blog project. The MVP will be built incrementally, ensuring each milestone is fully tested before moving to the next.

---

# Phase 0 - Planning

* [x] Create project root
* [x] Initialize Git
* [x] Initialize npm workspace
* [x] Create Blog application
* [x] Verify Blog application
* [x] Create Admin application
* [x] Verify Admin application
* [x] Freeze MVP technology stack
* [x] Create PROJECT.md

---

# Phase 1 - Foundation

## Repository

* [x] Create API application
* [x] Verify API application
* [x] ~~Configure npm workspaces~~ — decided against; conflicts with "independent applications" philosophy. Using root scripts with `npm --prefix` instead.
* [x] Create root README
* [x] Standardize project scripts

## Backend

* [x] Configure Express (cors, cookie-parser, json body parsing, 404 + error handler)
* [x] Add environment configuration
* [x] Create health endpoint
* [x] Verify backend deployment locally

---

# Phase 2 - Database

* [x] Create MongoDB Atlas project
* [x] Connect Express to MongoDB
* [x] Create database connection module
* [x] Verify connection
* [x] Add error handling

---

# Phase 3 - Authentication

* [x] Design authentication flow
* [x] Create login endpoint
* [x] JWT authentication
* [x] HTTP-only cookies
* [x] Protected routes
* [x] Logout

---

# Phase 4 - Admin Dashboard

* [x] Dashboard layout
* [x] Sidebar
* [x] Header
* [x] Route protection

---

# Phase 5 - Categories

* [x] Category CRUD (hardcoded enum: Journal, Technology, Recommendations, Places, Life)
* [x] Category API (validated via post schema)
* [x] Category selection in editor

---

# Phase 6 - Blog Posts

* [x] Create post
* [x] Edit post
* [x] Delete post
* [x] Drafts
* [x] Publish
* [x] Preview

---

# Phase 7 - Media

* [x] Cloudinary integration
* [x] Cover image upload
* [x] Image preview

---

# Phase 8 - Public Blog

* [x] Homepage
* [x] Blog listing
* [x] Blog details
* [x] Categories
* [x] Search
* [x] About page
* [x] 404 page

---

# Phase 9 - UI Polish

* [x] Responsive design
* [x] Loading states
* [x] Empty states
* [x] Error pages (error boundaries)
* [x] Typography improvements
* [x] Pagination

---

# Phase 10 - Dark Mode

* [x] Theme context
* [x] Theme persistence (localStorage + system preference)
* [x] Theme toggle (blog header + admin sidebar)
* [x] Dark mode across blog and admin
* [x] Anti-flash inline script

---

# Phase 11 - Deployment

* [x] Vercel config for Blog (SPA rewrites)
* [x] Vercel config for Admin (SPA rewrites)
* [ ] Deploy Blog to Vercel
* [ ] Deploy Admin to Vercel
* [ ] Deploy API to Render
* [ ] Configure production environment variables
* [ ] Connect custom domain (optional)

---

# MVP Completion Checklist

* [x] Authentication
* [x] Post management
* [x] Categories
* [x] Image upload
* [x] Search
* [x] Responsive UI
* [ ] Deployment complete
* [ ] First blog post published
