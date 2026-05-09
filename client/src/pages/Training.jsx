import FeatureCard from "../components/FeatureCard";
import { featureCards, trainingModules } from "../data/trainingData";

const Training = () => (
  <main className="page-shell">
    <section className="section hero-lite">
      <div className="section-kicker">Training modules</div>
      <div className="section-heading">
        <h1>Build the player profile your role demands.</h1>
        <p>Technical labs, position intelligence, and phase-based workouts built for repeatable development.</p>
      </div>
    </section>

    <section className="section flush-top">
      <div className="feature-grid">
        {featureCards.map((card, index) => (
          <FeatureCard key={card.title} index={index} {...card} />
        ))}
      </div>
    </section>

    <section className="module-grid section flush-top">
      {Object.entries(trainingModules).map(([key, module]) => (
        <article className="module-card" key={key} style={{ backgroundImage: `url(${module.image})` }}>
          <div>
            <span>{module.focus}</span>
            <h2>{module.label}</h2>
            <p>{module.description}</p>
          </div>
        </article>
      ))}
    </section>
  </main>
);

export default Training;
