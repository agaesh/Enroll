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
* ✅ **Unit Testing is complete** – Instructor endpoints have not been fully verified yet
---

## 🔗 API ENDPOINTS (Instructor)

> ✅ **Note:** Unit Testing has been conducted.
> ⚠️ **Note:** Integration Test has not been conducted.

| Method | Endpoint               | Description                                                     | Status                       |
| ------ | ---------------------- | --------------------------------------------------------------- | ---------------------------- |
| GET    | `/instructors/Home`     | Returns `"Welcome To Instructor API"` (placeholder)             | ✅ Working (placeholder only) |
| GET    | `/Instructors/`     | Intended to fetch all instructors (currently commented out)     | ✅ Working                 |
| POST   | `/instructors`     | Create a new instructor                                         | ✅ Working                  |
| PUT    | `/instructors/:id`  | Updating the Instructor by taking the id as paramenter | ✅ Working     |
| DELETE | `/instructors/:id` | Delete instructor by ID                                         |    ✅ Working               |

Here’s your documentation exactly as you wrote it, Sir Agaesh, without changing anything:

---

# Program Management Module – Functional Documentation

## Overview

This module implements the **Program management logic** inside the system.
It is responsible for handling all operations related to `ProgramCourse` records, including:

* Creating programs
* Updating programs
* Deleting programs
* Retrieving programs
* Searching programs with pagination (Technically used by GetAllPrograms)

This module is consumed internally by controllers and is **not exposed as a standalone public API**.

---

### Core Program Services and Usage

| Function       | Used By / Entry Point                    | Actual Behavior in System                                                                                                                                                               |
| -------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getProgramById | Program detail view (GET /program/:id)   | Fetches a single ProgramCourse record by primary key. Used when viewing or editing a specific program.                                                                                  |
| createProgram  | Program creation flow (POST /program)    | Inserts a new ProgramCourse record into the database. Relies on DB unique constraints for validation.                                                                                   |
| updateProgram  | Program edit flow (PUT /program/:id)     | Updates existing ProgramCourse fields based on provided input. Throws error if program does not exist.                                                                                  |
| deleteProgram  | Program management (DELETE /program/:id) | Removes a ProgramCourse record. Delete logic handled in controller, service executes DB operation.                                                                                      |
| searchPrograms | Employee listing (GET /program)          | Performs wildcard search on `name` and `code`, supports pagination using `page` and `limit`, and supports `top` to limit result size. Used to power listing screens and search filters. |

---

## Search Programs Service

### Function

```
searchPrograms(top,page,limit,Search)
```

### Input

```js
{
  search: "CS",
  page: 1,
  limit: 10
}
```

### Behavior

* Performs wildcard search on:

  * `name`
  * `code`
* Uses pagination logic:

  ```
  offset = (page - 1) * limit
  ```
* Queries database using Sequelize `Op.like`

### Output

```js
{
  programs: [...],
}
Above Code Return Programs, But It lacked response code and it must be standardized
```

---

## Program Creation Logic

### Function

```
createProgram(data)
```

### Input

```js
{
  code: "AI01",
  name: "Artificial Intelligence",
  level: "Degree",
  type: "PROGRAM"
}
```

### Behavior

* Directly inserts record into database.
* No manual duplicate checking.
* Database enforces uniqueness using:

  ```
  UNIQUE(code, level, type)
  ```

### Failure Case

* If duplicate exists, database throws constraint error.
* Error propagates to controller.

---

## Delete Program Logic

### Function

```
deleteProgram(id)
```

### Behavior

* Delete logic is handled in `ProgramService`.
* Controller only calls Delete Method In Program Saervice.
* If no rows affected, controller throws error.

---

## Controller Simplification

### What was changed

Removed logic like:

> “Only return response if addProgram is successful”

### Reason

* Service throws exceptions automatically.
* Controllers rely on try/catch.
* Global error handler formats failure.

This results in:

* Linear flow
* Less defensive code
* Proper exception-based design

---

## Database as Single Source of Truth

The service layer no longer performs:

* Duplicate code validation
* Manual integrity checks

Because:

* Database already enforces business rules.
* This avoids logic duplication.
* Prevents race conditions.

---

## Execution Flow (Internal)

```
Controller → ProgramService → Sequelize → Database
```

No external consumers.
No network boundary.
Pure internal business logic.

---

## Why This Matters (Engineering Perspective)

This refactor achieved:

* Removal of redundant validations
* Trust in DB constraints
* Clean service contracts
* Predictable error flow
* Maintainable architecture

This is **how real backend systems are written**:

> Services enforce behavior, database enforces truth, controllers orchestrate.

---

## One-line Summary (Internal Docs / CV)

> Refactored Program management module by introducing search with pagination, simplifying controller logic, removing redundant validations, and relying on database constraints for data integrity.
> This is **service-level engineering**, not API design — and that’s actually more impressive technically.

 
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
