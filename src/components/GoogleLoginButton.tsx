import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "839099569847-sion151vvag51k2gf903gmo4ru2l6r8r.apps.googleusercontent.com";

const GoogleLoginButton = ({ onLoginSuccess }: { onLoginSuccess: (token: string | undefined) => void }) => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const token = credentialResponse.credential; 
            onLoginSuccess(token);
          }}
          onError={() => {
            console.error("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    );
  };

export default GoogleLoginButton;