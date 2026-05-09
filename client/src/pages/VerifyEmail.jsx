import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import AuthShell from "../components/AuthShell";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";

const VerifyEmail = () => {
  const { token } = useParams();
  const { verifyEmail, actionLoading, error, notice } = useAuth();

  useEffect(() => {
    if (token) {
      verifyEmail(token).catch(() => {});
    }
  }, [token, verifyEmail]);

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Confirming your academy account."
      copy="We are checking your secure verification link."
      alternateText="Ready to train?"
      alternateLink="/login"
      alternateLabel="Login"
    >
      <Message>{error}</Message>
      <Message type="success">{notice || (actionLoading ? "Verifying..." : "")}</Message>
      <Link className="cta full" to="/dashboard">
        Go to Dashboard
      </Link>
    </AuthShell>
  );
};

export default VerifyEmail;
