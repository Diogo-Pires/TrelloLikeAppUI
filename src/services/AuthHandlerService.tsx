import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../stores/store";

const AuthHandler = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/tasks");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null; 
};

export default AuthHandler;
