import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="dashboard">

      <h1>Welcome!</h1>

      {user && (
        <p>
          Logged in as: <strong>{user.email}</strong>
        </p>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;