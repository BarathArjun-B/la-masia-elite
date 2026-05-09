import { LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/training", label: "Training" },
    { to: "/workout", label: "Workout" },
    ...(isAuthenticated ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">LM</span>
        <span>La Masia Elite</span>
      </Link>

      <button className="nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
            {link.label}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <button className="nav-user" type="button" onClick={handleLogout}>
            <ShieldCheck size={17} />
            <span>{user?.username || "Player"}</span>
            <LogOut size={16} />
          </button>
        ) : (
          <Link className="nav-cta" to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
