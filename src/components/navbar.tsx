import { useNavigate } from "react-router-dom";

interface NavbarProps {
    user: { name: string };
    logout: () => void;
}

const Navbar = ({ user, logout }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Task Manager</div>
      {user && (
        <div className="navbar-user">
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
