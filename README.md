# DataNexus: Enterprise Data Operations Platform

DataNexus is a full-stack, microservice-based enterprise platform designed for Real-time ETL Operations, Pipeline Monitoring, and Data Cataloging.

## 🚀 Architecture Overview

This project implements a highly scalable, decoupled architecture to demonstrate full-stack engineering capabilities:

- **Frontend (React + Vite):** A responsive, dark-mode enterprise dashboard featuring real-time Server-Sent Events (SSE), JWT authentication, and interactive data grids.
- **Core API (Django + PostgreSQL):** A secure RESTful API handling user authentication, pipeline CRUD operations, dataset management, and external integration configuration.
- **Event Streamer (Node.js + MongoDB):** A high-throughput microservice that listens for pipeline execution webhooks and broadcasts real-time updates to the React frontend via WebSockets/SSE.
- **Infrastructure (Docker):** The entire application is fully containerized using Docker Compose for seamless local development.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router DOM, Vanilla CSS
- **Backend:** Python, Django, Django REST Framework, Psycopg2
- **Microservice:** Node.js, Express, MongoDB
- **Databases:** PostgreSQL (Relational Data), MongoDB (Event Logging)
- **Deployment:** Docker, Docker Compose

## ⚡ Features

1. **Live Event Streaming:** Real-time terminal output of pipeline executions without page reloads.
2. **Third-Party Integrations Engine:** Securely store API keys and establish real-time connection handshakes with AWS, Snowflake, and MongoDB.
3. **Database Admin Panel:** Fully registered Django Admin GUI for managing Users, Pipelines, and Datasets.
4. **JWT Authentication:** Secure login flow with access and refresh tokens.

## 🏃‍♂️ How to Run Locally

1. Clone the repository.
2. Ensure Docker Desktop is running.
3. Run `docker-compose up --build -d`
4. Access the React Dashboard at `http://localhost:5173`
5. Access the Django Admin at `http://localhost:8000/admin`
