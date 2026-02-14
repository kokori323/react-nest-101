import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          EVENT<span>REG</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="navbar-link">ลงทะเบียน</Link>
          {isLoggedIn && user?.role === 'admin' && (
            <Link to="/admin" className="navbar-link">Admin Dashboard</Link>
          )}
        </div>

        <div className="navbar-actions">
          {!isLoggedIn ? (
            <button onClick={() => nav("/login")} className="premium-button">
              Sign In
            </button>
          ) : (
            <div className="user-profile">
              <div className="user-info">
                <span className="username">{user?.username}</span>
                <span className="role">{user?.role}</span>
              </div>
              <button
                onClick={() => { logout(); nav("/login"); }}
                className="logout-button"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
