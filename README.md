# Campus Notifications Microservice Platform Evaluation

**Candidate ID:** 2303A51408  
**Role:** Frontend Campus Hiring Evaluation  

---

## 🚀 Project Overview & Status

This repository contains the completely implemented solution for both **Stage 1** and **Stage 2** of the Affordmed Campus Notifications Platform. All constraints, including custom weight prioritization, stateful tracking, and Material UI layout configurations, have been fully satisfied.

### 📁 Directory Layout Map
- `Stage 1/` — Contains core logic implementation (`stage1.js`) and terminal execution proof.
- `Stage 2/` — Houses project documentation artifacts, user interface snapshots, and the application demo screencast.
- `stage2/` — Active working production Vite + React application workspace.
- `Notification_System_Design.md` — Detailed system design write-up regarding data structure choices (Min-Heaps) for high-concurrency message processing.

---

## 🛠️ Features Implemented

### Stage 1: Logic & System Design
- **Priority Logic Matrix:** Implemented strict categorization rules where notifications are sorted by `Placement` (Weight 3) > `Result` (Weight 2) > `Event` (Weight 1).
- **Recency Tie-Breaker:** When weights match, the stream automatically falls back to descending chronological order based on the `Timestamp`.
- **Stand-Alone Engine:** Created an isolated runner script to handle data processing smoothly without structural database dependancies.

### Stage 2: React UI Frontend Integration
- **Material UI Exclusivity:** The entire frontend layout is built from scratch using pure `@mui/material` systems for a neat, professional finish.
- **Dual View System:** Built interactive `Tabs` to seamlessly toggle between the full notification stream and the optimized **Priority Inbox**.
- **Stateful Read/Unread Mechanics:** Implemented local state tracking array vectors to handle card selections. Unread notifications display bold typography with a blue accent edge, while read notifications transition to a neutral background with regular text.
- **Advanced Query Parameters:** Fully wired up to support dynamic pagination (`page`, `limit`) and custom category sorting filters directly via the layout dashboard dropdown.

---

## 🏃‍♂️ How to Run the Frontend Application

To spin up the user interface locally on your system, execute the following commands in sequence:

1. Move into the application root:
   ```bash
   cd stage2
