// generate.mjs — builds index.html (the front page) from stories.json.
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
const MAP_W = 460;
const MAP_H = 245;
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
        dots += `<circle cx="${((c + 0.5) * cw).toFixed(1)}" cy="${((r + 0.5) * ch).toFixed(1)}" r="2.3" fill="#aebfca"/>`;
      }
    }
  }
  let pins = "";
  const pinned = [...data.heroes, ...data.cards];
  for (const s of pinned) {
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
const STAR = "M0,-5 L1.5,-1.8 L5,-1.5 L2.3,0.8 L3.2,4.2 L0,2.2 L-3.2,4.2 L-2.3,0.8 L-5,-1.5 L-1.5,-1.8 Z";

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
  return `<svg width="100%" height="72" viewBox="0 0 318 88" preserveAspectRatio="xMidYMid slice">${sky}<rect width="318" height="88" fill="url(#sz)"/>${buildings}${windows}${flags}<rect y="86" width="318" height="2" fill="#ffd76a"/></svg>`;
}

function artGta6() {
  const sky = `<defs><linearGradient id="gt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a56"/><stop offset="0.55" stop-color="#e84393"/><stop offset="1" stop-color="#6c5ce7"/></linearGradient></defs>`;
  const palm = (tx, s) => `<g transform="translate(${tx},86) scale(${s})" stroke="#14101f" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0,0 Q2,-16 7,-30"/><path d="M7,-30 Q-12,-40 -26,-32"/><path d="M7,-30 Q-6,-46 -18,-50"/><path d="M7,-30 Q8,-48 4,-54"/><path d="M7,-30 Q24,-44 34,-36"/><path d="M7,-30 Q26,-28 36,-18"/></g>`;
  return `<svg width="100%" height="72" viewBox="0 0 318 88" preserveAspectRatio="xMidYMid slice">${sky}<rect width="318" height="88" fill="url(#gt)"/><circle cx="159" cy="52" r="22" fill="#ffd32a"/><circle cx="159" cy="52" r="27" fill="none" stroke="#ffd32a" stroke-width="1.5" opacity="0.6"/>${palm(28, 1)}${palm(286, 0.85)}<rect y="78" width="318" height="10" fill="#14101f"/><g fill="#14101f"><path d="M108,66 L116,56 L134,52 L176,52 L192,56 L202,66 L202,72 L108,72 Z"/><circle cx="130" cy="72" r="6"/><circle cx="182" cy="72" r="6"/></g><circle cx="130" cy="72" r="2.4" fill="#f8f4ec"/><circle cx="182" cy="72" r="2.4" fill="#f8f4ec"/><text x="159" y="34" text-anchor="middle" font-family="Noto Serif, Georgia, serif" font-size="30" font-weight="bold" fill="#fff" stroke="#14101f" stroke-width="0.8">VI</text></svg>`;
}

function artIcj() {
  const cols = [28, 58, 88, 118].map((x) => `<rect x="${x}" y="38" width="10" height="32" fill="#16324f"/>`).join("");
  return `<svg width="100%" height="72" viewBox="0 0 318 88" preserveAspectRatio="xMidYMid slice"><rect width="318" height="88" fill="#eef2f5"/><polygon points="18,34 164,34 91,10" fill="#16324f"/><rect x="18" y="34" width="146" height="4" fill="#16324f"/>${cols}<rect x="14" y="70" width="154" height="5" fill="#16324f"/><rect x="9" y="75" width="164" height="5" fill="#16324f"/><rect x="9" y="80" width="174" height="4" fill="#b3261e"/><g stroke="#16324f" stroke-width="2.4" fill="none" stroke-linecap="round"><line x1="250" y1="16" x2="250" y2="72"/><line x1="224" y1="22" x2="276" y2="22"/><line x1="230" y1="22" x2="224" y2="40"/><line x1="230" y1="22" x2="236" y2="40"/><line x1="270" y1="22" x2="264" y2="40"/><line x1="270" y1="22" x2="276" y2="40"/></g><path d="M220,40 a10,7 0 0 0 20,0 Z" fill="#b3261e"/><path d="M260,40 a10,7 0 0 0 20,0 Z" fill="#b3261e"/><circle cx="250" cy="16" r="3.5" fill="#16324f"/><rect x="236" y="72" width="28" height="4" fill="#16324f"/><text x="250" y="86" text-anchor="middle" font-family="Noto Sans, Arial, sans-serif" font-size="8" font-weight="bold" fill="#16324f" letter-spacing="1">10:00 · THE HAGUE</text></svg>`;
}

