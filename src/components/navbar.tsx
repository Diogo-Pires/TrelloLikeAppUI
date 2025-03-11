import { SessionManagementService } from "../services/SessionManagementService";

const Navbar = () => {
  const user = SessionManagementService.getAuhenticateUser();
  const handleLogout = () => {
    SessionManagementService.logout(); 
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
