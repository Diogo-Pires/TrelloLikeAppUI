import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/userContext";
import { User } from "../domain/user";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault(); 

    const user: User = {
        email: email,
        name: "",
        password: password
     };
     
    try {
        await login(user);
        navigate('/tasks');
    } catch (error) {
      var msg = `${error}`
      console.error(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;