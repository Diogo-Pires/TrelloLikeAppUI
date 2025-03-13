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
      <h2>Welcome to Task Manager</h2>
      <h4>Please login yourself below</h4>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15px'
      }}>
        {!token ? (
          <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LoginPage;