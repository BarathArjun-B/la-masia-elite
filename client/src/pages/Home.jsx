import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import FeatureCard from "../components/FeatureCard";
import WorkoutExperience from "../components/WorkoutExperience";
import { heroBg } from "../assets";
import { featureCards, trainingModules } from "../data/trainingData";

const Home = () => (
  <>
    <section className="hero">
      <motion.div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1.03 }}
        animate={{ scale: 1.055 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <div className="hero-content">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          Elite football academy platform
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.65 }}
        >
          Train with the mentality of the world's coldest finishers.
        </motion.h1>
        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.65 }}
        >
          Build speed, control, passing range, defensive timing, and match-winning composure inside a cinematic SaaS training system.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <Link className="cta" to="/training">
            Start Training
          </Link>
        </motion.div>
      </div>

      <div className="hero-stats">
        <div>
          <strong>4</strong>
          <span>Elite position labs</span>
        </div>
        <div>
          <strong>360</strong>
          <span>Match IQ reps</span>
        </div>
        <div>
          <strong>11v11</strong>
          <span>Game-real pressure</span>
        </div>
      </div>
    </section>

    <section className="section training">
      <div className="section-kicker">Technical labs</div>
      <div className="section-heading">
        <h2>Every touch has a purpose.</h2>
        <p>Four focused modules, each built around visual rhythm, pressure, timing, and repetition.</p>
      </div>
      <div className="feature-grid">
        {featureCards.map((card, index) => (
          <FeatureCard key={card.title} index={index} {...card} />
        ))}
      </div>
    </section>

    <section className="positions">
      {Object.values(trainingModules).map((module) => (
        <div className="position-bg visible-bg" key={module.label} style={{ backgroundImage: `url(${module.image})` }} />
      ))}
      <div className="position-overlay" />
      <div className="position-shell">
        <div className="section-kicker">Position intelligence</div>
        <div className="position-copy">
          <h2>Choose your role. Feel the game change around you.</h2>
          <p>Attacker, midfielder, defender, or goalkeeper. Every role gets a premium session path and visual training identity.</p>
        </div>
        <Link className="workout-cta" to="/workout">
          Open Active Workout
        </Link>
      </div>
    </section>

    <WorkoutExperience compact />
  </>
);

export default Home;
