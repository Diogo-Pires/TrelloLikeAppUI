import { Route, Routes, BrowserRouter as Router, useLocation, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import { useEffect } from "react";
import { startLoading, stopLoading } from "./LoadingBar";
import TaskPage from "./pages/TaskPage";
import { useSelector } from "react-redux";
import { RootState } from "./stores/store";
import AuthHandler from "./services/AuthHandlerService";

const ProtectedLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

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
          <Route element={<ProtectedLayout />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/task/:taskId" element={<TaskPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default function AppRoutes() {
  return (
    <Router>
        <AuthHandler />
        <AppContent />
        <div>
          <ToastContainer /> {}
        </div>
    </Router>
  );
}