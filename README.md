# Mini Task Management Dashboard

A premium, production-ready Full-Stack Task Management application developed as the technical screening assignment for the Full Stack Developer Intern position at **HedgeOne Consultants LLP**. 

This application features a modern, high-end glassmorphic dark theme, real-time CRUD workflows, persistent relational database storage, and fluid, responsive animations.

---

## 🛠️ Tech Stack

As per the preferred guidelines in the assignment specification, the project is built completely on a modern, robust architecture:

- **Frontend:** React.js (Vite) powered by custom CSS3 (implementing hardware-accelerated `backdrop-filter` for glassmorphic blur, fluid transitions, and interactive neon glows).
- **Backend:** Node.js with Express.js handling clean RESTful API routing and secure CRUD operations.
- **Database:** Supabase (PostgreSQL) — a cloud relational database utilized to securely persist task records across sessions and page refreshes.

---

## 🚀 Core Features Implemented

The application satisfies 100% of the core mandates with an elevated user interface:
- **Full CRUD Operations:** Seamless creation, reading, inline updating/editing, and deletion of tasks.
- **Rich Task Metadata:** Every task systematically tracks:
  - **Title** & **Description**
  - **Dynamic Status:** Auto-synchronized workflows for *Todo*, *In Progress*, and *Completed*.
  - **Due Date:** Clear deadlines displayed with custom UI styling.
- **Premium UX Enhancements:**
  - Dynamic status-based color striping on task cards.
  - Interactive, micro-animated action triggers (Sleek Mint Green `Edit` button and Crisp Crimson Red `Delete` button with smooth hover glow effects).
  - High-performance dark-mode glass containers that ensure extreme readability and visual hierarchy.

---

## 🤖 Smart AI-Assisted Development Workflow

In true alignment with HedgeOne's collaborative engineering culture that values high productivity and practical problem-solving through cutting-edge tech, **Gemini AI** (primarily) and **Claude AI** were integrated into the development cycle:

1. **UI/UX Engineering:** Leveraged AI capabilities to architect the global design system, transitioning a flat grid layout into an award-winning premium SaaS dashboard look through complex CSS shadows and transitions.
2. **Code Safety & Stability:** Assisted in refactoring inline layout patterns into modular global classes without touching core React states, keeping the live state synchronization 100% bug-free.
3. **Database Optimization:** Streamlined the integration logic between the Express backend and Supabase to achieve fast, low-latency API response cycles.

---

## 💻 Local Setup & Installation Instructions

Follow these clear steps to clone and run the application locally on your machine:

1. Clone the Repository
```bash
git clone [https://github.com/pkyadav-png/HEDGEONE-PROJECT](https://github.com/pkyadav-png/HEDGEONE-PROJECT)
cd HEDGEONE-PROJECT

2. Environment Configuration
Create a .env file in your root directory and include your database credentials:

Code snippet
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_public_key
PORT=5000

3. Install Dependencies & Start the Application

For the Backend Server:
Bash
npm install
npm start


For the Frontend Dashboard:
Bash
npm install
npm run dev



📬 Developer Contact & Submission Details

Developer Name: Pappu Kumar (PK Yadav)

Role Applied For: Full Stack Developer Intern (Summer 2026)

Submission Date: May 2026

Thank you for reviewing my screening project. Looking forward to the opportunity to build custom software solutions with the founding team at HedgeOne Consultants.
