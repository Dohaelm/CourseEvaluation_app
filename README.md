
# Course Evaluation App for ASEDS

## 📌 Overview
The **Course Evaluation App** is a web platform designed for the **ASEDS program** at our school. Its main purpose is to allow students to provide **anonymous feedback** on completed courses, helping teachers improve their teaching methods and providing valuable insights for future students. The application supports **three roles**:

- **🧑‍🎓 Students:** Can anonymously evaluate completed courses and view upcoming courses.
- **👨‍🏫 Teachers:** Can see student feedback on their courses.
- **🛠️ Admins:** Manage users, courses, and oversee platform operations.

This project was developed using **Spring Boot** for the backend and **React** for the frontend. Since this is my **first experience with Dockerization**, the functionalities remain simple while ensuring containerized deployment.

---

## 🚀 Features
- **Anonymous Course Evaluations:** Students can provide feedback on completed courses.
- **Course Visibility:** Students can view the list of courses they will study in upcoming semesters.
- **Feedback Insights for Teachers:** Teachers can see students' opinions on their courses.
- **Admin Dashboard:** User and course management functionalities.
- **Dockerized Deployment:** The app is containerized for easy deployment and scalability.

---

## 🛠️ Tech Stack
- **Backend:** Spring Boot (Java)
- **Frontend:** React (Vite + JavaScript)
- **Database:** MySQL
- **Authentication:** JWT
- **Containerization:** Docker & Docker Compose

---

## 🏗️ Running the App Locally
If you want to run the app **locally** (without Docker), follow these steps:

### **Backend (Spring Boot)**
```bash
# Clone the repository
git clone https://github.com/your-repo/course-evaluation.git
cd course-evaluation/CourseEvaluation-Backend

# Install dependencies
mvn clean install

# Configure `application.properties` in `src/main/resources/` with your database credentials. Make sure Mysql service is running on port 3306.

# Run the backend
mvn spring-boot:run
```

### **Frontend (React)**
```bash
# Navigate to the frontend folder
cd ../CourseEvaluation-Frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```

The backend runs on **`http://localhost:8080`** and the frontend on **`http://localhost:3000`**.

---

## 🐳 Running the Dockerized Version
To run the **Dockerized** version of the app:

```bash
# Pull the required Docker images from Docker Hub
docker pull dohaelm123/backend-ce:v1
docker pull dohaelm123/frontend-ce:v1
docker pull mysql:8.0

# Use Docker Compose (a `docker-compose.yml` file is already in the project root)
docker-compose up -d
```

The app will be accessible via:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8080`

To stop the application:
```bash
docker-compose down
```

---

## 📌 Notes
- Ensure **Docker** and **Docker Compose** are installed on your system.
- If needed, modify the `docker-compose.yml` file to update environment variables (e.g., database credentials).
- This project is my first attempt at **Dockerizing a full-stack application**, so feedback is welcome!




