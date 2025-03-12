import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useUserContext();

  const handleLogout = () => {
    setUser(null);
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