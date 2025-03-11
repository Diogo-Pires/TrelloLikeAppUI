import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { SessionManagementService } from "../services/SessionManagementService";

function LoginPage() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleLoginSuccess = async (token: string | undefined) => {
    if(token === undefined)
      return;
  
    setToken(token); 

    try {
      SessionManagementService.saveToken(token); 
      navigate('/tasks');
    } catch (error) {
      var msg = `${error}`
      console.error(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="login-container">
      {!token ? (
        <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default LoginPage;