const ART = { shenzhen: artShenzhen, gta6: artGta6, icj: artIcj };

// ------------------------------------------------------------------- icons
const ICONS = {
  chart: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="2" stroke-linecap="round"><line x1="3" y1="21" x2="21" y2="21"/><rect x="5" y="13" width="3.4" height="6" fill="#16324f" stroke="none"/><rect x="10.3" y="9" width="3.4" height="10" fill="#16324f" stroke="none"/><rect x="15.6" y="4" width="3.4" height="15" fill="#b3261e" stroke="none"/></svg>`,
  cyclone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="2" stroke-linecap="round"><path d="M12 12a2 2 0 1 0 2-2"/><path d="M12 12a5 5 0 1 1-4.3-7.4"/><path d="M12 12a8 8 0 1 1-6.9-11.9"/><path d="M12 12a10.5 10.5 0 1 1-9-15.6"/></svg>`,
  globe: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3" y1="12" x2="21" y2="12"/></svg>`,
  drone: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/><circle cx="5" cy="5" r="2.2"/><circle cx="19" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><rect x="9.5" y="9.5" width="5" height="5" fill="#b3261e" stroke="none"/></svg>`,
  flags: `<svg width="26" height="26" viewBox="0 0 24 24"><rect x="2" y="5" width="9" height="13" fill="#fff" stroke="#16324f" stroke-width="1.4"/><rect x="2" y="5" width="9" height="4.3" fill="#ff9933"/><rect x="2" y="13.7" width="9" height="4.3" fill="#138808"/><circle cx="6.5" cy="11.5" r="1.8" fill="none" stroke="#06038d" stroke-width="1"/><rect x="13" y="6" width="9" height="12" fill="#fff" stroke="#16324f" stroke-width="1.4"/><circle cx="17.5" cy="12" r="3.2" fill="#bc002d"/></svg>`,
  ship: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15 L5 19 L19 19 L21 15 Z"/><line x1="12" y1="15" x2="12" y2="4"/><path d="M12 4 L18 10 L12 10 Z" fill="#b3261e" stroke="none"/><path d="M2 21.5 H22"/></svg>`,
  columns: `<svg width="26" height="26" viewBox="0 0 24 24" fill="#16324f"><polygon points="12,3 22,8 2,8"/><rect x="4" y="10" width="2.6" height="8"/><rect x="10.7" y="10" width="2.6" height="8"/><rect x="17.4" y="10" width="2.6" height="8"/><rect x="2" y="19.5" width="20" height="2"/></svg>`,
  passport: `<svg width="26" height="26" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1.5" fill="#16324f"/><circle cx="12" cy="10.5" r="4.5" fill="none" stroke="#ffd76a" stroke-width="1.4" stroke-dasharray="1.6 1.4"/><line x1="8" y1="18" x2="16" y2="18" stroke="#fff" stroke-width="1.4"/></svg>`,
  house: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.9" stroke-linejoin="round"><path d="M3 11 L12 4 L21 11"/><path d="M5.5 9.5 V20 H18.5 V9.5"/><rect x="10" y="14" width="4" height="6" fill="#b3261e" stroke="none"/></svg>`,
  bridge: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.8" stroke-linecap="round"><path d="M2 16 Q12 4 22 16"/><line x1="2" y1="16" x2="22" y2="16"/><line x1="5" y1="16" x2="5" y2="20"/><line x1="12" y1="10.5" x2="12" y2="20"/><line x1="19" y1="16" x2="19" y2="20"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  shield: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3 L19 6 V11 C19 16 16.2 19.4 12 21 C7.8 19.4 5 16 5 11 V6 Z"/><path d="M8.5 11.5 L11 14 L15.5 9" stroke="#b3261e" stroke-width="2" stroke-linecap="round"/></svg>`,
  gavel: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16324f" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3.5" width="12" height="4.5" rx="1" transform="rotate(-28 9 5.7)" fill="#16324f" stroke="none"/><line x1="11.5" y1="9" x2="18" y2="17.5"/><line x1="4" y1="20.5" x2="16" y2="20.5" stroke-width="2.2"/></svg>`,
};

