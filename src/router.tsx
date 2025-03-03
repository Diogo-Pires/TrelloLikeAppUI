import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login';
import TaskList from "./components/task/taskList";
import { useAuth, UserProvider } from './contexts/userContext';
import { TaskProvider } from "./contexts/taskContext";
import { JSX } from "react";

function PrivateRoute({ element }: { element: JSX.Element }) {
    const { user } = useAuth();
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return element;
  }
  
export default function AppRoutes() {
    return (
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute
                  element={
                    <TaskProvider>
                      <TaskList />
                    </TaskProvider>
                  }
                />
              }
            />
          </Routes>
        </UserProvider>
      </Router>
    );
  };