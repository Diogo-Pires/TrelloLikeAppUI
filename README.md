# 📝 My Trello-like App (React + Vite)

This is a **ongoing** simple **Trello-like task management UI** built with **React + TypeScript + Vite**. It connects to a custom .NET 8 API for managing tasks, including login functionality and multiple boards.

---

## 🚀 Tech Stack

- ⚛️ React (with Vite)
- 💬 TypeScript
- 📦 Axios
- 🗂️ React Router DOM (v6+)
- 📦 React Query
- 🎨 CSS (custom)
- 🧠 Context API for global state
- ✅ .NET 8 API backend (self-hosted, not included here)

---

## 🖥️ Features

- 🔐 Login screen (with Google)
- 🧠 Global state using React Redux
- 📡 API integration with Axios
- 📁 Boards and task lists UI
- 🔄 Data fetching and caching with React Query
- 📱 Responsive design

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/my-trello-client.git
cd my-trello-client

# Install dependencies
npm install
```

## ▶️ Running the Project
```bash
# Start the Vite dev server
npm run dev
```
The app will be running at http://localhost:5173

⚠️ Make sure your .NET API is running and has CORS enabled for http://localhost:5173.

## 🔧 Project Structure
```bash
src/
│
├── components/          # Reusable UI components
├── contexts/            # Context Providers (e.g., UserContext)
├── pages/               # Login, Dashboard, etc.
├── routes/              # Route definitions
├── services/            # API services using Axios
├── styles.css           # Global styles
├── App.tsx              # Main App component
└── main.tsx             # App entry point
```

## 🔐 Example Credentials
For testing, you can use(NOT ready yet):
```bash
Email: test@example.com
Password: password
```
(Mocked in the frontend, adjust according to your real API)

## ✅ TODOs
 - Drag & drop tasks
 - Board creation
 - Mobile responsive tweaks

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
