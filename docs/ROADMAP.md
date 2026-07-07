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
* [ ] Verify API application
* [x] ~~Configure npm workspaces~~ — decided against; conflicts with "independent applications" philosophy. Using root scripts with `npm --prefix` instead.
* [x] Create root README
* [x] Standardize project scripts

## Backend

* [x] Configure Express (cors, cookie-parser, json body parsing, 404 + error handler)
* [x] Add environment configuration
* [x] Create health endpoint
* [ ] Verify backend deployment locally

---

# Phase 2 - Database

* [ ] Create MongoDB Atlas project
* [ ] Connect Express to MongoDB
* [ ] Create database connection module
* [ ] Verify connection
* [ ] Add error handling

---

# Phase 3 - Authentication

* [ ] Design authentication flow
* [ ] Create login endpoint
* [ ] JWT authentication
* [ ] HTTP-only cookies
* [ ] Protected routes
* [ ] Logout

---

# Phase 4 - Admin Dashboard

* [ ] Dashboard layout
* [ ] Sidebar
* [ ] Header
* [ ] Route protection

---

# Phase 5 - Categories

* [ ] Category CRUD
* [ ] Category API
* [ ] Category selection in editor

---

# Phase 6 - Blog Posts

* [ ] Create post
* [ ] Edit post
* [ ] Delete post
* [ ] Drafts
* [ ] Publish
* [ ] Preview

---

# Phase 7 - Media

* [ ] Cloudinary integration
* [ ] Cover image upload
* [ ] Image preview

---

# Phase 8 - Public Blog

* [ ] Homepage
* [ ] Blog listing
* [ ] Blog details
* [ ] Categories
* [ ] Search
* [ ] About page
* [ ] 404 page

---

# Phase 9 - UI Polish

* [ ] Responsive design
* [ ] Loading states
* [ ] Empty states
* [ ] Error pages
* [ ] Typography improvements

---

# Phase 10 - Dark Mode

* [ ] Theme context
* [ ] Theme persistence
* [ ] Theme toggle
* [ ] Dark mode testing

---

# Phase 11 - Deployment

* [ ] Deploy Blog to Vercel
* [ ] Deploy Admin to Vercel
* [ ] Deploy API
* [ ] Configure production environment variables
* [ ] Connect custom domain (optional)

---

# MVP Completion Checklist

* [ ] Authentication
* [ ] Post management
* [ ] Categories
* [ ] Image upload
* [ ] Search
* [ ] Responsive UI
* [ ] Deployment complete
* [ ] First blog post published
