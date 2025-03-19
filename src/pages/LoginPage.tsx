import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { extractTokenInformation } from "../shared/ExtractTokenInformation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../stores/authSlice";
import { User } from "../domain/User";
import { RootState } from "../stores/store";

function LoginPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLoginSuccess = async (token: string | undefined) => {
    if(token === undefined)
      return;

    try {
      var userInfo = extractTokenInformation(token); 
      dispatch(login({user: userInfo as User, token}));
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
        {!user ? (
          <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LoginPage;