<div align="center">

# 🚀 MicroStack Builder

**AI-powered full-stack project boilerplate generator with Docker and CI/CD support.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)

[Features](#-key-features) · [How It Works](#%EF%B8%8F-how-it-works) · [Tech Stack](#%EF%B8%8F-tech-stack) · [Installation](#-installation) · [Usage](#-usage)

</div>

---

## 📖 About

**MicroStack Builder** is a modern developer productivity platform that automates the setup of scalable full-stack web applications.

Developers often spend hours configuring frontend frameworks, backend servers, authentication systems, databases, Docker environments, and CI/CD pipelines before writing a single line of real application logic. MicroStack Builder eliminates that friction — just select your stack and download a production-ready project in seconds.

> ⚡ Built for students, full-stack developers, startups, hackathon teams, and rapid prototypers.

---

## 🎯 Problem Statement

Setting up a modern full-stack project means wiring together:

- Frontend frameworks & routing
- Backend APIs & middleware
- Database schemas & connections
- Authentication (JWT, sessions)
- Docker containers & Compose files
- CI/CD workflows

This process is **time-consuming, repetitive, and error-prone** — especially during hackathons or rapid development cycles. MicroStack Builder automates the entire setup, so developers can focus on building features, not boilerplate.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🏗️ **Full-Stack Generation** | Instantly generates complete, runnable project structures |
| 🧩 **Stack Selection** | Choose your frontend, backend, database, and architecture |
| 🔐 **Auth Integration** | Pre-built JWT authentication (login & registration) |
| 🐳 **Docker Support** | Auto-generates `Dockerfile` and `docker-compose.yml` |
| ⚙️ **CI/CD Pipelines** | GitHub Actions workflow templates included |
| 📦 **ZIP Download** | Download your generated project as a ZIP file |
| 🕓 **Project History** | Saves previously generated projects and configurations |
| 🌗 **Light & Dark Mode** | Responsive UI with theme support |

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│  1. Select Stack   →   2. Generate   →   3. Download & Build    │
└─────────────────────────────────────────────────────────────────┘
```

**Step 1 — Choose Your Stack**
Pick a frontend framework, backend technology, database, and architecture style from the interactive dashboard.

**Step 2 — Generator Engine Runs**
The backend processes your configuration using template-based code generation and the Node.js file system to build your project structure.

**Step 3 — Project is Packaged**
Your project — including frontend, backend APIs, auth modules, database config, Docker setup, and CI/CD files — is compressed into a ZIP.

**Step 4 — Download & Start Building**
Download the ZIP and start developing immediately, with zero manual setup required.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Component-based UI
- **Tailwind CSS** — Utility-first responsive styling

### Backend
- **Node.js** — Server-side runtime
- **Express.js** — REST API and routing

### Database
- **SQLite** — Stores user accounts, project history, saved configurations, and settings

### Authentication
- **JWT (JSON Web Tokens)** — Secure login and authorization

### Utilities
- **Node `fs`** — Dynamic file and folder creation
- **Archiver** — ZIP file generation

### DevOps
- **Docker** — Containerized deployment
- **Docker Compose** — Multi-container orchestration
- **GitHub Actions** — CI/CD automation

---

## 🏛️ Architecture

MicroStack Builder follows **MVC architecture** with a modular, scalable design and REST API communication.

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│              Stack Selector Dashboard               │
└────────────────────────┬────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────┐
│                  Backend (Express)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Auth Module │  │   Generator  │  │  ZIP Export│ │
│  │  (JWT)       │  │   Engine     │  │  Module   │ │
│  └──────────────┘  └──────┬───────┘  └───────────┘ │
│                           │                         │
│              ┌────────────▼────────────┐            │
│              │    Template Manager     │            │
│              └────────────┬────────────┘            │
│                           │                         │
│              ┌────────────▼────────────┐            │
│              │   Project History (DB)  │            │
│              └─────────────────────────┘            │
└─────────────────────────────────────────────────────┘
```

**Core Modules:**
- **Authentication Module** — Handles login, registration, and JWT sessions
- **Generator Engine** — Processes stack config and generates project files
- **Template Manager** — Stores reusable boilerplate templates
- **ZIP Export Module** — Packages the project into a downloadable archive
- **Project History Module** — Persists previously generated projects

---

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/20ParthSharma/MicroStack-Builder.git
cd MicroStack-Builder
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

---

## ▶️ Usage

### Start the Backend

```bash
cd server
npm start
```

### Start the Frontend

```bash
cd client
npm run dev
```

Then open your browser at `http://localhost:5173` (or the port shown in terminal).

---

## 🚀 Use Cases

- 🎓 **Students** — Learn real-world project structure and architecture
- 👨‍💻 **Developers** — Skip boilerplate and start building features
- 🏢 **Startups** — Spin up MVPs quickly with production-ready defaults
- ⚡ **Hackathon Teams** — Get a full-stack base in minutes
- 🔧 **Freelancers** — Deliver client projects faster

---

## 🔮 Roadmap

- [ ] AI-powered stack recommendation engine
- [ ] One-click GitHub repository creation
- [ ] Cloud deployment integration (Vercel, Railway, Render)
- [ ] Visual drag-and-drop architecture builder
- [ ] Plugin/template marketplace

---

## 👨‍💻 Author

**Parth Sharma**
B.Tech CSE Student | Full-Stack Web Developer | AI Tools Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/20ParthSharma)

---

<div align="center">

⭐ **If you found this useful, consider giving it a star!** ⭐

</div>
