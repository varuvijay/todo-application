# TODO Project

A full-stack TODO application featuring a React frontend and a Spring Boot backend.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Frontend Setup (React)](#frontend-setup-react)
   - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
- [Configuration](#configuration)
- [Todo REST API Documentation](#todo-rest-api-documentation)
- [License](#license)

---

## Overview

This project is a simple and robust TODO application. The frontend is built with React, providing a responsive and interactive user experience. The backend is powered by Spring Boot, offering secure RESTful APIs for task management and user authentication.

---

## Features

- User authentication (register, login, logout)
- Create, edit, and delete tasks
- Responsive UI with Tailwind CSS and Framer Motion
- RESTful API integration between frontend and backend
- Persistent storage with a relational database (e.g., PostgreSQL or H2)
- Error handling and validation

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Axios
- **Backend:** Spring Boot, Spring Security, JPA/Hibernate
- **Database:** PostgreSQL (or H2 for development)
- **Build Tools:** npm, Maven/Gradle

---

## Project Structure

```
todo-project/
├── todo-client/      # React frontend
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── layout/
│       └── pages/
└── todo-server/      # Spring Boot backend
      └── src/
            ├── main/
            │   ├── java/
            │   └── resources/
            └── test/
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Java 17+ (for Spring Boot)
- Maven or Gradle
- PostgreSQL (or use H2 for development)

---

### Frontend Setup (React)

1. Navigate to the frontend directory:

    ```sh
    cd todo-client
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the development server:

    ```sh
    npm run dev
    ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Backend Setup (Spring Boot)

1. Navigate to the backend directory:

    ```sh
    cd todo-server
    ```

2. Configure your database connection in `src/main/resources/application.properties`.

3. Build and run the backend:

    ```sh
    ./mvnw spring-boot:run
    ```

    The backend will start at [http://localhost:8083](http://localhost:8083).

---

## Configuration

- The frontend expects the backend API at `http://localhost:8083`.
- Update the API base URL in [`src/api/axios.js`](todo-client/src/api/axios.js) if needed.
- Backend database and security settings can be configured in `application.properties`.

---

# Todo REST API Documentation

## Base URL
`http://localhost:8083`

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /api/auth/register`  
**Description:** Register a new user account  
**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```
**Validation Rules:**
- Username: 3-15 characters
- Password: Must contain:
    - At least 8 characters
    - One uppercase letter
    - One lowercase letter
    - One number
    - One special character (@#$%^&+=)
- Email: Valid email format (required)

**Response:**
- Status: 200 OK
- Content: Map<String, String>

### 2. Login
**Endpoint:** `POST /api/auth/login`  
**Description:** Authenticate user and create session  
**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```
**Response:**
- Status: 200 OK
- Content: Map<String, Object>

### 3. Logout
**Endpoint:** `POST /api/auth/logout`  
**Description:** End user session  
**Headers:**
- X-Session-ID (required): string

**Response:**
- Status: 200 OK
- Content: Map<String, String>

## Task Management Endpoints

### 1. Get All Tasks
**Endpoint:** `GET /api/tasks/`  
**Description:** Retrieve all tasks for authenticated user  
**Headers:**
- X-Session-ID (required): string

**Response:**
- Status: 200 OK
- Content: Object

### 2. Create Task
**Endpoint:** `POST /api/tasks/`  
**Description:** Create a new task  
**Headers:**
- X-Session-ID (required): string

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "status": "Pending|Completed"
}
```
**Response:**
- Status: 200 OK
- Content: Object

### 3. Get Task by ID
**Endpoint:** `GET /api/tasks/{id}`  
**Description:** Retrieve specific task by ID  
**Parameters:**
- id (path): integer (int64)

**Headers:**
- X-Session-ID (required): string

**Response:**
- Status: 200 OK
- Content: Object

### 4. Update Task
**Endpoint:** `PUT /api/tasks/{id}`  
**Description:** Update existing task  
**Parameters:**
- id (path): integer (int64)

**Headers:**
- X-Session-ID (required): string

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "status": "Pending|Completed"
}
```
**Response:**
- Status: 200 OK
- Content: Object

### 5. Delete Task
**Endpoint:** `DELETE /api/tasks/{id}`  
**Description:** Delete specific task  
**Parameters:**
- id (path): integer (int64)

**Headers:**
- X-Session-ID (required): string

**Response:**
- Status: 200 OK
- Content: Object

## Models

### TaskRequest
```json
{
  "name": "string",
  "description": "string",
  "status": "Pending|Completed"
}
```

### UserRequest
```json
{
  "username": "string (3-15 chars)",
  "password": "string (complex password)",
  "email": "string (required)"
}
```

## Notes

- All authenticated endpoints require header `X-Session-ID`
- Task status can only be either "Pending" or "Completed"
- The API uses session-based authentication
- CORS is enabled
- Timestamps (createdAt, updatedAt) are automatically managed for tasks
- User passwords are encrypted before storage

---

## License

This project is for educational purposes.
