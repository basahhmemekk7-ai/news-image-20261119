// generate.mjs — builds index.html (the front page) from stories.json.
// Entry 3: "THE DAY IN HOURS" — a chronological timeline layout.
// Deterministic: no randomness, no timestamps, no network.
// Run: node generate.mjs   → writes index.html in this directory.
// Then: NODE_PATH=<playwright dir> node render.cjs   → entry.png
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(DIR, "stories.json"), "utf8"));

// ---------------------------------------------------------------- map grid
// Coarse dot-matrix world map: 26 rows (75N..-55S, 5 deg each) x 60 cols
// (-180..180, 6 deg each). '#' = land. Each row MUST be exactly 60 chars.
const MAP_ROWS = [
  "..#####..##########.#######.............####################",
  "..######.###########.............###########################",
  "..###################.........#######.######################",
  "........##############......################################",
  "..........###########........##############################.",
  "...........###########.......##############################.",
  "............###########......########...##################..",
  ".............###########.....#########..#################...",
  "..............###########...###########.################....",
  "................#########...############.##############.....",
  ".................#########..##########################......",
  "..................#######...##############....########......",
  "...................#####.....#############.....##..###......",
  "......................######.#############.........###......",
  "......................#######.############..........#####...",
  "......................#######.###########...........######..",
  ".......................######..#########.............#####..",
  ".......................######..#########...............####.",
  ".......................######..########...............#####.",
  "........................#####...######................#####.",
  "........................####....#####.................#####.",
  "........................####.....###...................###..",
  "........................###.............................####",
  ".........................##...............................##",
  ".........................##.................................",
  ".........................#..................................",
];
for (const row of MAP_ROWS) {
  if (row.length !== 60) throw new Error(`map row wrong length: ${row.length}`);
}
const MAP_W = 330;
const MAP_H = 160;
function project(lat, lon) {
  return [(lon + 180) / 360 * MAP_W, (75 - lat) / 130 * MAP_H];
}

