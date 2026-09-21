import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        navigate("/dashboard");
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      setMessage("Server से connection नहीं हो पाया");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {message && (
          <p className="error">
            {message}
          </p>
        )}

        <p>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;