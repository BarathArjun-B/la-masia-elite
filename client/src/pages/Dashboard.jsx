import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="page-shell dashboard">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Player dashboard</p>
          <h1>Welcome, {user?.username || "player"}.</h1>
          <p>Your elite session hub is ready. Continue your workout, refine a role, or reset the rhythm for the next block.</p>
          <Link className="cta" to="/workout">
            Continue Training
          </Link>
        </div>
      </section>

      <section className="dashboard-grid">
        {[
          ["Session streak", "07", "days active"],
          ["Current focus", "Final third", "attacking timing"],
          ["Account", user?.isVerified ? "Verified" : "Pending", "email status"],
        ].map(([label, value, copy]) => (
          <article className="dashboard-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
