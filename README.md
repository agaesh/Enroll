# EnrollNow

**EnrollNow** is a full-stack course enrollment management system that simplifies the administration of students, instructors, departments, and course registrations. Built with scalability and flexibility in mind, it serves educational institutions looking for an efficient enrollment solution.

---

## 📘 PROJECT DESCRIPTION

EnrollNow helps academic institutions handle complex relationships such as:

- Assigning instructors to multiple departments
- Managing department heads
- Mapping courses to various academic programs
- Securing data access with robust authentication

Its modular architecture ensures maintainability and ease of future upgrades.

---

## 🚀 FEATURES

- Student registration and management  
- Instructor-to-department assignments  
- Program-to-course mapping  
- Secure JWT-based authentication with HttpOnly cookies  
- Role-based access control for admin users  
- Sequelize ORM-based relational mapping  
- RESTful API architecture  
- User-friendly frontend interface using React

---

## 🛠️ TECH STACK

- **Frontend**: React.js, Vite, CSS
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **ORM**: Sequelize  
- **Authentication**: JWT + HttpOnly cookies

---

## 📦 INSTALLATION

### 🔧 BACKEND SETUP

```bash
cd backend
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev

im just updating the read iin