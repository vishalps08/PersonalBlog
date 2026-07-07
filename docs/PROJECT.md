# Personal Blog - Project Documentation

## Project Overview

A full-stack personal blogging platform where I can document my experiences, technology learnings, recommendations, and thoughts.

The platform consists of:

* Public-facing blog website
* Secure admin dashboard
* Backend API
* MongoDB database

The primary objective of the MVP is to provide a smooth publishing workflow for a single author.

---

# MVP Goals

The MVP should allow me to:

* Log into the admin dashboard
* Create blog posts
* Save posts as drafts
* Publish posts
* Edit existing posts
* Delete posts
* Upload cover images
* Organize posts by category
* Search published posts
* Read posts on a responsive public website

The website should immediately reflect newly published content without requiring redeployment.

---

# Out of Scope (MVP)

The following features are intentionally postponed:

* Multiple users
* Comments
* Newsletter
* RSS Feed
* Analytics
* AI-assisted writing
* Timeline view
* Travel map
* Notifications
* Likes
* Bookmarks
* Social login

---

# Technology Stack

## Frontend

* React
* Vite
* React Router DOM
* Tailwind CSS v3.4.x
* Axios
* Lucide React
* React Hot Toast
* Tiptap Editor

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB Atlas
* Mongoose

---

## Authentication

* JWT
* HTTP-only Cookies

---

## Image Storage

* Cloudinary

---

## Deployment

### Public Blog

* Vercel

### Admin Dashboard

* Vercel

### Backend API

* Render

### Source Control

* GitHub

---

# Repository Structure

```text
PersonalBlog/

apps/
    blog/
    admin/
    api/

docs/

assets/

.gitignore
package.json
README.md
```

---

# Project Structure Philosophy

* One GitHub repository
* Independent applications
* Shared documentation
* Feature-driven development
* Small, verifiable milestones

---

# Content Categories

The blog will initially support the following categories:

* Journal
* Technology
* Recommendations
* Places
* Life

Additional categories can be introduced after the MVP.

---

# Theme Strategy

Dark mode will **not** be implemented during the initial UI development.

Implementation plan:

* Build all pages in Light Mode
* Complete responsive layouts
* Add Dark Mode across the application after the UI stabilizes

Dark mode implementation:

* Tailwind CSS `class` strategy
* Theme stored in localStorage
* Respect system preference on first visit

---

# Development Workflow

Every feature follows the same process:

1. Plan
2. Implement
3. Test
4. Verify
5. Commit
6. Proceed to the next feature

No new feature begins until the current one is working correctly.

---

# Git Strategy

Main branch:

* `main`

Feature branches:

* `feature/<feature-name>`

Example:

* feature/authentication
* feature/post-editor
* feature/blog-home

Every completed milestone should be committed before starting the next.

---

# Code Style Principles

* Keep components small and focused.
* Avoid premature optimization.
* Prefer readability over clever code.
* Keep business logic out of UI components where possible.
* Reuse components when appropriate.
* Follow consistent naming conventions.

---

# MVP Success Criteria

The MVP is complete when:

* The admin panel is accessible through authentication.
* Posts can be created, edited, deleted, drafted, and published.
* Images can be uploaded.
* The public website displays published posts.
* Categories and search work correctly.
* The application is responsive.
* The project is deployed successfully.

---

# Future Roadmap

Version 1.1

* Tags
* Reading time
* Related posts
* SEO improvements

Version 1.2

* Recommendation module
* Photo gallery
* Place pages

Version 1.3

* Timeline
* Archives
* Better search

Version 2

* Comments
* Newsletter
* Analytics
* RSS Feed
* PWA
* "On This Day" memories
* AI-assisted writing

---

# Guiding Principle

> Build a reliable publishing platform first. Add enhancements only after the core writing and publishing experience is complete.
