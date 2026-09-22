# SAMASYA NIVARK — Full-Stack Civic Problem Reporting & Solution Platform

> **Tagline**: *"From Community Problems to Real-World Solutions."*

**SAMASYA NIVARK** is a digital platform designed for Jharkhand to crowdsource societal challenges, AI-categorize and prioritize reported problems, route validated issues to government receivers and university/industry research partners, and track the complete lifecycle from citizen complaint to real-world solution.

---

## 🏛️ System Architecture

```
                                +-----------------------------------+
                                |     React 18 + Vite Frontend      |
                                |     (Tailwind CSS + Leaflet Maps) |
                                +-----------------+-----------------+
                                                  |
                                                  | REST API / Axios
                                                  v
                                +-----------------+-----------------+
                                |    Node.js + Express REST API     |
                                |  (JWT Auth + RBAC Middleware)     |
                                +--------+----------------+---------+
                                         |                |
                                         v                v
                        +----------------+--+   +---------+---------+
                        |  MongoDB Atlas    |   | Python FastAPI    |
                        |  (Mongoose DB)    |   | AI Microservice   |
                        +-------------------+   +-------------------+
```

---

## 🚀 Getting Started & Local Setup

### 1. Frontend Setup (React + Vite)
```bash
# Install root dependencies
npm install

# Start development server on http://localhost:3000
npm run dev

# Build production bundle
npm run build
```

### 2. Node.js + Express Backend Setup (`/backend`)
```bash
cd backend

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env

# Seed MongoDB database with initial Jharkhand demo dataset
npm run seed

# Start backend REST API server on http://localhost:5000
npm run dev
```

### 3. Python FastAPI AI Service Setup (`/ai-service`)
```bash
cd ai-service

# Install Python dependencies
pip install -r requirements.txt

# Start Python AI microservice on http://localhost:8000
python -m uvicorn main:app --reload --port 8000
```

---

## 🔑 Environment Variables (`.env`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Express Backend Port |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/samasya_nivark` | MongoDB Connection URI |
| `JWT_SECRET` | `samasya_nivark_super_secure_jwt_secret` | JWT signing secret |
| `AI_SERVICE_URL` | `http://localhost:8000` | Python FastAPI AI Endpoint |
| `FRONTEND_URL` | `http://localhost:3000` | Allowed CORS Frontend Client |
| `EMAIL_PROVIDER` | `demo` | Email service mode (`demo` / `sendgrid`) |
| `STORAGE_PROVIDER` | `local` | Object file storage provider |

---

## 🎙️ Speech-to-Text & Jharkhand Language Matrix

Integrated browser-native **Web Speech API** (`window.SpeechRecognition`) with capability detection for 10 native Jharkhand languages and backend fallback (`POST /api/voice/transcribe`):

| Language | Code | Native Name | Speech Recognition Mode |
| :--- | :--- | :--- | :--- |
| English | `en` | English | Browser Native Speech |
| Hindi | `hi` | हिन्दी | Browser Native Speech |
| Bengali | `bn` | বাংলা | Browser Native Speech |
| Urdu | `ur` | اردو | Browser Native Speech |
| Santhali | `sat` | ᱥᱟᱱᱛᱟᱲᱤ | Backend Speech Fallback |
| Kurukh | `kru` | कुड़ुख़ | Backend Speech Fallback |
| Mundari | `mun` | मुंडारी | Backend Speech Fallback |
| Nagpuri | `nag` | नागपुरी | Backend Speech Fallback |
| Khortha | `kho` | खोरठा | Backend Speech Fallback |
| Panchpargania | `pan` | पंचपरगनिया | Backend Speech Fallback |

---

## 👑 Role-Based Access Hierarchy & Predefined Test Accounts

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin (Level 1)** | `creator.admin@samasya.example` | `password123` | Global Platform Control (`/admin`) |
| **BIT Mesra Admin (Level 2)** | `univ.admin@samasya.example` | `password123` | BIT Mesra Roster & Projects (`/university-admin`) |
| **Tata Steel CSR Admin (Level 3)** | `industry.admin@samasya.example` | `password123` | Tata Steel CSR & Memberships (`/industry-admin`) |
| **Govt Admin** | `admin.dumka@samasya.example` | `password123` | Government Triage Portal (`/government`) |
| **Citizen** | `birsa.soren@samasya.example` | `password123` | Reporting & Tracking (`/`, `/explore`, `/my-reports`) |

---

## 🎨 Visual Identity & Color Palette

- **Primary**: Deep Navy `#0F2747`
- **Secondary**: Teal `#0F766E`
- **Accent**: Saffron / Amber `#D97706`
- **Background**: Light Slate `#F8FAFC`
- **Surface**: White `#FFFFFF`

---

## 📄 License & SIH 2026

Developed for Smart India Hackathon 2026 (Problem Statement ID: SIH26043 - Government of Jharkhand).
