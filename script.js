const positionData = {
  attacker: {
    description:
      "Train explosive movement, winger combinations, striker instincts, and coordinated final-third attacks.",
    focus: "Final third",
    tempo: "Explosive",
    pressure: "High block",
  },
  midfielder: {
    description:
      "Master scanning, press resistance, body orientation, and rhythm control through Barcelona-style midfield structure.",
    focus: "Game rhythm",
    tempo: "Controlled",
    pressure: "360 scan",
  },
  defender: {
    description:
      "Develop timing, positioning, duel patience, and back-line communication with elite defensive reference points.",
    focus: "Duel craft",
    tempo: "Patient",
    pressure: "Box control",
  },
  gk: {
    description:
      "Build presence, angle command, sweeping decisions, and calm distribution from the deepest line.",
    focus: "Goal command",
    tempo: "Decisive",
    pressure: "Last line",
  },
};

const workoutPhaseData = {
  warmup: {
    meta: "12 min · touch prep",
    title: "Warmup: activate with the ball",
    description:
      "Open the hips, wake up the first touch, and build rhythm before the session gets intense.",
    video: "https://www.youtube.com/embed/Hqz5n4tq7ys",
  },
  technical: {
    meta: "18 min · control lab",
    title: "Technical: receive, scan, escape",
    description:
      "Train tight-space control, shoulder checks, passing angles, and clean exits under pressure.",
    video: "https://www.youtube.com/embed/7DewtYd0hMk",
  },
  shooting: {
    meta: "16 min · final third",
    title: "Shooting: finish with cold timing",
    description:
      "Rehearse body shape, striking rhythm, first-time finishes, and fast decisions near goal.",
    video: "https://www.youtube.com/embed/6vD5ZLZ9PzM",
  },
  fitness: {
    meta: "14 min · repeat power",
    title: "Fitness: accelerate, recover, repeat",
    description:
      "Build match-real bursts with short recovery windows, quick feet, and controlled breathing.",
    video: "https://www.youtube.com/embed/ml6cT4AZdqI",
  },
  recovery: {
    meta: "10 min · reset",
    title: "Recovery: downshift like a pro",
    description:
      "Cool the system, restore range, and leave the session fresher for the next training day.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
};

const buttons = document.querySelectorAll(".tab-button");
const backgrounds = document.querySelectorAll(".position-bg");
const description = document.querySelector("#position-description");
const metricFocus = document.querySelector("#metric-focus");
const metricTempo = document.querySelector("#metric-tempo");
const metricPressure = document.querySelector("#metric-pressure");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const position = button.dataset.position;
    const data = positionData[position];

    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    backgrounds.forEach((item) => {
      item.classList.toggle("active", item.dataset.panelBg === position);
    });

    description.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );

    description.textContent = data.description;
    metricFocus.textContent = data.focus;
    metricTempo.textContent = data.tempo;
    metricPressure.textContent = data.pressure;
  });
});

const workoutPositionButtons = document.querySelectorAll(".workout-position-button");
const workoutBackgrounds = document.querySelectorAll(".workout-bg");

workoutPositionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const position = button.dataset.workoutPosition;

    workoutPositionButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    workoutBackgrounds.forEach((item) => {
      item.classList.toggle("active", item.dataset.workoutBg === position);
    });
  });
});

const phaseButtons = document.querySelectorAll(".phase-tab");
const phaseContent = document.querySelector("#phase-content");
const phaseMeta = document.querySelector("#phase-meta");
const phaseTitle = document.querySelector("#phase-title");
const phaseDescription = document.querySelector("#phase-description");
const workoutVideo = document.querySelector("#workout-video");

phaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const phase = button.dataset.phase;
    const data = workoutPhaseData[phase];

    phaseButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    phaseContent.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 430, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );

    phaseMeta.textContent = data.meta;
    phaseTitle.textContent = data.title;
    phaseDescription.textContent = data.description;
    workoutVideo.src = data.video;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const heroBg = document.querySelector(".hero-bg");

window.addEventListener(
  "scroll",
  () => {
    const shift = Math.min(window.scrollY * 0.05, 34);
    heroBg.style.setProperty("--hero-shift", `${shift}px`);
  },
  { passive: true },
);