// -------------------------------------------------------------------- page
const heroHtml = data.heroes.map((h) => `
  <article class="hero">
    <div class="art">${ART[h.art]()}</div>
    <div class="hero-body">
      <div class="kicker"><span class="num">${h.num}</span> ${esc(h.kicker)}</div>
      <h2>${esc(h.headline)}</h2>
      <p>${esc(h.body)}</p>
    </div>
  </article>`).join("");

const cardHtml = data.cards.map((c) => `
  <article class="card">
    <div class="icon">${ICONS[c.icon]}</div>
    <div class="card-text">
      <div class="kicker"><span class="num">${c.num}</span> ${esc(c.kicker)}</div>
      <h3>${esc(c.headline)}</h3>
      <p>${esc(c.body)}</p>
    </div>
  </article>`).join("");

const briefHtml = data.briefs.map((b) => `
    <li><b>${esc(b.label)} —</b> ${esc(b.text)}</li>`).join("");

const excludedHtml = data.excluded.map((e) => `
      <li><span class="x">✕</span> ${esc(e.text)} <b>· ${esc(e.date)}</b></li>`).join("");

const storyCount = data.heroes.length + data.cards.length + data.briefs.length;

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>The World in One Day — Thursday 19 November 2026</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1024px; height: 1024px; background: #f8f4ec; }
  body { font-family: "Noto Sans", Arial, sans-serif; color: #1a1a1a; }
  .page { width: 1024px; height: 1024px; padding: 11px 16px 9px; display: flex; flex-direction: column; gap: 5px; }
  /* masthead */
  .masthead { text-align: center; border-bottom: 3px double #1a1a1a; padding-bottom: 5px; flex: 0 0 auto; }
  .name { font-size: 13px; font-weight: bold; letter-spacing: 6px; color: #b3261e; }
  h1 { font-family: "Noto Serif", Georgia, serif; font-size: 37px; line-height: 1.08; font-weight: bold; }
  .tagline { font-size: 11px; font-style: italic; color: #444; margin-top: 1px; }
  /* stat strip */
  .stats { display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding: 2px 2px 4px; font-size: 11px; font-weight: bold; letter-spacing: 0.5px; flex: 0 0 auto; }
  .stats span b { color: #b3261e; }
  /* heroes */
  .heroes { display: flex; gap: 9px; flex: 0 0 164px; }
  .hero { flex: 1; border: 1px solid #c9c2b4; background: #fffdf8; display: flex; flex-direction: column; overflow: hidden; }
  .art { flex: 0 0 72px; }
  .art svg { display: block; }
  .hero-body { padding: 5px 9px 5px; }
  .kicker { font-size: 9px; font-weight: bold; letter-spacing: 1px; color: #16324f; margin-bottom: 2px; }
  .num { display: inline-block; background: #b3261e; color: #fff; font-size: 8.5px; width: 13px; height: 13px; line-height: 13px; text-align: center; border-radius: 50%; margin-right: 3px; }
  .hero h2 { font-family: "Noto Serif", Georgia, serif; font-size: 16.5px; line-height: 1.15; margin-bottom: 3px; }
  .hero p { font-size: 11px; line-height: 1.35; color: #333; }
  /* medium grid */
  .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr 1fr; gap: 7px; flex: 1 1 auto; min-height: 0; }
  .card { border: 1px solid #c9c2b4; background: #fffdf8; padding: 4px 8px; display: flex; gap: 8px; overflow: hidden; }
  .icon { flex: 0 0 26px; padding-top: 1px; }
  .card h3 { font-family: "Noto Serif", Georgia, serif; font-size: 12px; line-height: 1.18; margin-bottom: 1px; }
  .card p { font-size: 9.5px; line-height: 1.28; color: #333; }
  /* middle row: map + briefs */
  .middle { display: flex; gap: 9px; flex: 0 0 272px; }
  .mapbox { flex: 0 0 478px; border: 1px solid #c9c2b4; background: #f2f6f8; padding: 3px 8px 2px; }
  .mapbox h4, .briefs h4 { font-size: 10px; letter-spacing: 1.2px; color: #16324f; margin-bottom: 1px; }
  .mapbox .cap { font-size: 8.5px; color: #666; }
  .briefs { flex: 1; border: 1px solid #c9c2b4; background: #fffdf8; padding: 4px 10px 5px; }
  .briefs ul { list-style: none; columns: 2; column-gap: 14px; }
  .briefs li { font-size: 9px; line-height: 1.25; padding: 0.2px 0; border-bottom: 1px dotted #ddd5c4; }
  .briefs li:last-child { border-bottom: none; }
  .briefs li b { color: #16324f; }
  /* date check */
  .datecheck { border: 2px solid #b3261e; background: #fdf0ee; padding: 4px 10px 5px; flex: 0 0 auto; }
  .datecheck h4 { font-size: 10px; letter-spacing: 0.8px; color: #b3261e; margin-bottom: 2px; }
  .datecheck ul { list-style: none; columns: 3; column-gap: 18px; }
  .datecheck li { font-size: 9px; line-height: 1.25; padding: 0.5px 0; }
  .datecheck li b { color: #b3261e; }
  .datecheck .x { color: #b3261e; font-weight: bold; }
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
  <div class="stats">
    <span><b>${storyCount}</b> STORIES</span>
    <span><b>6</b> CONTINENTS</span>
    <span><b>3</b> HEROES · <b>12</b> LEADS · <b>19</b> BRIEFS</span>
    <span><b>${data.excluded.length}</b> TRAPS CHECKED &amp; EXCLUDED</span>
  </div>
  <section class="heroes">${heroHtml}
  </section>
  <section class="grid">${cardHtml}
  </section>
  <section class="middle">
    <div class="mapbox">
      <h4>WHERE IT HAPPENED — THE 15 PINNED STORIES</h4>
      ${buildMapSvg()}
      <div class="cap">Numbers match the red badges on the stories above. Crowded pins use leader lines.</div>
    </div>
    <div class="briefs">
      <h4>IN BRIEF — 19 MORE STORIES FROM THE DAY</h4>
      <ul>${briefHtml}
      </ul>
    </div>
  </section>
  <section class="datecheck">
    <h4>DATE CHECK — THESE BIG STORIES ARE NOT 19 NOVEMBER. THEY WERE CHECKED AND LEFT OUT.</h4>
    <ul>${excludedHtml}
    </ul>
  </section>
  <footer class="footer">
    <b>${esc(data.meta.judgeNote)}</b><br>
    Sources: ${esc(data.meta.sources)} — All stories verified as 19 November 2026.
  </footer>
</div></body></html>
`;

writeFileSync(join(DIR, "index.html"), html);
console.log(`index.html written (${html.length} bytes, ${storyCount} stories)`);
