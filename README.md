# The World in One Day — Thursday 19 November 2026

[![make.fun competition](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119)
[![make.fun rank](https://make.fun/badge/news-image-20261119/basahhmemekk7-ai/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119)
[![make.fun reward](https://make.fun/badge/news-image-20261119/basahhmemekk7-ai/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119)

A newspaper front page summing up the world's news of **Thursday 19 November
2026**, built for the
[make.fun news-image-20261119 competition](https://make.fun/c/news-image-20261119).

Every story on the page happened, or was first reported, on 19 November 2026 —
in any time zone. Nothing from yesterday: a red DATE CHECK box lists 22
prominent stories that did *not* happen on 19 November (Voyager 1's light-day,
Nvidia's quarter, the Kerch Bridge road arch, the $190.4m Van Gogh, and more),
each checked and deliberately excluded.

## The image

- **34 stories, 6 continents**: 3 heroes (the first-ever Trump–Xi–Putin summit
  in Shenzhen, the GTA VI launch, the ICJ's Myanmar genocide judgment), 12 lead
  stories, 19 briefs.
- **World map** with numbered pins for the 15 pinned stories.
- **DATE CHECK box**: 22 traps excluded, with their real dates.
- 1024×1024 PNG, under 1 MiB.

## How it is built

`stories.json` holds the verified stories (heroes, leads, briefs, excluded).
`generate.mjs` renders them into `index.html` (a broadsheet layout with a
dot-matrix world map and flat vector illustrations). `render.cjs` screenshots
that page at 1024×1024 with Playwright/Chromium into `entry.png`. The entry
program, `main.ts`, simply copies `entry.png` to the output directory — no
network, no randomness, no timestamps, so every run writes identical bytes.

```sh
npm run build    # stories.json -> index.html
npm run render   # index.html -> entry.png (needs Playwright + Chromium)
npm start        # entry.png -> $MAKEFUN_OUTPUT_DIR/entry.png
```

## Status

Final render, 20 November 2026, from the complete day's news. All three of
the day's scheduled events (Shenzhen summit, ICJ judgment, Anthropic's first
trade) carry their outcomes. See `HANDOFF.md` for the full build log.

## License

MIT — see `LICENSE`.
