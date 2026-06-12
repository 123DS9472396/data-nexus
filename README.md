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

---

## 🔑 Integration Engine: How to get Free API Keys

The DataNexus backend features a live Integration Engine that uses official Python SDKs (`boto3`, `pymongo`, `psycopg2`, `snowflake-connector-python`, etc.) to handshake with cloud providers. 

To activate the "Connected" badges on your dashboard, generate these free credentials and paste them into the React UI:

### 1. PostgreSQL (Neon.tech) - *[No Credit Card Required]*
1. Go to [neon.tech](https://neon.tech/) and sign up.
2. Click **New Project**, name it, and create.
3. On your dashboard under "Connection Details", copy the **Postgres URI** (`postgresql://...`).

### 2. MongoDB Atlas - *[No Credit Card Required]*
1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register).
2. Choose the **M0 Free Cluster**. Create a Database User & Password.
3. Under **Network Access** (left menu), add IP `0.0.0.0/0` (Allow Anywhere).
4. Click Connect -> Drivers -> copy the **Connection String** (`mongodb+srv://...`).

### 3. Snowflake (30-Day Trial) - *[No Credit Card Required]*
1. Go to [signup.snowflake.com](https://signup.snowflake.com/).
2. Fill out the form, pick AWS as the cloud provider.
3. Check your email, activate the account, and create a Username/Password.
4. Log into Snowflake. Look at the bottom-left corner and click your account name to get your **Account Identifier** (e.g., `xy12345.us-east-1`).

### 4. Apache Kafka (Confluent Cloud) - *[No Credit Card Required]*
1. Go to [confluent.io/confluent-cloud](https://www.confluent.io/confluent-cloud/tryfree/).
2. Create a "Basic" cluster (free).
3. Go to Cluster Settings to copy your **Bootstrap server** URL.
4. Go to **API Keys** -> Create Key (Global Access). Copy the **API Key** and **Secret**.

### 5. AWS S3 (Free Tier) - *[⚠️ REQUIRES CREDIT CARD for ID Verification]*
1. Go to [aws.amazon.com/free](https://aws.amazon.com/free) and create an account. *(Note: AWS requires a credit card just to verify you are human. S3 is free under 5GB).*
2. Go to the **IAM Console** -> Users -> Create User.
3. Attach the `AmazonS3FullAccess` policy.
4. Click your new user -> Security Credentials -> Create Access Key. Copy the **Access Key ID** and **Secret Access Key**.

### 6. Salesforce (Developer Edition) - *[No Credit Card Required]*
1. Go to [developer.salesforce.com/signup](https://developer.salesforce.com/signup) and create an account.
2. In Salesforce, click the ⚙️ Gear icon -> Setup -> **App Manager**.
3. Click **New Connected App**. Check "Enable OAuth Settings".
4. Set callback URL to `http://localhost:5173`. Add the "Manage user data via APIs" scope.
5. Save and click "Manage Consumer Details" to get your **Client ID** and **Client Secret**.
