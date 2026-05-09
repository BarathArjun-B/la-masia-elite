import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { heroBg } from "../assets";

const AuthShell = ({ eyebrow, title, copy, children, alternateText, alternateLink, alternateLabel }) => (
  <main className="auth-page">
    <div className="auth-bg" style={{ backgroundImage: `url(${heroBg})` }} />
    <div className="auth-overlay" />

    <motion.section
      className="auth-card"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="auth-copy">{copy}</p>
      {children}
      <p className="auth-alt">
        {alternateText} <Link to={alternateLink}>{alternateLabel}</Link>
      </p>
    </motion.section>
  </main>
);

export default AuthShell;
