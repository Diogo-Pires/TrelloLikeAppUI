import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { SessionManagementService } from "./services/SessionManagementService";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return SessionManagementService.isAuthenticated() ? children : <Navigate to="/login" />;
};

function AppContent() {  
  return (
    <>
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <Navbar/>
              <TaskProvider>
                <TasksPage />
              </TaskProvider>
            </ProtectedRoute>
            }/>
        </Routes>
      </div>
    </>
  );
};

export default function AppRoutes() {
  return (
    <Router>
        <AppContent />
        <div>
          <ToastContainer /> {}
        </div>
    </Router>
  );
}