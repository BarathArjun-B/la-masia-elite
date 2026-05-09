import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthShell from "../components/AuthShell";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, actionLoading, error, notice, clearMessages, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    clearMessages();
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(form);
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Secure academy access"
      title="Welcome back to the training room."
      copy="Login to continue your position work, active workouts, and player dashboard."
      alternateText="New to La Masia Elite?"
      alternateLink="/register"
      alternateLabel="Create account"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Message>{error}</Message>
        <Message type="success">{notice}</Message>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="cta full" type="submit" disabled={actionLoading}>
          {actionLoading ? "Entering..." : "Login"}
        </button>
      </form>
      <a className="subtle-link" href="/forgot-password">
        Forgot password?
      </a>
    </AuthShell>
  );
};

export default Login;
