import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/authSlice";
import { RootState } from "../stores/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => { 
    dispatch(logout());
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