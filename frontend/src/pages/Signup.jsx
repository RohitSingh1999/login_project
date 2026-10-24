import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../api";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const result = await signupUser(email, password);

      setMessage(result.message);

      if (result.message === "Signup successful") {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setMessage("Server से connection नहीं हो पाया");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1 className="text-blue-600 font-bold text-xl">Create Account</h1>

        <form onSubmit={handleSignup}>

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

          <button type="submit" className="mb-3">
          
  <span>SignUp</span>
          </button>

        </form>

        {message && <p>{message}</p>}

        <p>
          Already have an account?
          <Link to="/login" className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;