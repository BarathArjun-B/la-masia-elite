import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import { phases, trainingModules } from "../data/trainingData";

const moduleKeys = Object.keys(trainingModules);
const phaseKeys = Object.keys(phases);

const WorkoutExperience = ({ compact = false }) => {
  const [moduleKey, setModuleKey] = useState("attacker");
  const [phaseKey, setPhaseKey] = useState("warmup");
  const module = trainingModules[moduleKey];
  const phase = phases[phaseKey];

  return (
    <section className={`active-workout ${compact ? "compact" : ""}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={moduleKey}
          className="workout-bg"
          style={{ backgroundImage: `url(${module.image})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="workout-backdrop" />

      <motion.div
        className="workout-shell"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="workout-header">
          <div>
            <div className="section-kicker">Active workout</div>
            <h2>Step into a match-speed training room.</h2>
          </div>
          <p>{module.description}</p>
        </div>

        <div className="workout-position-tabs">
          {moduleKeys.map((key) => (
            <button
              className={`workout-position-button ${moduleKey === key ? "active" : ""}`}
              key={key}
              type="button"
              onClick={() => setModuleKey(key)}
            >
              {trainingModules[key].label}
            </button>
          ))}
        </div>

        <div className="workout-grid">
          <motion.article className="video-card" whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
            <div className="video-frame">
              <iframe
                src={phase.video}
                title={`${module.label} ${phase.label} football workout`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.article>

          <aside className="phase-panel">
            <div className="phase-tabs">
              {phaseKeys.map((key) => (
                <button
                  className={`phase-tab ${phaseKey === key ? "active" : ""}`}
                  key={key}
                  type="button"
                  onClick={() => setPhaseKey(key)}
                >
                  {phases[key].label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="phase-content"
                key={`${moduleKey}-${phaseKey}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{phase.meta}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
                <div className="position-metrics mini">
                  <div>
                    <span>Focus</span>
                    <strong>{module.focus}</strong>
                  </div>
                  <div>
                    <span>Tempo</span>
                    <strong>{module.tempo}</strong>
                  </div>
                  <div>
                    <span>Pressure</span>
                    <strong>{module.pressure}</strong>
                  </div>
                </div>
                <Link className="workout-cta" to="/dashboard">
                  Continue Session
                </Link>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkoutExperience;
