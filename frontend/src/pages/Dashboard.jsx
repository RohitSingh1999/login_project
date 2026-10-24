import { useNavigate } from "react-router-dom";
import myimage from "../assets/pic.jpeg";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="dashboard">

      <h1 className="text-blue-600 font-bold text-xl">Welcome! <spam className="text-red-500">Shewta </spam></h1>
      <img src={myimage} alt="My Image" width="200" height="200" />
      <h2 className="text-green-500 font-bold text-4xl font-weight: 700; shadow-sm">I LOVE YOU </h2>

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