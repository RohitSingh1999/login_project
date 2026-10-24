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

        <h1 className="text-blue-600 font-bold text-xl">Login</h1>

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

          <button type="submit" disabled={loading} className="mb-3">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {message && (
          <p className="error">
            {message}
          </p>
        )}

        <p>
         <span> Don't have an account?</span>
          <Link to="/signup" className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;