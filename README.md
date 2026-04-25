# 📦 WMS — Warehouse Management System

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GCP](https://img.shields.io/badge/GCP_Cloud_Run-4285F4?style=flat-square&logo=googlecloud&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

A full-featured warehouse management system built with React + Supabase, deployable to Google Cloud Run via GitHub Actions CI/CD.

---

## ✨ Features

| Module | Description |
|---|---|
| **Dashboard** | KPI overview — orders, stock levels, labor hours |
| **Inventory** | Real-time stock tracking, SKU management |
| **Receiving** | Inbound shipment processing & PO matching |
| **Orders** | Order lifecycle management |
| **Shipping** | Outbound logistics & carrier integration |
| **Returns** | RMA processing & restocking workflows |
| **Labor** | Staff scheduling, task assignment, time tracking |
| **Reports** | Exportable analytics across all modules |

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── layout/       # AppLayout, Sidebar
│   └── ui/           # Badge, Modal, DataTable, StatCard, etc.
├── context/
│   ├── AuthContext.jsx
│   └── WarehouseContext.jsx
├── lib/
│   └── supabase.js
├── pages/
│   ├── Dashboard.jsx
│   ├── InventoryPage.jsx
│   ├── ReceivingPage.jsx
│   ├── OrdersPage.jsx
│   ├── ShippingPage.jsx
│   ├── ReturnsPage.jsx
│   ├── LaborPage.jsx
│   └── ReportsPage.jsx
├── App.jsx
└── main.jsx
supabase_schema.sql   # Full DB schema — run this first
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js ≥ 18
- A [Supabase](https://supabase.com) project

### 2. Database setup

Run the schema against your Supabase project **before** starting the app:

```bash
psql "postgresql://postgres:<password>@<host>:5432/postgres" -f supabase_schema.sql
```

Or paste it into the **SQL Editor** in the Supabase dashboard.

### 3. Environment variables

Create a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### 4. Install & run

```bash
npm install
npm run dev
```

---

## 🐳 Docker

```bash
# Build
docker build -t wms-app .

# Run locally
docker run -p 8080:8080 \
  -e VITE_SUPABASE_URL=... \
  -e VITE_SUPABASE_ANON_KEY=... \
  wms-app
```

---

## ☁️ CI/CD — Deploying to GCP Cloud Run

See **[CI/CD Guide](./CICD_GCP.md)** for the full step-by-step walkthrough covering:

- GCP project setup & IAM
- Artifact Registry configuration
- GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Secrets management
- Cloud Run service configuration

---

## 🔐 Auth

Authentication is handled by Supabase Auth. Protected routes redirect unauthenticated users to `/login`. The `WarehouseProvider` context is only mounted for authenticated sessions.

---

## 📄 License

MIT