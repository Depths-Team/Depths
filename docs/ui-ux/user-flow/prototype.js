const canvas = document.querySelector("#prototype");
const ctx = canvas.getContext("2d");
const screenName = document.body.dataset.screen;

const COLORS = {
  background: "#f5f5f5",
  surface: "#ffffff",
  muted: "#e6e6e6",
  ink: "#111111",
  secondary: "#555555",
  interactive: "#2457a6",
};

let hitAreas = [];

function clear() {
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = COLORS.ink;
  ctx.fillStyle = COLORS.ink;
  ctx.lineWidth = 4;
  ctx.textBaseline = "middle";
}

function text(label, x, y, size = 34, align = "left", color = COLORS.ink) {
  ctx.fillStyle = color;
  ctx.font = `${size}px Arial`;
  ctx.textAlign = align;
  ctx.fillText(label, x, y);
}

function heading(title, subtitle) {
  text(title, 90, 82, 54);
  if (subtitle) text(subtitle, 90, 132, 24, "left", COLORS.secondary);
  ctx.beginPath();
  ctx.moveTo(90, 170);
  ctx.lineTo(1830, 170);
  ctx.stroke();
}

function box(x, y, width, height, label = "", fill = COLORS.surface) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = COLORS.ink;
  ctx.strokeRect(x, y, width, height);
  if (label) text(label, x + width / 2, y + height / 2, 30, "center");
}

function button(label, x, y, width, height, href, note = "") {
  ctx.fillStyle = COLORS.surface;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = COLORS.interactive;
  ctx.lineWidth = 6;
  ctx.strokeRect(x, y, width, height);
  text(label, x + width / 2, y + height / 2, 30, "center");
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 4;
  hitAreas.push({ x, y, width, height, href, label });
  if (note) text(note, x + width / 2, y + height + 25, 18, "center", COLORS.secondary);
}

function footer(current) {
  text(`DEPTHS WIREFRAME  |  ${current}`, 90, 1030, 20, "left", COLORS.secondary);
  text("Canvas: 1920 × 1080 (16:9)", 1830, 1030, 20, "right", COLORS.secondary);
}

function drawMainMenu() {
  text("DEPTHS", 960, 220, 96, "center");
  text("Main Menu", 960, 300, 36, "center", COLORS.secondary);
  button("NEW GAME", 690, 410, 540, 90, "briefing.html");
  button("CONTINUE", 690, 530, 540, 90, "base.html");
  button("SETTINGS", 690, 650, 540, 90, "settings.html");
  footer("MAIN MENU");
}

function drawBriefing() {
  heading("Mission Briefing", "Opening story and objective");
  box(100, 230, 410, 500, "NPC PORTRAIT", COLORS.muted);
  box(570, 230, 1240, 500);
  text("RESEARCH CREW", 630, 290, 30);
  text("You are the sole diver assigned to enter the Gorge.", 630, 365, 31);
  text("Collect biological materials. Return safely. Go deeper.", 630, 420, 31);
  text("Primary objective: complete the first dive.", 630, 510, 31);
  button("BACK", 100, 820, 300, 80, "index.html");
  button("SKIP", 1240, 820, 260, 80, "base.html");
  button("CONTINUE", 1530, 820, 280, 80, "base.html");
  footer("BRIEFING");
}

function drawBase() {
  heading("Surface Base", "Safe hub for progression between dives");
  box(90, 220, 800, 520, "SUBMARINE / BASE VIEW", COLORS.muted);
  box(940, 220, 880, 150);
  text("Resources", 985, 260, 26);
  text("240", 1760, 260, 36, "right");
  text("Deepest zone", 985, 325, 26);
  text("Zone 1", 1760, 325, 36, "right");
  button("UPGRADES", 1170, 410, 420, 100, "upgrades.html");
  button("CREATURE LOG", 1170, 540, 420, 100, "creature-log.html");
  button("PREPARE DIVE", 520, 800, 880, 120, "loadout.html");
  button("MAIN MENU", 90, 820, 300, 80, "index.html");
  footer("SURFACE BASE");
}

