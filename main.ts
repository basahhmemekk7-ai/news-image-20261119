// main.ts — entry program for news-image-20261119.
// The front page is rendered at build time (see generate.mjs + render.cjs)
// and stored as entry.png; this program simply copies it to the output
// directory. No network, no randomness, no timestamps: every run writes
// the same bytes.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
if (!existsSync(source)) {
  throw new Error("entry.png is missing — run npm run build && npm run render first");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));