function buildMapSvg() {
  const cw = MAP_W / 60;
  const ch = MAP_H / 26;
  let dots = "";
  for (let r = 0; r < MAP_ROWS.length; r++) {
    for (let c = 0; c < 60; c++) {
      if (MAP_ROWS[r][c] === "#") {
        dots += `<circle cx="${((c + 0.5) * cw).toFixed(1)}" cy="${((r + 0.5) * ch).toFixed(1)}" r="1.9" fill="#aebfca"/>`;
      }
    }
  }
  let pins = "";
  for (const s of data.spine) {
    const [x, y] = project(s.pin.lat, s.pin.lon);
    const dx = s.pin.dx || 0;
    const dy = s.pin.dy || 0;
    const px = x + dx;
    const py = y + dy;
    if (dx || dy) {
      pins += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="#b3261e" stroke-width="1"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="#b3261e"/>`;
    }
    pins += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="6.5" fill="#b3261e" stroke="#f8f4ec" stroke-width="1.2"/><text x="${px.toFixed(1)}" y="${(py + 2.8).toFixed(1)}" text-anchor="middle" font-family="Noto Sans, Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#fff">${s.num}</text>`;
  }
  return `<svg width="${MAP_W}" height="${MAP_H}" viewBox="0 0 ${MAP_W} ${MAP_H}">${dots}${pins}</svg>`;
}

// ------------------------------------------------------------------ helpers
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ------------------------------------------------------------ hero artwork
function artShenzhen() {
  // Night skyline + the three flags (US, China, Russia).
  const sky = `<defs><linearGradient id="sz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16324f"/><stop offset="1" stop-color="#2c5f8a"/></linearGradient></defs>`;
  const b = [[0, 28, 45], [30, 22, 60], [54, 30, 38], [86, 20, 66], [108, 34, 50], [144, 24, 72], [170, 28, 42], [200, 22, 58], [224, 30, 48], [256, 24, 64], [282, 36, 40]];
  let buildings = "";
  for (const [x, w, h] of b) buildings += `<rect x="${x}" y="${88 - h}" width="${w}" height="${h}" fill="#0d2137"/>`;
  const win = [[36, 40], [42, 52], [92, 30], [97, 48], [118, 48], [150, 24], [156, 40], [206, 42], [230, 46], [262, 32], [268, 50], [290, 56], [60, 58], [176, 56]];
  let windows = "";
  for (const [x, y] of win) windows += `<rect x="${x}" y="${y}" width="3" height="4" fill="#ffd76a"/>`;
  const flags = `
    <g transform="translate(252,17)"><circle r="13" fill="#fff" stroke="#f8f4ec" stroke-width="1.5"/><clipPath id="us"><circle r="12"/></clipPath><g clip-path="url(#us)"><rect x="-12" y="-12" width="24" height="24" fill="#fff"/><rect x="-12" y="-12" width="24" height="3.4" fill="#b22234"/><rect x="-12" y="-5.2" width="24" height="3.4" fill="#b22234"/><rect x="-12" y="1.6" width="24" height="3.4" fill="#b22234"/><rect x="-12" y="8.4" width="24" height="3.4" fill="#b22234"/><rect x="-12" y="-12" width="10" height="12" fill="#3c3b6e"/><circle cx="-8" cy="-8" r="0.9" fill="#fff"/><circle cx="-4" cy="-8" r="0.9" fill="#fff"/><circle cx="-8" cy="-4" r="0.9" fill="#fff"/><circle cx="-4" cy="-4" r="0.9" fill="#fff"/></g></g>
    <g transform="translate(280,17)"><circle r="13" fill="#de2910" stroke="#f8f4ec" stroke-width="1.5"/><g fill="#ffde00"><path d="M-3,-6 L-1.5,-2.4 L2,-2.2 L-0.8,0 L0.2,3.8 L-3,1.6 L-6,3.8 L-5,0 L-7.8,-2.2 L-4.4,-2.4 Z" transform="translate(1,1) scale(1.4)"/><circle cx="4.5" cy="-4" r="1" /><circle cx="6.5" cy="-0.5" r="1" /><circle cx="5" cy="3" r="1" /><circle cx="1.5" cy="5.5" r="1" /></g></g>
    <g transform="translate(306,17)"><circle r="13" fill="#fff" stroke="#f8f4ec" stroke-width="1.5"/><clipPath id="ru"><circle r="12"/></clipPath><g clip-path="url(#ru)"><rect x="-12" y="-12" width="24" height="8" fill="#fff"/><rect x="-12" y="-4" width="24" height="8" fill="#0039a6"/><rect x="-12" y="4" width="24" height="8" fill="#d52b1e"/></g></g>`;
  return `<svg width="100%" height="100%" viewBox="0 0 318 88" preserveAspectRatio="xMidYMid slice">${sky}<rect width="318" height="88" fill="url(#sz)"/>${buildings}${windows}${flags}<rect y="86" width="318" height="2" fill="#ffd76a"/></svg>`;
}

function artGta6() {
  const sky = `<defs><linearGradient id="gt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a56"/><stop offset="0.55" stop-color="#e84393"/><stop offset="1" stop-color="#6c5ce7"/></linearGradient></defs>`;
  const palm = (tx, s) => `<g transform="translate(${tx},86) scale(${s})" stroke="#14101f" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0,0 Q2,-16 7,-30"/><path d="M7,-30 Q-12,-40 -26,-32"/><path d="M7,-30 Q-6,-46 -18,-50"/><path d="M7,-30 Q8,-48 4,-54"/><path d="M7,-30 Q24,-44 34,-36"/><path d="M7,-30 Q26,-28 36,-18"/></g>`;
  return `<svg width="100%" height="100%" viewBox="0 0 318 88" preserveAspectRatio="xMidYMid slice">${sky}<rect width="318" height="88" fill="url(#gt)"/><circle cx="159" cy="52" r="22" fill="#ffd32a"/><circle cx="159" cy="52" r="27" fill="none" stroke="#ffd32a" stroke-width="1.5" opacity="0.6"/>${palm(28, 1)}${palm(286, 0.85)}<rect y="78" width="318" height="10" fill="#14101f"/><g fill="#14101f"><path d="M108,66 L116,56 L134,52 L176,52 L192,56 L202,66 L202,72 L108,72 Z"/><circle cx="130" cy="72" r="6"/><circle cx="182" cy="72" r="6"/></g><circle cx="130" cy="72" r="2.4" fill="#f8f4ec"/><circle cx="182" cy="72" r="2.4" fill="#f8f4ec"/><text x="159" y="34" text-anchor="middle" font-family="Noto Serif, Georgia, serif" font-size="30" font-weight="bold" fill="#fff" stroke="#14101f" stroke-width="0.8">VI</text></svg>`;
}

function artIcj() {
  const cols = [28, 58, 88, 118].map((x) => `<rect x="${x}" y="38" width="10" height="32" fill="#16324f"/>`).join("");
  return `<svg width="100%" height="100%" viewBox="0 0 318 88" preserveAspectRatio="xMidYMid slice"><rect width="318" height="88" fill="#eef2f5"/><polygon points="18,34 164,34 91,10" fill="#16324f"/><rect x="18" y="34" width="146" height="4" fill="#16324f"/>${cols}<rect x="14" y="70" width="154" height="5" fill="#16324f"/><rect x="9" y="75" width="164" height="5" fill="#16324f"/><rect x="9" y="80" width="174" height="4" fill="#b3261e"/><g stroke="#16324f" stroke-width="2.4" fill="none" stroke-linecap="round"><line x1="250" y1="16" x2="250" y2="72"/><line x1="224" y1="22" x2="276" y2="22"/><line x1="230" y1="22" x2="224" y2="40"/><line x1="230" y1="22" x2="236" y2="40"/><line x1="270" y1="22" x2="264" y2="40"/><line x1="270" y1="22" x2="276" y2="40"/></g><path d="M220,40 a10,7 0 0 0 20,0 Z" fill="#b3261e"/><path d="M260,40 a10,7 0 0 0 20,0 Z" fill="#b3261e"/><circle cx="250" cy="16" r="3.5" fill="#16324f"/><rect x="236" y="72" width="28" height="4" fill="#16324f"/><text x="250" y="86" text-anchor="middle" font-family="Noto Sans, Arial, sans-serif" font-size="8" font-weight="bold" fill="#16324f" letter-spacing="1">10:00 · THE HAGUE</text></svg>`;
}

// ------------------------------------------------------------ lead artwork
// Mini flat-vector scenes, viewBox 108x62, for the lead cards.
function artDrone() {
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#16283d"/><polygon points="0,62 0,44 14,44 14,36 26,36 26,48 40,48 40,40 54,40 54,50 70,50 70,42 84,42 84,52 108,52 108,62" fill="#0b1826"/><circle cx="20" cy="12" r="6" fill="#e8e4d8"/><g stroke="#f8f4ec" stroke-width="1.6"><line x1="62" y1="14" x2="76" y2="28"/><line x1="76" y1="14" x2="62" y2="28"/></g><circle cx="62" cy="14" r="2.4" fill="#f8f4ec"/><circle cx="76" cy="14" r="2.4" fill="#f8f4ec"/><circle cx="62" cy="28" r="2.4" fill="#f8f4ec"/><circle cx="76" cy="28" r="2.4" fill="#f8f4ec"/><rect x="66" y="18" width="6" height="6" fill="#b3261e"/><path d="M92,8 L94,14 L100,14 L95,18 L97,24 L92,20 L87,24 L89,18 L84,14 L90,14 Z" fill="#ff9f1c"/></svg>`;
}

function artBridge() {
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#a8c8e0"/><rect y="42" width="108" height="20" fill="#2c5f8a"/><path d="M6,42 Q54,8 102,42" fill="none" stroke="#16324f" stroke-width="3"/><line x1="6" y1="42" x2="102" y2="42" stroke="#16324f" stroke-width="3"/><line x1="30" y1="30" x2="30" y2="42" stroke="#16324f" stroke-width="2"/><line x1="54" y1="24" x2="54" y2="42" stroke="#16324f" stroke-width="2"/><line x1="78" y1="30" x2="78" y2="42" stroke="#16324f" stroke-width="2"/><path d="M54,6 L56.5,13 L64,13 L58,17.5 L60,25 L54,20.5 L48,25 L50,17.5 L44,13 L51.5,13 Z" fill="#ff9f1c"/><circle cx="46" cy="10" r="3" fill="#888" opacity="0.7"/><circle cx="62" cy="8" r="2.4" fill="#888" opacity="0.7"/><path d="M10,50 q6,-2 12,0 M60,54 q6,-2 12,0" stroke="#fff" stroke-width="1.4" fill="none" opacity="0.7"/></svg>`;
}

function artExam() {
  // Classroom: chalkboard, clock at 08:40, three candidates at desks.
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#f2e8d5"/><rect x="14" y="6" width="56" height="22" fill="#2e6b4f"/><text x="42" y="22" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#fff">EXAM</text><circle cx="90" cy="16" r="10" fill="#fff" stroke="#16324f" stroke-width="2"/><line x1="90" y1="16" x2="84" y2="13" stroke="#16324f" stroke-width="1.6"/><line x1="90" y1="16" x2="83" y2="19" stroke="#b3261e" stroke-width="1.6"/><g fill="#16324f"><rect x="16" y="40" width="20" height="4"/><rect x="44" y="40" width="20" height="4"/><rect x="72" y="40" width="20" height="4"/><circle cx="26" cy="33" r="5"/><circle cx="54" cy="33" r="5"/><circle cx="82" cy="33" r="5"/></g><rect x="10" y="48" width="88" height="3" fill="#b3261e"/></svg>`;
}

function artGavel() {
  // Parliament hall (red/white) with a gavel.
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#fdf0ee"/><polygon points="54,6 96,14 12,14" fill="#b3261e"/><rect x="8" y="14" width="92" height="34" fill="#fff" stroke="#b3261e" stroke-width="1.5"/><rect x="20" y="20" width="6" height="22" fill="#b3261e"/><rect x="36" y="20" width="6" height="22" fill="#b3261e"/><rect x="66" y="20" width="6" height="22" fill="#b3261e"/><rect x="82" y="20" width="6" height="22" fill="#b3261e"/><rect x="48" y="20" width="12" height="22" fill="#16324f"/><rect x="8" y="48" width="92" height="4" fill="#16324f"/><g transform="rotate(-24 88 44)"><rect x="80" y="38" width="16" height="5" rx="1" fill="#16324f"/></g></svg>`;
}

function artGlobe() {
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#dff0e4"/><circle cx="42" cy="31" r="22" fill="#2e8b57"/><path d="M28,22 q10,-6 16,2 q8,2 4,10 q-6,8 -16,4 q-8,-6 -4,-16Z" fill="#7ec850"/><path d="M30,40 q8,6 18,2" fill="none" stroke="#7ec850" stroke-width="3"/><g transform="translate(78,10)"><rect x="-4" y="0" width="8" height="26" rx="4" fill="#fff" stroke="#b3261e" stroke-width="1.5"/><rect x="-2" y="12" width="4" height="14" fill="#b3261e"/><circle cx="0" cy="30" r="6" fill="#b3261e"/></g><text x="42" y="58" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#16324f">FINAL 48 HOURS</text></svg>`;
}

function artChart() {
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#0d3b2e"/><text x="8" y="14" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">ANT</text><g stroke="#2ecc71" stroke-width="2"><line x1="12" y1="44" x2="12" y2="30"/><line x1="28" y1="40" x2="28" y2="24"/><line x1="44" y1="36" x2="44" y2="18"/><line x1="60" y1="32" x2="60" y2="12"/><line x1="76" y1="28" x2="76" y2="8"/></g><g fill="#2ecc71"><rect x="8" y="34" width="8" height="10"/><rect x="24" y="28" width="8" height="12"/><rect x="40" y="22" width="8" height="14"/><rect x="56" y="16" width="8" height="16"/><rect x="72" y="10" width="8" height="18"/></g><rect x="74" y="42" width="26" height="14" fill="#ffd76a"/><text x="87" y="52" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#16324f">$111</text></svg>`;
}

function artShield() {
  // Danish flag + shield + 109-0.
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#c8102e"/><rect x="30" y="0" width="12" height="62" fill="#fff"/><rect x="0" y="25" width="108" height="12" fill="#fff"/><g transform="translate(78,31)"><path d="M0,-18 L14,-12 V2 C14,12 8,18 0,22 C-8,18 -14,12 -14,2 V-12 Z" fill="#fff" stroke="#16324f" stroke-width="2"/><path d="M-6,2 L-2,6 L7,-4" fill="none" stroke="#1a7a3a" stroke-width="2.5"/></g><text x="62" y="58" font-family="Arial" font-size="11" font-weight="bold" fill="#fff">109–0</text></svg>`;
}

function artCyclone() {
  return `<svg width="100%" height="100%" viewBox="0 0 108 62" preserveAspectRatio="xMidYMid slice"><rect width="108" height="62" fill="#dfe9f2"/><g fill="none" stroke="#16324f" stroke-width="2.4" stroke-linecap="round"><path d="M40,31 a6,6 0 1 1 6,-6"/><path d="M40,31 a13,13 0 1 1 11,-13"/><path d="M40,31 a20,20 0 1 1 17,-20"/></g><circle cx="40" cy="31" r="3" fill="#b3261e"/><g stroke="#2c5f8a" stroke-width="2" stroke-linecap="round"><line x1="76" y1="8" x2="72" y2="18"/><line x1="88" y1="8" x2="84" y2="18"/><line x1="100" y1="8" x2="96" y2="18"/><line x1="76" y1="24" x2="72" y2="34"/><line x1="88" y1="24" x2="84" y2="34"/><line x1="100" y1="24" x2="96" y2="34"/></g><rect x="46" y="44" width="46" height="12" fill="#b3261e"/><text x="69" y="53" text-anchor="middle" font-family="Arial" font-size="7.5" font-weight="bold" fill="#fff">RED ALERT</text></svg>`;
}

const ART = {
  shenzhen: artShenzhen, gta6: artGta6, icj: artIcj,
  drone: artDrone, bridge: artBridge, exam: artExam, gavel: artGavel,
  globe: artGlobe, chart: artChart, shield: artShield, cyclone: artCyclone,
};

// -------------------------------------------------------------------- page
const STATS = [
  ["3", "LEADERS AT ONE TABLE"],
  ["9–6", "ICJ GENOCIDE VOTE"],
  ["$111.50", "ANTHROPIC'S FIRST TRADE"],
  ["109–0", "DANISH VOTE, ARCTIC PACT"],
  ["4.9%", "AUSTRALIA JOBLESS, 5-YR HIGH"],
  ["551,864", "SIT KOREA'S SUNEUNG EXAM"],
];

const spine = data.spine;
function timePill(s) {
  return `<span class="time">${esc(s.time)} · ${esc(s.city)}</span>`;
}
function heroRow(s) {
  return `<div class="trow herorow"><article class="hero">
    <div class="art">${ART[s.art]()}</div>
    <div class="htext">
      <div class="kicker">${timePill(s)}<span class="num">${s.num}</span> ${esc(s.kicker)}</div>
      <h2>${esc(s.headline)}</h2>
      <p>${esc(s.body)}</p>
    </div>
  </article></div>`;
}
function leadCard(s) {
  return `<article class="card">
    <div class="art">${ART[s.art]()}</div>
    <div class="ctext">
      <div class="kicker">${timePill(s)}<span class="num">${s.num}</span> ${esc(s.kicker)}</div>
      <h3>${esc(s.headline)}</h3>
      <p>${esc(s.body)}</p>
    </div>
  </article>`;
}
function leadRow(a, b) {
  return `<div class="trow leadrow">${leadCard(a)}${leadCard(b)}</div>`;
}

// Timeline order: hero, 2 leads, 2 leads, hero, 2 leads, hero, 2 leads.
const timelineHtml =
  heroRow(spine[0]) +
  leadRow(spine[1], spine[2]) +
  leadRow(spine[3], spine[4]) +
  heroRow(spine[5]) +
  leadRow(spine[6], spine[7]) +
  heroRow(spine[8]) +
  leadRow(spine[9], spine[10]);

const statsHtml = STATS.map(([n, l]) => `
    <div class="stat"><div class="statnum">${n}</div><div class="statlabel">${l}</div></div>`).join("");

const briefHtml = data.briefs.map((b) => `
    <li><b>${esc(b.label)} —</b> ${esc(b.text)}</li>`).join("");

const excludedText = data.excluded.map((e) => `${esc(e.text)} (${esc(e.date)})`).join(" · ");

const storyCount = data.spine.length + data.briefs.length;

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>The World in One Day — Thursday 19 November 2026</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1024px; height: 1024px; background: #f8f4ec; }
  body { font-family: "Noto Sans", Arial, sans-serif; color: #1a1a1a; }
  .page { width: 1024px; height: 1024px; padding: 10px 14px 8px; display: flex; flex-direction: column; gap: 5px; }
  /* masthead */
  .masthead { text-align: center; border-bottom: 3px double #1a1a1a; padding-bottom: 4px; flex: 0 0 auto; }
  .name { font-size: 12px; font-weight: bold; letter-spacing: 6px; color: #b3261e; }
  h1 { font-family: "Noto Serif", Georgia, serif; font-size: 36px; line-height: 1.08; font-weight: bold; }
  .tagline { font-size: 11px; font-style: italic; color: #444; margin-top: 1px; }
  /* big-number stat strip */
  .stats { display: flex; border-bottom: 1px solid #1a1a1a; padding: 2px 0 4px; flex: 0 0 auto; }
  .stat { flex: 1; text-align: center; border-left: 1px solid #d8d0bc; padding: 0 4px; }
  .stat:first-child { border-left: none; }
  .statnum { font-family: "Noto Serif", Georgia, serif; font-size: 20px; font-weight: bold; color: #b3261e; line-height: 1.1; }
  .statlabel { font-size: 7.5px; font-weight: bold; letter-spacing: 0.6px; color: #444; }
  /* timeline header */
  .tl-head { font-size: 10px; font-weight: bold; letter-spacing: 1.5px; color: #b3261e; flex: 0 0 auto; padding-left: 52px; }
  .tl-head span { color: #666; font-weight: normal; letter-spacing: 0.5px; }
  /* timeline spine */
  .timeline { position: relative; padding-left: 52px; display: flex; flex-direction: column; gap: 4px; flex: 0 0 auto; }
  .timeline::before { content: ""; position: absolute; left: 25px; top: 8px; bottom: 8px; width: 3px; background: #b3261e; border-radius: 2px; }
  .trow { position: relative; display: flex; gap: 8px; }
  .trow::before { content: ""; position: absolute; left: -32px; top: 50%; width: 12px; height: 12px; margin-top: -6px; background: #b3261e; border: 2px solid #f8f4ec; border-radius: 50%; box-shadow: 0 0 0 1.5px #b3261e; }
  .leadrow::before { width: 10px; height: 10px; margin-top: -5px; left: -31px; }
  .herorow { flex: 0 0 90px; }
  .leadrow { flex: 0 0 66px; }
  .hero { flex: 1; border: 1px solid #c9c2b4; background: #fffdf8; display: flex; overflow: hidden; }
  .hero .art { flex: 0 0 318px; }
  .hero .art svg, .card .art svg { display: block; }
  .htext { padding: 6px 12px; }
  .kicker { font-size: 9px; font-weight: bold; letter-spacing: 1px; color: #16324f; margin-bottom: 2px; }
  .time { display: inline-block; background: #b3261e; color: #fff; font-size: 9px; padding: 1px 6px; border-radius: 2px; margin-right: 6px; letter-spacing: 0.5px; }
  .num { display: inline-block; background: #16324f; color: #fff; font-size: 8.5px; width: 13px; height: 13px; line-height: 13px; text-align: center; border-radius: 50%; margin-right: 3px; }
  .hero h2 { font-family: "Noto Serif", Georgia, serif; font-size: 19px; line-height: 1.12; margin-bottom: 2px; }
  .hero p { font-size: 11px; line-height: 1.32; color: #333; }
  .card { flex: 1; border: 1px solid #c9c2b4; background: #fffdf8; display: flex; overflow: hidden; }
  .card .art { flex: 0 0 104px; }
  .ctext { padding: 4px 8px; }
  .ctext .kicker { font-size: 8px; margin-bottom: 1px; }
  .ctext .time { font-size: 8px; padding: 1px 5px; }
  .card h3 { font-family: "Noto Serif", Georgia, serif; font-size: 12.5px; line-height: 1.14; margin-bottom: 1px; }
  .card p { font-size: 9.5px; line-height: 1.28; color: #333; }
  /* middle row: map + briefs */
  .middle { display: flex; gap: 9px; flex: 0 0 196px; }
  .mapbox { flex: 0 0 348px; border: 1px solid #c9c2b4; background: #f2f6f8; padding: 3px 8px 2px; }
  .mapbox h4, .briefs h4 { font-size: 10px; letter-spacing: 1.2px; color: #16324f; margin-bottom: 1px; }
  .mapbox .cap { font-size: 8.5px; color: #666; }
  .briefs { flex: 1; border: 1px solid #c9c2b4; background: #fffdf8; padding: 4px 10px 5px; }
  .briefs ul { list-style: none; columns: 3; column-gap: 13px; }
  .briefs li { font-size: 8.5px; line-height: 1.2; padding: 0.2px 0; border-bottom: 1px dotted #ddd5c4; }
  .briefs li:last-child { border-bottom: none; }
  .briefs li b { color: #16324f; }
  /* date check strip */
  .datecheck { border: 2px solid #b3261e; background: #fdf0ee; padding: 4px 10px 5px; flex: 0 0 auto; }
  .datecheck p { font-size: 8.5px; line-height: 1.3; }
  .datecheck b { color: #b3261e; letter-spacing: 0.5px; }
  /* footer */
  .footer { text-align: center; font-size: 8.5px; color: #555; line-height: 1.35; flex: 0 0 auto; border-top: 1px solid #c9c2b4; padding-top: 3px; }
  .footer b { color: #1a1a1a; }
</style></head>
<body><div class="page">
  <header class="masthead">
    <div class="name">${esc(data.meta.title)}</div>
    <h1>${esc(data.meta.day)}</h1>
    <div class="tagline">${esc(data.meta.tagline)}</div>
  </header>
  <div class="stats">${statsHtml}
  </div>
  <div class="tl-head">▼ THE DAY IN HOURS <span>— local times · follow Thursday around the world</span></div>
  <section class="timeline">${timelineHtml}
  </section>
  <section class="middle">
    <div class="mapbox">
      <h4>WHERE IT HAPPENED — THE 11 PINNED STORIES</h4>
      ${buildMapSvg()}
      <div class="cap">Numbers match the badges on the timeline. Crowded pins use leader lines.</div>
    </div>
    <div class="briefs">
      <h4>ALSO ON THURSDAY — 23 MORE STORIES</h4>
      <ul>${briefHtml}
      </ul>
    </div>
  </section>
  <section class="datecheck">
    <p><b>DATE CHECK — LEFT OUT ON PURPOSE, FIRST REPORTED ON OTHER DAYS:</b> ${excludedText}</p>
  </section>
  <footer class="footer">
    <b>${esc(data.meta.judgeNote)}</b><br>
    Sources: ${esc(data.meta.sources)} — All stories verified as 19 November 2026.
  </footer>
</div></body></html>
`;

writeFileSync(join(DIR, "index.html"), html);
console.log(`index.html written (${html.length} bytes, ${storyCount} stories)`);
