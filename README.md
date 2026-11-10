# 🍽️ MealTrack — Smarter Meals. Better Campus Living.

> **A full-stack MERN campus mess management ecosystem built for IIIT Bhubaneswar.**  
> Students, Mess Committees, Admins, and Kitchen Staff — all connected through one real-time, role-based platform backed by MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)

---

## 🎯 About the Project

**MealTrack** replaces the traditional paper-and-queue mess system with a **real-time, role-aware web application**. Every meal registration, QR scan, payment, complaint, inventory movement, and feedback rating is persisted in MongoDB and authorized server-side.

> *"Every button triggers a real API call backed by MongoDB. No mock data, no fake state."*

Built as a production-oriented MERN challenge, the project demonstrates:

- **Advanced RBAC** with four distinct roles and fine-grained route guards.
- **Refresh-token rotation** with HttpOnly secure cookies — no JWT in `localStorage`.
- **QR-based meal check-in** with signed, short-lived tokens and duplicate-scan prevention.
- **Dual mess systems**: pay-per-meal (1st Floor) and one-time semester fee (Ground Floor).
- **Admin-only pricing control** for per-meal rates and semester fees.
- **Socket.IO** live notifications for announcements, complaints, and kitchen alerts.

---

## 👨‍💻 About the Author

**Jagneswar Panda** is a **Full Stack Developer** working on MealTrack, a campus mess management platform built for IIIT Bhubaneswar.

- [GitHub](https://github.com/jagneswar)
- [LinkedIn](https://www.linkedin.com/in/jagneswar-panda-5b6151283/)

---

## Local Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin (Super)** | `admin@iiit-bh.ac.in` | `admin@123` |
| **Mess Secretary** | `mess.secretary@iiit-bh.ac.in` | `secretary@123` |
| **Kitchen Staff** | `staff@iiit-bh.ac.in` | `staff@123` |
| **Student (1st Floor)** | `student@iiit-bh.ac.in` | `Student@123` |

Run `npm run seed` to create the demo accounts in MongoDB. When both bootstrap environment variables are configured, starting the backend also creates the admin account if it does not already exist. Set a private bootstrap password outside local development.

---

## ✨ Core Features

### 🎓 For Students
- **Dynamic menu browsing** — view today, tomorrow, and upcoming menus with dietary labels, allergens, and special-meal flags.
- **Meal registration** — register before configurable cutoff windows; cancel anytime before the cancellation window.
- **QR meal pass** — signed, short-lived QR token for contactless check-in.
- **Attendance history** — monthly meal count, streak, and full timeline.
- **Live billing** — itemized running bill with immutable snapshots; pay via UPI, Card, or Net Banking (mock provider).
- **Refund requests** — request meal refunds with admin approval workflow.
- **Complaints** — categorized grievances with image uploads, priorities, and full resolution timeline.
- **Feedback** — rate taste, quality, hygiene, quantity, and overall satisfaction after attending a meal.
- **Guest meal booking** — reserve meals for guests with automatic billing sync.

### 🍳 For Kitchen Staff
- **Menu & prep view** — read-only view of today’s and tomorrow’s meal items.
- **QR attendance** — scan student meal passes; manual fallback by student ID.
- **Wastage recording** — log leftover, spoiled, or overcooked items with cost estimates.
- **Inventory requests** — request stock from the admin; track approval status.
- **Leave management** — submit leave requests for kitchen duty.

### 📋 For Mess Committee
- **Menu CRUD** — create, edit, and publish daily menus with auto-created meal sessions.
- **Billing & payments** — view all student payments, approve refunds, manage adjustments.
- **Complaint resolution** — assign, update status, and respond to student grievances.
- **Inventory & suppliers** — manage stock, purchase orders, and low-stock alerts.
- **Announcements** — publish notices to targeted roles with real-time delivery.

### 🛡️ For Admin (Super)
- **Institutional analytics** — attendance, feedback trends, wastage, and financial performance.
- **User management** — approve, suspend, or reactivate any account (warden protected).
- **Pricing control** — set per-meal prices and Ground Floor semester fee; **exclusive to Admin**.
- **Policy configuration** — registration cutoffs, cancellation windows, leave policies.
- **Audit logs** — full history of sensitive actions.
- **Role management** — configure permissions and manage Mess Committee accounts.

---

## 🏢 Dual Mess System

MealTrack supports **two parallel mess systems** running on the same menu:

| Feature | 1st Floor Mess | Ground Floor Mess |
|---|---|---|
| **Payment model** | Pay per meal | One-time semester fee (₹25,000 default) |
| **Registration** | Daily, before cutoff | Enrolled once for the entire semester |
| **Meal selection** | Any meal, any day | **Minimum 3 out of 4 meals** (breakfast/lunch/snacks/dinner) |
| **Attendance** | QR or manual check-in | Staff marks present from the semester roster |
| **Billing** | Monthly running bill | Prepaid; no per-meal billing |
| **Pass** | QR meal pass per session | Printable **Semester Pass** with payment reference |

> Students choose their mess system after first login. The choice can be reset by an Admin if required.

---

## 🛠️ Tech Stack

### Backend
- **Node.js 20+** & **Express.js** (ES Modules)
- **MongoDB** & **Mongoose 8** (Atlas-ready, indexed schemas)
- **JWT authentication** with **refresh-token rotation** and **HttpOnly cookies**
- **Zod** for request validation
- **Helmet**, **CORS**, **express-rate-limit**, **compression**
- **Socket.IO** for real-time notifications
- **Pino** for structured logging
- **Cloudinary** (optional) for image uploads
- **Multer** for file handling

### Frontend
- **React 18** + **Vite 6**
- **Redux Toolkit** & **RTK Query** for server-state management
- **React Router 6** with protected routes and role guards
- **Recharts** for analytics (where applicable)
- **Lucide React** for icons
- **Sonner** for toast notifications
- **QRCode.react** for QR generation
- **html5-qrcode** for scanning

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client["React Client (Vite + Redux Toolkit)"]
        UI[Role-Based UI]
        RTK[RTK Query Cache]
        SOCK[Socket.IO Client]
    end

    subgraph Server["Express Server (Node.js)"]
        AUTH[JWT Auth + Refresh Rotation]
        RBAC[Authorize Middleware]
        API[REST API v1]
        SIO[Socket.IO Rooms]
    end

    subgraph Data["MongoDB"]
        USERS[(Users)]
        MENUS[(Menus / Sessions)]
        BILLS[(Bills / Payments)]
        COMPLAINTS[(Complaints)]
        INVENTORY[(Inventory)]
        AUDIT[(Audit Logs)]
    end

    UI -->|HTTPS + HttpOnly Cookies| API
    UI --> RTK
    RTK --> API
    SOCK <--> SIO
    API --> AUTH
    API --> RBAC
    AUTH --> USERS
    RBAC --> API
    API --> MENUS
    API --> BILLS
    API --> COMPLAINTS
    API --> INVENTORY
    API --> AUDIT
