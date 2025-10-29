# 🚀 Tech Tips & Tricks Hub — Backend

- ### Live server: https://tech-tips-tricks-backend.vercel.app 

> A powerful backend API powering a full-stack platform for sharing, discovering, and monetizing **Tech Tips, Tutorials, and Reviews**.  
Built with **Node.js, Express.js, MongoDB, and Mongoose**, this backend ensures secure authentication, robust CRUD operations, and seamless integration with **payment gateways** (Stripe/Aamarpay).

---

## 🧠 Overview

The **Tech Tips & Tricks Hub** is a dynamic community-driven web application for tech enthusiasts.  
Users can explore expert tech advice, publish their own posts, interact with others, and unlock **premium features** via paid subscriptions.

This repository contains the **backend** — built with scalability, modularity, and performance in mind.  
It follows **Clean Architecture**, using **modular services and controllers**, centralized error handling, JWT-based authentication, and database optimization using **Mongoose aggregation pipelines**.

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT + bcrypt |
| **Validation** | Zod |
| **Payment Gateway** | Stripe / Aamarpay |
| **File Upload** | Cloudinary |
| **Environment Management** | dotenv |
| **Deployment Ready** | Render / Vercel |

---

## 🧩 Features Implemented

### 👤 **User Authentication & Authorization**
- Role-based access control (User & Admin)
- JWT authentication 
- Update functionality
- No special character restrictions for passwords

### 👥 **User Profiles**
- Update personal info and profile picture  
- View followers, following, and posts  
- Verified badge for premium subscribers  

### 📝 **Post Management**
- Full CRUD operations for posts  
- Rich text content with image upload  
- Premium posts

### 💬 **Comments & Interactions**
- Commenting, editing, deleting own comments  
- Upvote / Downvote for posts and comments  

### 💸 **Payments & Premium Access**
- Integrated with **Stripe** and **Aamarpay**  
- Subscriptions for premium features  

### 📊 **Admin Dashboard Features**
- Manage users, posts, payments  
- Create and manage admin accounts  
- View analytics: user growth, payments, post stats  
- Activity logs (user logins, roles, timestamps)

### 🔍 **Search, Filter & Pagination**
- Full-text search with category filters  
- Search optimization  
- Sorting on all lists  

### 📰 **Feed & Social**
- Infinite scroll for latest posts  
- Follow system (follow/unfollow users)  
- Share posts to social media platforms  

### 📑 **PDF Generation**
- Generate downloadable PDFs for any post or guide   

---
