import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "123");
    navigate("/dashboard");
  };

  return (
    <div className="app-container">
  <div className="card">
    <h2>Login Page</h2>
    <button onClick={handleLogin}>Login</button>
  </div>
</div>
  );
}

export default Login;