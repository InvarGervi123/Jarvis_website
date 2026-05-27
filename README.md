# J.A.R.V.I.S Web Operating System & Chrome Extension 🌐⚡
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/6573028b-432a-45a4-869f-70c309954c9c" />
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/b7957575-0966-4c1b-907e-7e877fd0ea6c" />
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/5fab7cfe-b4d6-47e6-9e7a-78b7d84a8648" />
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/f17a739e-e805-43f9-abb0-8d47de199f9e" />
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/e85f4060-3ded-4542-b074-1d9c9af77ce9" />

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-68a063.svg?logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000.svg?logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Welcome to the **J.A.R.V.I.S** (Synthetic Intelligent Virtual Reactive Assistant J-Core) Web OS! 

J.A.R.V.I.S is a futuristic, full-stack AI-assistant ecosystem inspired by the Stark Industries aesthetic. It features a modern **React (Vite) Admin & Analytics Dashboard**, a highly decoupled **Node.js/Express Proxy Backend**, and an integrated **Chrome Extension** that enables contextual actions directly from any webpage in your browser.

> [!NOTE]
> **Live Demo:** You can access the static frontend demo here: [jarvis-website-swart.vercel.app](https://jarvis-website-swart.vercel.app/). Please note that this is a frontend-only demo to showcase the futuristic UI/UX; a running backend is required to process requests and sync database conversations.

---

## 📸 System Interface & Gallery

Below are the screenshots showcasing the operating system's dashboards, surveillance terminals, and AI processing centers:

### 1. Main System Command Center
![Main Command Center](https://github.com/user-attachments/assets/6573028b-432a-45a4-869f-70c309954c9c)
*The central HUD displaying active connections, system status, historical operations, and quick terminal commands.*

### 2. Audio Surveillance Logs & Transcription HUD
![Audio HUD](https://github.com/user-attachments/assets/b7957575-0966-4c1b-907e-7e877fd0ea6c)
*Advanced voice processing interface showing recorded logs, audio visualizers, and transcription parsing status.*

### 3. Document Analysis & Copy-Writing Audit
![Document HUD](https://github.com/user-attachments/assets/5fab7cfe-b4d6-47e6-9e7a-78b7d84a8648)
*A professional copy-editing dashboard evaluating grammar, style, and tone using AI models.*

### 4. Interactive Command logs & History Terminal
![History HUD](https://github.com/user-attachments/assets/f17a739e-e805-43f9-abb0-8d47de199f9e)
*Visualizing all processed requests, tokens expended, and AI responses stored in MongoDB.*

### 5. Screen Vision & UI Contrast Inspection
![Screen Vision HUD](https://github.com/user-attachments/assets/e85f4060-3ded-4542-b074-1d9c9af77ce9)
*Computer Vision interface examining Contrast ratios, UI layout structure, and accessibility guidelines.*

---

## 💡 System Architecture & Data Flow

J.A.R.V.I.S uses a **Decoupled BYOK (Bring Your Own Key) Proxy Architecture**. The API keys are stored securely on the client-side (`localStorage`) and sent via custom headers (`x-gemini-key`/`x-groq-key`) to the Node.js backend. The backend acts as a secure, authenticated reverse-proxy that relays the requests to the respective AI APIs and logs history to MongoDB. This prevents the extension from holding hardcoded API keys or credentials.

### Architectural Diagram

```text
       +---------------------------------------------+
       |             Client Web Browser              |
       |                                             |
       |  +------------------+  Sync   +----------+  |
       |  |  React Frontend  |-------->|  Chrome  |  |
       |  |  (Web Dashboard) |  (JWT)  |Extension |  |
       |  +------------------+         +----------+  |
       +-----------|-------------------------|-------+
                   |                         |
                   | HTTP POST               | HTTP POST
                   | (with x-auth-token)     | (with x-auth-token + Keys)
                   ▼                         ▼
       +---------------------------------------------+
       |          Node.js / Express Backend          |
       |                                             |
       |     +---------------------------------+     |
       |     |      JWT Auth Middleware        |     |
       |     +---------------------------------+     |
       |                      |                      |
       |                      ▼                      |
       |     +---------------------------------+     |
       |     |        Proxy Controllers        |     |
       |     +---------------------------------+     |
       +-----------|-------------------------|-------+
                   |                         |
                   ▼ (Sync Logs)             ▼ (API requests)
         +-------------------+     +-------------------+
         |   MongoDB Atlas   |     | Cloud AI Engines  |
         |   (NoSQL Store)   |     | (Gemini & Groq)   |
         +-------------------+     +-------------------+
```

1. **Authentication:** The user registers/logs in on the React dashboard. The server generates a secure JWT token.
2. **Session Sync:** A context script automatically forwards the active JWT token from the React client's `localStorage` to the Chrome Extension's background service worker storage.
3. **Execution Context:** The user highlights text on any web page and selects an action (e.g. Summarize) via the Extension popup or context menu.
4. **Backend Relay:** The Extension issues a POST request to the Node.js server containing the highlighted text, action type, JWT token, and API keys.
5. **Proxy Orchestration:** The backend verifies the token, proxies the request to the cloud AI models, and parses the response.
6. **Data Retention:** The parsed prompt-response matrix is stored asynchronously in MongoDB under the User's ID.
7. **Dashboard Sync:** The dashboard fetches this history on load, updating charts and tables in real-time.

---

## 🛠️ Technology Stack

* **Frontend Dashboard:** React 18 (Vite build engine), Vanilla CSS (Custom tokens, glassmorphism), React Router DOM (protected layout routes), Recharts (graph analytics), Lucide React (vector symbols).
* **Backend Server:** Node.js, Express, Mongoose ODM, JsonWebToken, BcryptJS.
* **Database Layer:** MongoDB Atlas (asynchronous cloud persistence).
* **Browser Extension:** Manifest V3 API, Background Service Workers, DOM Content Scripts.
* **AI Foundations:** Google Generative AI (`gemini-1.5-flash` model), Groq SDK (`whisper-large-v3` for speech-to-text, and `llama-3.1-8b-instant` for text structuring).

---

## 🚀 Installation & Local Setup

Ensure you have [Node.js (v18+)](https://nodejs.org/) and a running [MongoDB](https://www.mongodb.com/) instance (local or Atlas) before starting.

### 1. Clone & Configure the Backend
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory (you can copy the example file: `cp .env.example .env`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jarvis
JWT_SECRET=supersecretjarviskey1234
```

Start the backend in development mode (runs on port 5000):
```bash
npm run dev
```

### 2. Configure the Frontend Dashboard
Navigate to the root directory and install dependencies:
```bash
npm install
```

Start the React Vite development server (runs on `http://localhost:5173`):
```bash
npm run dev
```

### 3. Mount the Chrome Extension
1. Open Google Chrome and type `chrome://extensions/` in the URL bar.
2. Toggle the **Developer mode** switch (top-right corner).
3. Click the **Load unpacked** button (top-left corner).
4. Select the `/extension` directory from the root of this project.
5. The SIVRAJ J.A.R.V.I.S Core Extension icon will now be visible in your Chrome Toolbar.

---

## 🔌 API Endpoint Reference

All endpoints are hosted relative to the backend server (default: `http://localhost:5000`).

### Authentication Endpoints

#### `POST /api/auth/register`
Creates a new user profile on the network.
* **JWT Required:** No
* **Request Body:**
  ```json
  {
    "email": "tony@stark.com",
    "password": "jarvis_override_3000"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "email": "tony@stark.com",
      "uid": "6488d55c709e3e701e149301"
    }
  }
  ```

#### `POST /api/auth/login`
Authenticates user credentials and signs a new token.
* **JWT Required:** No
* **Request Body:** Same as register.
* **Success Response (200 OK):** Same as register.

#### `GET /api/auth/me`
Retrieves details of the currently authenticated session.
* **JWT Required:** Yes (via `x-auth-token` header)
* **Success Response (200 OK):**
  ```json
  {
    "_id": "6488d55c709e3e701e149301",
    "email": "tony@stark.com",
    "createdAt": "2026-05-27T06:00:00.000Z"
  }
  ```

---

### AI Processing Endpoints

#### `POST /api/ai/process`
Relays selection strings, images, or audio transcripts to cloud AI providers.
* **JWT Required:** Yes (via `x-auth-token` header)
* **Required Headers:**
  - `x-gemini-key` (for `summarize`, `explain`, `rewrite`, `review`, and `vision` actions)
  - `x-groq-key` (for `transcribe` action)
* **Request Body Example (Text Summarization):**
  ```json
  {
    "type": "summarize",
    "text": "Stark Industries is a multinational industrial conglomerate headquartered in Los Angeles..."
  }
  ```
* **Request Body Example (Voice Transcription):**
  ```json
  {
    "type": "transcribe",
    "audio": "data:audio/webm;base64,GkXfo69..."
  }
  ```
* **Success Response (200 OK - Transcribe Action Output):**
  ```json
  {
    "success": true,
    "data": "{\"text\": \"Power up the arc reactor, Jarvis.\", \"confidence\": 98, \"keywords\": [\"arc reactor\", \"Jarvis\"]}"
  }
  ```

#### `GET /api/ai/history`
Retrieves past conversations logged by the current user.
* **JWT Required:** Yes (via `x-auth-token` header)
* **Success Response (200 OK):**
  ```json
  [
    {
      "_id": "6488f28ab830fde02a0a2024",
      "userId": "6488d55c709e3e701e149301",
      "actionType": "summarize",
      "selectedText": "Stark Industries is...",
      "aiResponse": "Summary of Stark Industries...",
      "createdAt": "2026-05-27T06:15:00.000Z"
    }
  ]
  ```

#### `DELETE /api/ai/history/:id`
Deletes a specific conversation item from the logs.
* **JWT Required:** Yes (via `x-auth-token` header)
* **Success Response (200 OK):**
  ```json
  { "msg": "Conversation removed" }
  ```

---

### Administrative Endpoints

#### `GET /api/admin/stats`
Fetches real system indicators (CPU / RAM load) and registered operative profiles.
* **JWT Required:** No (Note: Authentication check is planned for future upgrades)
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "vitals": {
        "cpuUsage": 12,
        "memUsage": 62.45
      },
      "users": [
        {
          "id": "6488d55c709e3e701e149301",
          "name": "tony",
          "email": "tony@stark.com",
          "role": "Operative",
          "status": "Active",
          "lastLogin": "Active Session"
        }
      ]
    }
  }
  ```

---

## 💼 Resume Highlights & Tech Skills

If you are featuring this project on your CV for **Junior Backend Developer, TechOps, or Application Support** roles, you can highlight the following achievements:

* **Secure Backend Proxy Model:** Implemented a secure reverse-proxy structure that encapsulates third-party AI endpoints (Gemini, Groq), shielding individual user keys from client-side runtime exposure.
* **State Syncing & Chrome Extension Engineering:** Constructed a Manifest V3 background worker that uses DOM script triggers to sync authorization JWT sessions and API credentials automatically from browser storage.
* **NoSQL Database Modeling:** Created Mongoose database schemas with object mappings, relational key referencing, and query structures to handle historical analytical telemetry.
* **Support & Diagnostics Ready:** Structured diagnostic console logging across backend request endpoints and handled connection failures or third-party timeouts gracefully, returning precise HTTP status codes (200, 400, 401, 500) rather than unhandled server crashes.
* **Decoupled Architecture:** Separated user configurations, UI views, analytics widgets, and extensions into logical modules to allow independent code packaging and deployment.

---

## 🛠️ Troubleshooting & Configuration

* **CORS Network Errors:** Ensure the backend `server.js` ports match the React frontend domain. If you run the frontend on a non-standard port, configure your server CORS initialization to allow it.
* **No API Key Warnings:** If you receive a warning to configure your key, navigate to the **System Configuration** (`Settings`) tab in the J.A.R.V.I.S Web OS dashboard and apply your Gemini or Groq key.
* **Failed to Sync Session:** If the Chrome Extension shows a warning that no login session is active, sign out of the dashboard and log in again on `http://localhost:5173`. The background content scripts will immediately sync your session.

---

## 🔮 Future Enhancements & TechOps Roadmap

* **Centralized API Security:** Mount Helmet HTTP security headers and Express Rate Limiters to protect authentication routes against brute-force login attacks.
* **Local Inference (Ollama Mode):** Integrate local LLM inference engines (like Ollama running `gemma4` or `gemma3n`) via a backend configuration switch (`AI_PROVIDER=ollama`) to allow completely offline text processing.
* **Containerization:** Write standard `Dockerfile` configurations and a `docker-compose.yml` service wrapper to automate environment spinning for MongoDB, Express APIs, and React clients.
* **Automated Unit Testing:** Build unit and integration tests using Node's native `node:test` runner to validate authentication routes and health checks under mock environments.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Created as part of the Stark-inspired J.A.R.V.I.S digital operations.
