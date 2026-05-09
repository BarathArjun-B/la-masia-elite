import {
  attackerBg,
  ballControlBg,
  defenderBg,
  dribblingBg,
  finishingBg,
  goalkeeperBg,
  midfielderBg,
  passingBg,
} from "../assets";

export const featureCards = [
  {
    title: "Ball Control",
    image: ballControlBg,
    copy: "First touch, soft receiving angles, aerial control, and calm touches under closing pressure.",
  },
  {
    title: "Passing",
    image: passingBg,
    copy: "Scan early, disguise intent, break lines, and keep tempo when the match starts moving fast.",
  },
  {
    title: "Dribbling",
    image: dribblingBg,
    copy: "Manipulate defenders, change pace, protect the ball, and attack the gap at the right moment.",
  },
  {
    title: "Shooting",
    image: finishingBg,
    copy: "Finishing mechanics, composure, angle selection, and ruthless decisions in the final third.",
  },
];

export const trainingModules = {
  attacker: {
    label: "Attacker",
    image: attackerBg,
    focus: "Final third",
    tempo: "Explosive",
    pressure: "High block",
    description: "Train explosive movement, winger combinations, striker instincts, and coordinated final-third attacks.",
  },
  midfielder: {
    label: "Midfielder",
    image: midfielderBg,
    focus: "Game rhythm",
    tempo: "Controlled",
    pressure: "360 scan",
    description: "Master scanning, press resistance, body orientation, and Barcelona-style midfield structure.",
  },
  defender: {
    label: "Defender",
    image: defenderBg,
    focus: "Duel craft",
    tempo: "Patient",
    pressure: "Box control",
    description: "Develop timing, positioning, duel patience, and back-line communication.",
  },
  goalkeeper: {
    label: "Goalkeeper",
    image: goalkeeperBg,
    focus: "Goal command",
    tempo: "Decisive",
    pressure: "Last line",
    description: "Build presence, angle command, sweeping decisions, and calm distribution from the deepest line.",
  },
};

export const phases = {
  warmup: {
    label: "Warmup",
    meta: "12 min · touch prep",
    title: "Warmup: activate with the ball",
    description: "Open the hips, wake up the first touch, and build rhythm before the session gets intense.",
    video: "https://www.youtube.com/embed/Hqz5n4tq7ys",
  },
  technical: {
    label: "Technical",
    meta: "18 min · control lab",
    title: "Technical: receive, scan, escape",
    description: "Train tight-space control, shoulder checks, passing angles, and clean exits under pressure.",
    video: "https://www.youtube.com/embed/7DewtYd0hMk",
  },
  shooting: {
    label: "Shooting",
    meta: "16 min · final third",
    title: "Shooting: finish with cold timing",
    description: "Rehearse body shape, striking rhythm, first-time finishes, and fast decisions near goal.",
    video: "https://www.youtube.com/embed/6vD5ZLZ9PzM",
  },
  fitness: {
    label: "Fitness",
    meta: "14 min · repeat power",
    title: "Fitness: accelerate, recover, repeat",
    description: "Build match-real bursts with short recovery windows, quick feet, and controlled breathing.",
    video: "https://www.youtube.com/embed/ml6cT4AZdqI",
  },
  recovery: {
    label: "Recovery",
    meta: "10 min · reset",
    title: "Recovery: downshift like a pro",
    description: "Cool the system, restore range, and leave the session fresher for the next training day.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
};
