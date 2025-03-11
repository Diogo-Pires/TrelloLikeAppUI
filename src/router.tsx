import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/Login';
import { TaskProvider } from "./contexts/TaskContext";
import { JSX } from "react";
import { ToastContainer } from "react-toastify";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";

function PrivateRoute({ element }: { element: JSX.Element }) {
  const token = sessionStorage.getItem("token")
  
    if (token === undefined) {
      return <Navigate to="/" />;
    }
  
    return element;
  }

function AppContent() {  
  const token = sessionStorage.getItem("token");
//&& <Navbar user={"user"} logout={logout} />
  return (
    <>
      {token !== undefined ? (
        <div className="main-content">
          <Routes><Route path="/" element={<Login />} />
            <Route path="/tasks" element={<TaskProvider><Tasks /></TaskProvider>}/>
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
        <AppContent />
      <div>
         <ToastContainer /> {}
      </div>
    </Router>
  );
}