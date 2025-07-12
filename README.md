# 🌐 Social Media Website

A full-stack social media web application that allows users to sign up, post text and images, react with likes, search for other users, and edit their own posts. Built with the MERN stack and secured with JSON Web Tokens (JWT) and HTTP-only cookies.
<br>
[![Live Website](https://img.shields.io/badge/Live%20Website-Click%20Here-blue?style=for-the-badge)](https://social-app-website-6dq3.vercel.app/)
---

## 🚀 Features

- 🔐 **Authentication**  
  Secure login and signup with hashed passwords using `bcrypt` and token-based auth using `JWT`.

- 📝 **Post Management**  
  Users can create, edit, and delete text/image posts.

- ❤️ **Likes**  
  React to others' posts with likes.

- 🔍 **Search & Discover**  
  Search users by email and view their public posts.

- 🖼️ **Image Upload**  
  Posts support images using Cloudinary for optimized storage.

- 🛡️ **Security**  
  - Passwords are hashed before storing in the database.
  - HTTP-only cookies are used for secure token storage.
  - Email verification for signup and password reset flows.

- 📊 **Performance Optimized**  
  - Pagination-based fetching for posts.
  - Compressed images stored in cloud to reduce load time.

---

## 🛠️ Tech Stack

| Frontend        | Backend          | Database      | Other Integrations          |
|-----------------|------------------|---------------|-----------------------------|
| React.js        | Node.js + Express| MongoDB Atlas | Cloudinary, JWT, bcrypt     |
| CSS             | Mongoose         |               | Redux (for state handling)  |

---

## 📂 Folder Structure

