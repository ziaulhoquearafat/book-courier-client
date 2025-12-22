# 🚀 Book Courier

A modern platform to order, manage, and track books from librarians to users with secure payments and reviews.

### 🔗 Live Website

https://bookcourier-52506.web.app/

---

## 📌 Overview

**Book Courier** is a full-stack online book ordering platform where users can browse published books, place orders, make secure payments via Stripe, and review delivered books.  
The platform includes **role-based access** (Admin, Librarian, User), **responsive design**, **wishlist functionality**, and a **smooth user experience** across devices.

---

## ❗ Problem Statement

Finding and ordering books from reliable sources can be time-consuming.  
Book Courier solves this by providing a **centralized platform** where users can:  
- Discover books  
- Order and pay online  
- Track orders  
- Leave reviews  
- Librarians can manage their books and track orders  
- Admins can manage users, roles, and books  

This makes the book ordering process **fast, secure, and reliable**.

---

## 🛠️ Tools & Technologies Used

### **Frontend**

- React
- React Router
- TailwindCSS
- React Icons
- React Hot Toast
- React Spinners

### **Backend**

- Node.js
- Express.js
- MongoDB (Atlas)
- Firebase Admin SDK (JWT Authentication)
- Stripe (Payments)

### **Other**

- Deployment: Vercel (Backend) & Firebase Hosting (Frontend)  
- CORS, dotenv for environment config  

---

## 🔧 Methods / Development Approach

- Designed fully **responsive UI** with React + TailwindCSS  
- Implemented **role-based authentication** using Firebase JWT  
- Created **RESTful APIs** with Express.js for users, books, orders, payments, reviews, and wishlist  
- Used **MongoDB** for storing all data (users, books, orders, payments, wishlist)  
- Integrated **Stripe** for secure payment processing  
- Added **toast notifications** for user feedback  
- Deployed backend on **Vercel** and frontend on **Firebase Hosting**  

---

## ⭐ Key Features

### **User Features**

- 🔐 **Authentication:** Login & Signup via Firebase  
- 📚 **Browse Books:** View published books with search, sorting, and pagination  
- 🛒 **Place Orders:** Select books and place orders  
- 💳 **Stripe Payment:** Secure online payments  
- 📄 **Order Tracking:** Track order status (pending, shipped, delivered)  
- ⭐ **Reviews & Ratings:** Leave reviews on delivered books  
- 💖 **Wishlist:** Add/remove books from wishlist  

### **Librarian Features**

- 📚 **Add Books:** Add new books with unpublished status  
- ✏️ **Edit Books:** Update books they added  
- 📦 **Manage Orders:** Update order status (pending → shipped → delivered)  

### **Admin Features**

- 👤 **Manage Users:** View all users, change roles (user, librarian, admin)  
- 📚 **Manage Books:** View all books, publish/unpublish, delete books  
- 🏆 **Full Access:** Control all platform operations  

---

## 📸 Screenshots / Demo

---

## 🚀 How to Run This Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/book-courier.git
cd book-courier
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Setup Environment Variables
Create a .env file in the backend folder with:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_DOMAIN=https://your-frontend-domain
NODE_ENV=production
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
4️⃣ Start the development server
bash
Copy code
npm run dev   # backend
5️⃣ Start the frontend
bash
Copy code
cd frontend
npm install
npm run dev
6️⃣ Open in browser
http://localhost:5173/ (Frontend)
http://localhost:3000/ (Backend API)
```

🏁 Results & Conclusion

Book Courier provides a secure, fast, and user-friendly platform for online book ordering.
It features a clean responsive UI, role-based access, Stripe payments, wishlist, and reviews, making the process seamless for users, librarians, and admins.

🔮 Future Enhancements

Admin & Librarian dashboards

Advanced real-time notifications

Multi-language support

Advanced analytics for admin

Recommendation system for users based on reviews & wishlist

👤 Author & Contact

Md Ziaul Haque Arafat
Full-Stack Developer (MERN)

📧 Email: mdarafat3167@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/ziaul-hoque-arafat/


