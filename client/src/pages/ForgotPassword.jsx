import { useState } from "react";

import AuthShell from "../components/AuthShell";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, actionLoading, error, notice, clearMessages } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await forgotPassword(email);
  };

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your academy password."
      copy="Enter your email and we will send a secure reset link if an account exists."
      alternateText="Remembered it?"
      alternateLink="/login"
      alternateLabel="Login"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Message>{error}</Message>
        <Message type="success">{notice}</Message>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => {
              clearMessages();
              setEmail(event.target.value);
            }}
            required
          />
        </label>
        <button className="cta full" type="submit" disabled={actionLoading}>
          {actionLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </AuthShell>
  );
};

export default ForgotPassword;
