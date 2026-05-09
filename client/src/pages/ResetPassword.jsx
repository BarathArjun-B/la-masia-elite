import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthShell from "../components/AuthShell";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, actionLoading, error, notice, clearMessages } = useAuth();
  const token = params.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await resetPassword({ token, password });
    navigate("/login");
  };

  return (
    <AuthShell
      eyebrow="Secure reset"
      title="Set a new password."
      copy="Choose a strong password to get back into your training dashboard."
      alternateText="Back to"
      alternateLink="/login"
      alternateLabel="Login"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Message>{!token ? "Reset token missing. Use the link from your email." : error}</Message>
        <Message type="success">{notice}</Message>
        <label>
          New password
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => {
              clearMessages();
              setPassword(event.target.value);
            }}
            required
          />
        </label>
        <button className="cta full" type="submit" disabled={actionLoading || !token}>
          {actionLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthShell>
  );
};

export default ResetPassword;
