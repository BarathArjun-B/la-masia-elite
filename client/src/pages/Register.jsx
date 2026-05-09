import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthShell from "../components/AuthShell";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { register, actionLoading, error, notice, clearMessages, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    await register(form);
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Join the academy"
      title="Create your elite football profile."
      copy="Start a secure player account for training modules, sessions, and dashboard access."
      alternateText="Already registered?"
      alternateLink="/login"
      alternateLabel="Login"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Message>{error}</Message>
        <Message type="success">{notice}</Message>
        <label>
          Username
          <input name="username" autoComplete="name" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="cta full" type="submit" disabled={actionLoading}>
          {actionLoading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;
