import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/login';
import { useAuth, UserProvider, useUserContext } from './contexts/userContext';
import { TaskProvider } from "./contexts/taskContext";
import { JSX } from "react";
import { ToastContainer } from "react-toastify";
import Tasks from "./pages/tasks";
import Navbar from "./components/navbar";

function PrivateRoute({ element }: { element: JSX.Element }) {
    const { user } = useAuth();
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return element;
  }

function AppContent() {
  const { user, logout } = useUserContext();

  const isNotProtected = location.pathname === "/";

  return (
    <>
      {user && <Navbar user={user} logout={logout} />}
      {!isNotProtected ? (
        <div className="main-content">
          <Routes>
            <Route path="/tasks" element={<PrivateRoute element={<TaskProvider><Tasks /></TaskProvider>}/> }/>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default function AppRoutes() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
      <div>
         <ToastContainer /> {}
      </div>
    </Router>
  );
}