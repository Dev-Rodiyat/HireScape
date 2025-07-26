# 💼 HireScape

**HireScape** is a modern job listing platform built for both employers and applicants. It allows companies to post job openings and track applicants, while giving job seekers an easy-to-navigate interface to browse, apply, and track job opportunities.

---

## ✨ Features

### 👤 Authentication

* Register/Login (applicant & employer roles)
* Role-based navigation and access
* Persistent sessions with JWT

### 🧑‍💼 For Employers

* Post new jobs with detailed options (salary, type, location, etc.)
* View and manage all posted jobs
* Track applicant status (new, shortlisted, hired, etc.)
* Dashboard and analytics view (optional)

### 🧑‍💻 For Applicants

* Browse all open jobs
* Apply to jobs
* Track application status (applied, shortlisted, etc.)
* Personalized dashboard

### 🛠️ Job Management

* Full CRUD for jobs
* Role-based access control
* Mongoose validation and schemas

### 📱 Responsive Design

* Fully responsive layout using **Tailwind CSS**
* Mobile menu and dashboard modal
* Theme-aware design (light/dark support optionally)

---

## 🧰 Tech Stack

| Category           | Technology                                       |
| ------------------ | ------------------------------------------------ |
| **Frontend**       | React, Redux Toolkit, React Router, Tailwind CSS |
| **Backend**        | Node.js, Express.js                              |
| **Database**       | MongoDB, Mongoose                                |
| **Authentication** | JWT (JSON Web Tokens)                            |
| **Icons/UI**       | Lucide React Icons                               |
| **Other**          | Cloudinary (optional for uploads), dotenv, CORS  |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Dev-Rodiyat/HireScape.git
cd HireScape
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
# Fill in your MongoDB URI, JWT_SECRET, etc.

npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📁 Project Structure

```
hirescape/
├── client/               # React frontend
│   ├── components/
│   ├── pages/
│   └── redux/
├── server/               # Express backend
│   ├── controller/
│   ├── models/
│   ├── routes/
│   └── middleware/
```

---

## 🧪 Future Improvements

* In-app messaging between employer & applicant
* Admin dashboard for platform management
* Resume upload and preview
* Email notifications on application updates
* Search & filtering system for jobs
