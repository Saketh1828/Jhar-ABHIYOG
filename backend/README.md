# Samasya Nivark Backend REST API

Production Node.js + Express + MongoDB REST API backend for **Samasya Nivark** (SIH 2026), providing problem reporting, AI categorization, university project matching, corporate CSR collaborations, voice speech-to-text, i18n translation abstractions, and RBAC admin services.

---

## 🚀 Quick Start

### 1. Installation
```bash
cd backend
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/samasya_nivark
JWT_SECRET=samasya_nivark_super_secure_jwt_secret_sih2026_jharkhand
AI_SERVICE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📡 Key REST API Endpoints Summary

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System health check |
| `POST` | `/api/auth/register` | Public | Register user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & get JWT token |
| `POST` | `/api/auth/verify-identity` | Public | Demo Aadhaar identity verification flow |
| `GET` | `/api/problems` | Public | Fetch all reported societal problems (filterable) |
| `POST` | `/api/problems` | Authenticated | Report a new civic problem |
| `PUT` | `/api/problems/:id/status` | Govt / University | Update problem status (triggers resolution workflow) |
| `POST` | `/api/projects` | Univ Admin | Launch student/faculty engineering project |
| `POST` | `/api/projects/:id/join` | Student | Request to join academic project |
| `POST` | `/api/collaborations/membership-offers` | Industry Admin | Issue corporate membership/recruitment offer |
| `POST` | `/api/voice/transcribe` | Public | Speech-to-Text audio transcription fallback |
| `POST` | `/api/translation/translate` | Public | Language translation service |
| `GET` | `/api/admin/users` | Super Admin | Manage platform users and roles |
| `GET` | `/api/admin/audit-logs` | Super Admin | Inspect system security audit logs |

---

## 🛡️ Role-Based Access Control Matrix

- `SUPER_ADMIN`: Global unrestricted platform access (`/api/admin/*`)
- `UNIVERSITY_ADMIN`: Restricted to managing assigned university's projects, faculty, & student roster
- `INDUSTRY_ADMIN`: Restricted to managing corporate CSR sponsorships & membership offers
- `GOVERNMENT_ADMIN`: District administration triage & department matching
- `STUDENT` & `FACULTY`: Academic project contributions & solution prototyping
- `CITIZEN`: Problem reporting, tracking, & community support likes
