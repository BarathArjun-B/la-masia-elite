import { motion } from "framer-motion";

const FeatureCard = ({ index, title, copy, image }) => (
  <motion.article
    className="feature-card"
    style={{ "--image": `url(${image})` }}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="card-sheen" />
    <div className="feature-content">
      <span className="tag">{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  </motion.article>
);

export default FeatureCard;
