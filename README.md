# EnrollNow

**EnrollNow** is a full-stack course enrollment management system that simplifies the administration of students, instructors, departments, and course registrations. Built with scalability and flexibility in mind, it serves educational institutions looking for an efficient enrollment solution.

---

## 📘 PROJECT DESCRIPTION

EnrollNow helps academic institutions handle complex relationships such as:

* Assigning instructors to multiple departments
* Managing department heads
* Mapping courses to various academic programs
* Securing data access with robust authentication

Its modular architecture ensures maintainability and ease of future upgrades.

---

## 🚀 FEATURES PLANNED

* Student registration and management
* Instructor-to-department assignments
* Program-to-course mapping
* Secure JWT-based authentication with HttpOnly cookies
* Role-based access control for admin users
* Sequelize ORM-based relational mapping
* RESTful API architecture
* User-friendly frontend interface using React
---

## 🆕 RECENT UPDATES

* ✅ **Instructor CRUD operations** have been implemented
* ⚠️ **Testing is incomplete** – Instructor endpoints have not been fully verified yet
---

## 🔗 API ENDPOINTS (Instructor)

> ⚠️ **Note:** Implementation is in place but **testing is incomplete**. Some routes may need adjustments.

| Method | Endpoint               | Description                                                     | Status                       |
| ------ | ---------------------- | --------------------------------------------------------------- | ---------------------------- |
| GET    | `/instructors/Home`     | Returns `"Welcome To Instructor API"` (placeholder)             | ✅ Working (placeholder only) |
| GET    | `/Instructors/instructors`     | Intended to fetch all instructors (currently commented out)     | ⚠️ Untested                  |
| POST   | `/instructors`     | Create a new instructor                                         | ⚠️ Untested                  |
| PUT    | `/api/instructors/id`  | Update an instructor by ID (⚠️ currently missing `:` for param) | ⚠️ Untested / needs fix      |
| DELETE | `/api/instructors/:id` | Delete instructor by ID                                         | ⚠️ Untested                  |
 
## 🛠️ TECH STACK

* **Frontend**: React.js, Vite, CSS
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **ORM**: Sequelize
* **Authentication**: JWT + HttpOnly cookies

---

## 📦 INSTALLATION

### 🔧 BACKEND SETUP

```bash
cd backend
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
