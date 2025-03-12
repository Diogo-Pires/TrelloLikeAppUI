import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import { UserProvider } from "./contexts/UserContext";
import { useEffect } from "react";
import { startLoading, stopLoading } from "./LoadingBar";

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    startLoading();
    stopLoading(); 

    return () => { stopLoading(); }
  }, [location]);

  return null;
};

const AppContent = () => {  
  return (
    <>
      <div className="main-content">
        <RouteChangeTracker />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={
            <UserProvider>
              <Navbar/>
              <TaskProvider>
                <TasksPage />
              </TaskProvider>
            </UserProvider>
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