function drawUpgrades() {
  heading("Submarine Upgrades", "Spend resources to improve combat and traversal");
  text("Available resources: 240", 90, 220, 30);
  const cards = [
    ["NET", "Trap groups of enemies", "Cost: 100"],
    ["SHOCK TRAP", "Stun nearby creatures", "Cost: 140"],
    ["DRILL", "Break blocked paths", "Cost: 180"],
    ["PULSE", "Reveal weak points", "Cost: 120"],
  ];
  cards.forEach(([name, detail, cost], index) => {
    const x = 90 + index * 440;
    box(x, 285, 395, 400);
    text(name, x + 198, 345, 34, "center");
    box(x + 65, 400, 265, 110, "ICON", COLORS.muted);
    text(detail, x + 198, 560, 23, "center");
    text(cost, x + 198, 610, 23, "center");
    button("SELECT", x + 70, 710, 255, 70, "base.html", "Returns to base");
  });
  button("BACK TO BASE", 90, 860, 350, 80, "base.html");
  footer("UPGRADES");
}

function drawLoadout() {
  heading("Dive Preparation", "Choose tools and confirm the destination");
  box(90, 230, 650, 520, "SUBMARINE PREVIEW", COLORS.muted);
  box(790, 230, 470, 520);
  text("EQUIPPED TOOLS", 1025, 285, 30, "center");
  box(845, 350, 360, 90, "TORPEDO");
  box(845, 470, 360, 90, "CLAW SHOT");
  box(845, 590, 360, 90, "EMPTY SLOT");
  box(1310, 230, 510, 520);
  text("DESTINATION", 1565, 285, 30, "center");
  text("THE GORGE", 1565, 390, 42, "center");
  text("Zone 1", 1565, 460, 30, "center");
  text("Recommended power: 1", 1565, 540, 24, "center");
  button("BACK TO BASE", 90, 820, 350, 80, "base.html");
  button("BEGIN DIVE", 1310, 820, 510, 80, "dive.html");
  footer("DIVE PREPARATION");
}

