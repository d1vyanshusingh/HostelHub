# HostelHub – Smart Hostel Management System (React SPA Frontend)

A modern, responsive Single Page Application (SPA) built for university and institutional hostel operations. Featuring role-based interfaces for **Students**, **Wardens**, and **Administrators**, designed with a polished Indigo & Slate styling system using **React**, **Tailwind CSS**, and **Lucide React**.

---

## 🚀 Key Features

### 1. State-Based Authentication & Role Switching
- Multi-role login screen supporting **Student**, **Warden**, and **Admin** personas.
- Quick 1-click identity selection for effortless demoing and role verification.
- Dynamic navigation menus and permission-governed view rendering.
- Role-switcher shortcut in header & sidebar to test all 3 views instantly.

### 2. Student Module
- **Dashboard Overview**: Key metrics (Allocated Room, Active Complaints, Assigned Mess, Hostel Fee Status), Roommate snapshot, and today's meal schedule.
- **Room Management & Inventory**: Detailed room allotment sheet (Block, Room No, Bed No, Air-conditioning, Restroom) and verified physical asset checklist (Bed, Mattress, Study Table, Ergonomic Chair, Modular Wardrobe, Wi-Fi AP).
- **Maintenance & Complaints Portal**: Interactive ticket submission form (Category, Priority, Preferred Inspection Slot, Description) and live ticket history table with search and status filters (*Pending*, *In Progress*, *Resolved*).
- **Weekly Mess Schedule**: 7-day rotational meal matrix (Breakfast, Lunch, High Tea, Dinner) with nutritional timings.
- **Hostel Fee Records**: Clear financial summary (Total Assessment, Paid Amount, Balance Outstanding, Breakdown) with simulated official receipt PDF downloads.
- **Student Profile**: Comprehensive hosteller record, academic branch, permanent contacts, and emergency curfew guidelines.

### 3. Warden Module
- **Warden Overview Dashboard**: Real-time KPI metrics (Total Students, In-Campus Attendance %, Available/Vacant Beds, Pending Maintenance Complaints, Active Gate Passes).
- **Actionable Maintenance Hub**: Interactive resolution table with direct action controls (*Mark In Progress*, *Assign Technician*, *Approve & Resolve*) with inspector remarks and audit trail.
- **Quick Hotline Bar**: Instant access to security and estate desk contacts.

### 4. Admin Module
- **Executive Analytics**: Macro capacity metrics (1,500 Beds, 94.2% occupancy), Annual Fee Revenue ledger (₹3.18 Cr collection), and maintenance turnaround stats.
- **Visitor Gate Management**: Digital Gate Pass logging modal (Visitor Name, Phone, Resident Student, Room, Relationship, ID Proof, Purpose of Visit) and gate checkout action buttons.
- **Fee Master Ledger**: Cross-student fee tracking with payment filters (*Paid*, *Partial*, *Pending*), balance calculations, and 1-click automated SMS payment reminder triggers.

---

## 📁 File Structure

```
hostelhub-frontend/
├── index.html          # Standalone previewable HTML (zero npm build needed, open directly in browser)
├── package.json        # Dependencies for Vite / React
└── src/
    └── App.jsx         # Production React component with Tailwind CSS & Lucide React
```

---

## 🛠️ How to Run

### Option A: Instant Browser Preview (Zero Setup)
Simply double-click or open `index.html` directly in Google Chrome, Microsoft Edge, or Mozilla Firefox. It runs self-contained using React 18, Babel, and Tailwind CDN.

### Option B: With Vite & Node.js
```bash
cd hostelhub-frontend
npm install
npm run dev
```

---

## 🔌 Connecting to Spring Boot & MySQL Backend

The internal state management and mock data models are mapped directly to standard Spring Boot JPA entities:

| Frontend State | Spring Boot REST Endpoint | Database Table |
|---|---|---|
| `complaints` | `GET/POST /api/complaints`, `PUT /api/complaints/{id}/status` | `complaints` |
| `visitors` | `GET/POST /api/visitors`, `PUT /api/visitors/{id}/checkout` | `visitor_logs` |
| `fees` | `GET /api/fees`, `POST /api/fees/{id}/remind` | `student_fees` |
| `currentUser` | `POST /api/auth/login`, `GET /api/auth/me` | `users`, `roles` |
| `MESS_SCHEDULE` | `GET /api/mess/weekly-menu` | `mess_menus` |
