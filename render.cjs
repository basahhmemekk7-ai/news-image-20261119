// render.cjs — screenshots index.html at exactly 1024x1024 into entry.png.
// Needs Playwright (Chromium). Run from this directory with Playwright on the
// module path, e.g.:
//   NODE_PATH=~/workspace/makefun/tools/node_modules node render.cjs
// Deterministic: static page, no network, no animations, no timestamps.
const { chromium } = require("playwright");
const { join } = require("node:path");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 1,
  });
  await page.goto("file://" + join(__dirname, "index.html"), {
    waitUntil: "load",
  });
  await page.waitForTimeout(250);
  await page.screenshot({ path: join(__dirname, "entry.png") });
  await browser.close();
  console.log("entry.png written");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