function drawDive() {
  const isZoneTwo = new URLSearchParams(window.location.search).get("zone") === "2";
  const diveState = isZoneTwo
    ? {
        objective: "Locate the next depth gate  0 / 1",
        depth: "2,060 m",
        zone: "2",
        material: "34 / 40",
      }
    : {
        objective: "Extract biological material  2 / 3",
        depth: "860 m",
        zone: "1",
        material: "18 / 40",
      };

  // The entire 16:9 canvas is the gameplay view.
  ctx.fillStyle = "#d8d8d8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Simple trench walls establish the play space without creating an inset frame.
  ctx.fillStyle = "#b8b8b8";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(1920, 0);
  ctx.lineTo(1920, 120);
  ctx.lineTo(1650, 155);
  ctx.lineTo(1380, 110);
  ctx.lineTo(1090, 170);
  ctx.lineTo(820, 125);
  ctx.lineTo(520, 175);
  ctx.lineTo(260, 115);
  ctx.lineTo(0, 160);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 890);
  ctx.lineTo(240, 850);
  ctx.lineTo(520, 920);
  ctx.lineTo(790, 870);
  ctx.lineTo(1090, 935);
  ctx.lineTo(1380, 865);
  ctx.lineTo(1650, 925);
  ctx.lineTo(1920, 875);
  ctx.lineTo(1920, 1080);
  ctx.lineTo(0, 1080);
  ctx.closePath();
  ctx.fill();

  // Player submarine.
  ctx.fillStyle = COLORS.surface;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(720, 585, 230, 95, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(495, 565);
  ctx.lineTo(390, 495);
  ctx.lineTo(410, 585);
  ctx.lineTo(390, 675);
  ctx.lineTo(495, 605);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(790, 560, 36, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.muted;
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(890, 560);
  ctx.lineTo(1030, 520);
  ctx.stroke();

  // Hostile creature and its targetable weak point.
  ctx.fillStyle = COLORS.surface;
  ctx.beginPath();
  ctx.ellipse(1430, 535, 125, 155, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  [1355, 1405, 1455, 1505].forEach((x, index) => {
    ctx.beginPath();
    ctx.moveTo(x, 665);
    ctx.quadraticCurveTo(x - 35 + index * 18, 760, x - 60 + index * 35, 815);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.arc(1385, 500, 22, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.muted;
  ctx.fill();
  ctx.stroke();

  // Aiming reticle.
  ctx.beginPath();
  ctx.arc(1385, 500, 55, 0, Math.PI * 2);
  ctx.moveTo(1310, 500);
  ctx.lineTo(1340, 500);
  ctx.moveTo(1430, 500);
  ctx.lineTo(1460, 500);
  ctx.moveTo(1385, 425);
  ctx.lineTo(1385, 455);
  ctx.moveTo(1385, 545);
  ctx.lineTo(1385, 575);
  ctx.stroke();

  // Top-left: survival status.
  box(45, 40, 450, 150, "");
  text("HULL INTEGRITY", 75, 75, 24);
  text("72%", 465, 75, 24, "right");
  box(75, 105, 390, 34, "");
  ctx.fillStyle = COLORS.muted;
  ctx.fillRect(80, 110, 274, 24);
  text("REPAIR CHARGES  1", 75, 165, 22);

  // Top-center: current gameplay objective.
  box(610, 40, 700, 105, "");
  text("CURRENT OBJECTIVE", 960, 70, 21, "center", COLORS.secondary);
  text(diveState.objective, 960, 112, 28, "center");

  // Top-right: progression and collected material.
  box(1450, 40, 425, 150, "");
  text("DEPTH", 1480, 75, 22, "left", COLORS.secondary);
  text(diveState.depth, 1840, 75, 30, "right");
  text("ZONE", 1480, 120, 22, "left", COLORS.secondary);
  text(diveState.zone, 1840, 120, 30, "right");
  text("MATERIAL", 1480, 165, 22, "left", COLORS.secondary);
  text(diveState.material, 1840, 165, 30, "right");

  // Bottom-left: equipped tools and their availability. These are HUD slots, not buttons.
  box(45, 880, 360, 150, "");
  box(65, 900, 110, 110, "LMB");
  text("TORPEDO", 200, 925, 25);
  text("READY", 200, 975, 22, "left", COLORS.secondary);

  box(430, 880, 360, 150, "");
  box(450, 900, 110, 110, "RMB");
  text("CLAW SHOT", 585, 925, 25);
  text("READY", 585, 975, 22, "left", COLORS.secondary);

  // Bottom-right: context-sensitive target information.
  box(1435, 880, 440, 150, "");
  text("TARGET STATUS", 1465, 915, 21, "left", COLORS.secondary);
  text("WEAK POINT EXPOSED", 1465, 960, 28);
  text("Stun before extraction", 1465, 1000, 21, "left", COLORS.secondary);

  // Cable preview connects the claw to the selected weak point.
  ctx.beginPath();
  ctx.setLineDash([18, 14]);
  ctx.moveTo(1030, 520);
  ctx.lineTo(1385, 500);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawDeathResult() {
  heading("Dive Result", "Round summary");

  box(90, 220, 520, 540, "", COLORS.muted);
  text("PLAYER LOST", 350, 315, 46, "center");
  text("Submarine integrity reached zero", 350, 390, 25, "center");
  box(190, 485, 320, 150, "SUBMARINE STATUS");
  text("DESTROYED", 350, 690, 30, "center");

  box(670, 220, 1160, 540, "");
  text("THIS ROUND", 730, 275, 30);

  const results = [
    ["Time survived", "08:42"],
    ["Maximum depth", "1,240 m"],
    ["Enemies stunned", "8"],
    ["Specimens extracted", "3"],
    ["Materials collected", "18"],
    ["Upgrades discovered", "1"],
  ];

  results.forEach(([label, value], index) => {
    const y = 350 + index * 62;
    text(label, 740, y, 26);
    text(value, 1760, y, 26, "right");
    ctx.beginPath();
    ctx.moveTo(740, y + 28);
    ctx.lineTo(1760, y + 28);
    ctx.stroke();
  });

  button("RETURN TO BASE", 670, 835, 520, 90, "base.html");
  footer("DIVE RESULT");
}

function drawBossCleared() {
  heading("Zone Cleared", "The boss is defeated and a deeper passage is open");

  box(130, 240, 1660, 410, "");
  text("ZONE 1 BOSS DEFEATED", 960, 320, 54, "center");
  text("A route into Zone 2 is now available.", 960, 400, 32, "center");

  text("Hull integrity", 260, 515, 27);
  text("42%", 750, 515, 27, "right");
  text("Collected material", 820, 515, 27);
  text("34 / 40", 1320, 515, 27, "right");
  text("Next depth", 1390, 515, 27);
  text("2,000+ m", 1690, 515, 27, "right");

  text("Return safely with this round's progress, or continue with the current hull and cargo.", 960, 600, 25, "center", COLORS.secondary);

  button("RETURN TO BASE", 300, 780, 580, 110, "base.html");
  button("GO DEEPER", 1040, 780, 580, 110, "dive.html?zone=2");
  footer("ZONE CHOICE");
}

function drawCreatureLog() {
  heading("Creature Log", "Research notes from previous encounters");
  const creatures = ["CRAB", "SQUID", "PARASITIZED WHALE", "SERPENT"];
  creatures.forEach((name, index) => {
    const y = 230 + index * 155;
    box(90, y, 260, 120, "IMAGE", COLORS.muted);
    box(380, y, 1440, 120);
    text(name, 430, y + 40, 28);
    text(index < 2 ? "Recorded — weak point identified" : "Unknown — encounter required", 430, y + 83, 22, "left", COLORS.secondary);
  });
  button("BACK TO BASE", 90, 880, 350, 80, "base.html");
  footer("CREATURE LOG");
}

function drawSettings() {
  heading("Settings", "Basic prototype settings page");
  box(420, 250, 1080, 430);
  text("Master Volume", 500, 330, 30);
  box(940, 300, 470, 55, "SLIDER", COLORS.muted);
  text("Display Mode", 500, 440, 30);
  box(940, 410, 470, 70, "FULLSCREEN");
  text("Controls", 500, 560, 30);
  text("WASD: Move   |   Left Click: Torpedo   |   Right Click: Claw", 940, 560, 24, "center");
  button("BACK TO MENU", 710, 790, 500, 90, "index.html");
  footer("SETTINGS");
}

const renderers = {
  main: drawMainMenu,
  briefing: drawBriefing,
  base: drawBase,
  upgrades: drawUpgrades,
  loadout: drawLoadout,
  dive: drawDive,
  deathResult: drawDeathResult,
  bossCleared: drawBossCleared,
  creatureLog: drawCreatureLog,
  settings: drawSettings,
};

function render() {
  hitAreas = [];
  clear();
  const draw = renderers[screenName] || drawMainMenu;
  draw();
}

function canvasPoint(event) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
    y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
  };
}

function hitTest(point) {
  return hitAreas.find(
    (area) =>
      point.x >= area.x &&
      point.x <= area.x + area.width &&
      point.y >= area.y &&
      point.y <= area.y + area.height,
  );
}

canvas.addEventListener("mousemove", (event) => {
  canvas.style.cursor = hitTest(canvasPoint(event)) ? "pointer" : "default";
});

canvas.addEventListener("click", (event) => {
  const target = hitTest(canvasPoint(event));
  if (target) window.location.href = target.href;
});

canvas.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && hitAreas.length) window.location.href = hitAreas[0].href;
});

render();
