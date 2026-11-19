# HANDOFF — news-image-20261119 (phase 1 done, finalize Friday)

## Competition
- **news-image-20261119**: "Sum up 19 November's world news in one image."
- $250, 50 paid places (1st $50, 2nd $30, 3rd $15, 4–10 $5, 11–50 $3).
  Free entry. Entries close **Sat 21 Nov 2026 07:00 WIB** (2026-11-21T00:00:00Z).
- Opened 2026-11-19T00:00:00Z. ~3,510 submissions at the 19 Nov late-morning
  check. Prizes NOT escrowed (paid from make.fun's reward wallet).
- Judge: z-ai/glm-5.3-flash, pairwise, no news feed, not told the day.
  Criteria in order: (1) names the day + specific events of that day;
  (2) selection and breadth across regions/fields; (3) reads — viewer can tell
  what happened from the image alone, nothing false/implausible; (4) faithful,
  no hype/speculation as fact; (5) craft — one clear composition, legible at
  ~300px across, no garbled text. "Detail for its own sake does not count."
- Transcripts REQUIRED (transcript gate). Deliverables: public GitHub repo
  (created after the competition opened) + commit SHA + transcripts bundle.

## Phase 1 status — DONE (Thu 19 Nov, ~11:30 WIB)
Draft front page built, rendered, verified. **NO SUBMIT in phase 1** (per plan).
Friday finalization is scheduled: runonce cron `news-19-finalize`,
**Fri 20 Nov 19:30 WIB** (Basahh accepted with "Oke").

## Top-entry evaluation (live leaderboard, 19 Nov ~10:12 WIB)
Top 6 (images downloaded to /tmp/news-top/ and viewed; ephemeral, re-download
via the leaderboard artifact URLs if needed):
1. quick-finch-51 — 991468 (99.15%), 12W 0L — "The World in One Day — Thursday
   19 November 2026"
2. mellow-otter-50 — 990970 — "43 stories — summit, GTA VI day, record IPO"
3. hazel-kestrel-79 — 990161 — "42 stories, 3 heroes, date masthead, map +
   numbered briefs"
4. sk-online-earning — 990050
5. xshineezg — 989695 — "40 stories, six continents, one front page"
6. fauzzz1 — 989488

Winning formula (all top 6): huge date masthead; 36–43 stories; 3 large hero
illustrated cards + 9–12 smaller illustrated cards; flat vector illustrations;
world map with numbered pins; region-count / big-number stat strip; briefs list
to reach 40+; DATE CHECK box excluding prior-day stories (ranks 1, 2, 4, 5) or
JUDGE NOTE (rank 6); sources footer. All square 1024×1024 broadsheets,
190–380 KB.

**Decisive finding: the whole top 6 is riddled with date errors — even ranks
1–2.** They correctly excluded Voyager, Pew, EU loan, Jeffries, Fed minutes,
Iran strikes, but wrongly INCLUDED: Mélenchon (17–18 Nov), Florida flooding
(17–18 Nov), Great Unconformity paper (4 Nov), Saudi all-clear (13 Nov), Libya
seizure (17 Nov), Deutsche Bank/Epstein $582m (17 Nov), Somalia/UAE accusation
(17 Nov), US senators' AI-cyber letter (18 Nov), Amazon $7bn India renewables
(17 Nov), Bolivia El Niño emergency (decree 31 Oct). They also say "200,000
evacuated" for Cyclone Akvan — actually 47,000+ evacuated; 204,070 were only
*identified for possible evacuation*. Ranks 3–6 add: Nvidia (17 Nov), Kerch
Bridge (16–17 Nov), Van Gogh $190.4m (18 Nov), Hegseth Venezuela deal
(18 Nov), Peltola (17 Nov), Australia settler sanctions (18 Nov), Gaza Yellow
Line (18 Nov), Modi/Wales meeting (18 Nov), Duckett 133 ODI (18 Nov), Ruto
address (moved to 18 Nov), Gas Husky tanker (17 Nov), Iraq ISIL sentences
(18 Nov). **Date accuracy is therefore our main differentiator**: our entry
includes ONLY genuinely 19 Nov stories and carries a DATE CHECK box naming the
excluded traps.

## Story list (24 verified as Thu 19 Nov 2026 — in stories.json)
Heroes: (1) Shenzhen trilateral — first-ever Trump–Xi–Putin meeting, Kylin
Villa 14:30 Shenzhen (06:30 UTC), 1 hr; nuclear arms, Ukraine, Iran, trade,
AI. (2) GTA VI launch — midnight local, NZ first; Metacritic 99 (140+
reviews); 2.3m Twitch viewers by 12:15 Paris; $79.99, PS5 + Xbox, no PC yet.
(3) ICJ Myanmar judgment — 10:00 The Hague; The Gambia v. Myanmar; 730,000+
Rohingya fled 2017; first ICJ genocide judgment in over a decade.
Leads (9): Anthropic IPO first trade (Nasdaq ANT, priced $83, $81.3bn raised,
largest IPO ever, ~$1.5tn valuation); Cyclone Akvan (47,000+ evacuated Odisha,
landfall Fri noon, 90–100 km/h, red alert 10–11 districts, 74 rescue teams);
COP31 final 48 hours (Antalya, closes Fri 20 Nov; draft deal dated 16 Nov —
frame as "ministers haggle over draft", do NOT present the $120bn figure as
19 Nov news); Russia drone strikes on Kyiv overnight (4 wounded Kyiv region,
energy hit in Odesa, Shahed in Lypky); India–Japan 2+2 in Tokyo; Bayesian MAIB
final report (80mph winds, capsized in under 15 seconds, 7 died Aug 2024);
UK–Irish talks Dublin (Troubles legacy, NI budget); UK–EU under-30s visas by
2028 (i Paper exclusive); Leasehold Reform Bill enters Parliament (ground
rents capped £250/yr from 2028, ~5m homes).
Briefs (12): Xi $20m APEC pledge + Shenzhen study centre; UK Parliament AI
safety report (£400bn prize); McDonald's 450 claims to full hearing
(CANDIDATE — confirm ruling date; BBC first reported 19 Nov); Morocco defence
roadmap (50,000 jobs, 65% exports by 2035); Benin seeks 35 looted artworks
(Le Monde); henipavirus mRNA vaccine (Nature Communications); NBA results
(Bulls 137–107 Nets, Heat 137–130 Bucks, Bucks 1–14); NASA JPL Voyager
discussion 17:00 UTC; Estonia delegation in Jakarta; Indonesia heavy-rain
alert 19 provinces (CANDIDATE — BMKG alert covered 17–19 Nov); California
atmospheric river Thursday phase (CANDIDATE); Russell Brand channel
deactivation ask (CANDIDATE — Independent 19 Nov; BBC's "Google rejects
removal" was 18 Nov 23:29 GMT, do NOT conflate).

**Tense warning (draft):** at draft render time (~11:00 WIB Thu), the Shenzhen
summit (13:30 WIB), ICJ judgment (16:00 WIB) and Anthropic first trade
(21:30 WIB) had not happened yet, so the draft words them as happening today.
**Friday MUST update all three with actual outcomes.**

**Friday watch items:** Thune's decision due Thu 19 Nov morning (Washington)
on a $350bn Pentagon budget-reconciliation push; APEC Leaders' Declaration
adoption (expected at the close on 19 Nov, NOT yet verified — confirm before
claiming); Chile TIAR Organ of Consultation (requested for 19 Nov, NO
confirmation it convened — do not include without verification); late 19 Nov
breakers, incl. late NBA games and any fresh Indonesia story.

## Excluded (verified NOT 19 Nov — full list for Friday reference)
Voyager 1 one light-day (18 Nov 10:16 UTC); Pew Islam/Christianity (18 Nov);
EU €45bn Ukraine loan (18 Nov); Jeffries Speaker nomination (18 Nov); Fed
minutes (18 Nov); Iran strikes Kuwait/Bahrain (18 Nov); Nvidia $115.8bn
(17 Nov); Kerch Bridge (16–17 Nov); Van Gogh $190.4m (18 Nov); Hegseth
Venezuela deal (18 Nov); Peltola (17 Nov); Australia settler sanctions
(18 Nov); Gaza Yellow Line (18 Nov); Mélenchon (17–18 Nov); Florida flooding
(17–18 Nov); Great Unconformity (4 Nov); Saudi all-clear (13 Nov); Libya
seizure (17 Nov); Modi/Wales (18 Nov); Duckett 133 (18 Nov); Ruto (moved to
18 Nov); Gas Husky (17 Nov); Deutsche Bank/Epstein (17 Nov); Somalia/UAE
(17 Nov); AI senators letter (18 Nov); Amazon $7bn (17 Nov); Iraq ISIL
sentences (18 Nov); Bolivia emergency (31 Oct); Haiti pastor verdict
(18 Nov); Alzheimer's "jab" (CTAD data 16–17 Nov, no "half" figure); Trump
Covid lab-leak inquiry (18 Nov); Google rejects Brand removal (18 Nov 23:29
GMT); South Carolina water (18 Nov); Prince Harry interview excerpts
(18 Nov); Maryland Doritos lawsuit filed (17 Nov); TfL Oyster breach
disclosed (18 Nov); Conley defeats Lawler (3 Nov); Cornyn blocks Gaiser
(18 Nov); Garcia preservation letters (18 Nov); Epstein petition 218
(11 Nov); Trump SCOTUS Venezuela TPS (18 Nov); Brazil Senate fiscal package
(18 Nov); Homo erectus teeth (18 Nov); Nature Medicine memory study (17 Nov);
Indonesia 18 Nov items (BI Rate hike to 6%, Indonesia–China $71.8bn
partnerships, Mecca defence pact); SBU strike on Naro-Fominsk (18 Nov);
COP31 $120bn draft (16 Nov); Anthropic IPO *pricing* (18 Nov evening — the
*debut* is 19 Nov). Unreliable aggregators: wsnext.com (misdates old stories)
and nexuseuropa.eu (AI-generated, conflates events) — never use without
independent verification from a reputable outlet.

## Design decisions
- Broadsheet front page: masthead "Thursday 19 November 2026", stat strip
  (24 stories · 5 continents · 3 heroes · 9 leads · 12 briefs · 14 traps
  excluded), 3 hero cards with flat vector illustrations, 9 lead cards with
  icons, dot-matrix world map (60×26 grid, hand-authored) with 12 numbered
  pins (leader lines for crowded UK/Netherlands pins), 12 briefs, red DATE
  CHECK box (14 traps), footer with judge note + sources.
- Rendering: pre-rendered PNG + copy (starter pattern, explicitly allowed by
  RULES.txt). `stories.json` → `generate.mjs` → `index.html` (gitignored
  build artifact, NOT committed — generated lines would count as unwritten)
  → `render.cjs` (Playwright/Chromium screenshot at 1024×1024) →
  `entry.png`. `main.ts` copies `entry.png` to `$MAKEFUN_OUTPUT_DIR`
  (default `/output`). No network, no randomness, no timestamps in output.
- Why 24 stories, not 40+: every story verified to the day; the DATE CHECK
  box turns the lower count into an accuracy signal (see evaluation above).
- South America has no verified 19 Nov story in the draft — if Friday finds
  one, the stat strip can say 6 continents (update the hardcoded "5" in
  generate.mjs).

## Repo state
- `~/workspace/makefun/news-image-20261119/` — git repo, HEAD `beb15bc`
  ("Add HANDOFF.md: evaluation, stories, Friday checklist"; previous
  `7761954` SPDX LICENSE, `b83b9f8` draft front page).
  11 files: main.ts, entry.png (308,815 bytes, sha256
  79ce9a646b9b541bd2f94c96754e68340d67708ac86ea3654dfababbbee810fa),
  stories.json, generate.mjs, render.cjs, package.json, README.md, LICENSE
  (MIT + SPDX line), .gitignore, .makefun/owner.json. Clean tree.
- Rebuild: `npm run build && npm run render` (render needs Playwright at
  ~/workspace/makefun/tools/node_modules — the npm script sets NODE_PATH).
- Verify determinism: run main.ts twice into two dirs, compare sha256 —
  verified byte-identical 19 Nov (two program runs AND two renders).
- entry.png: 1024×1024, 308,815 bytes (< 1 MiB). Layout verified by
  measurement (no clipped text) and by viewing the render.

## Kit check results (draft, 19 Nov ~11:26 WIB)
`node cli/makefun.mjs check --kit . --repo <repo> --transcripts
transcripts-draft.tar.gz` → **13 passed, 0 failed, 5 skipped, 5 checked at
submission** (final draft run on HEAD beb15bc, 19 Nov ~11:27 WIB).
Highlights: thinking_reproduces 495/496 lines authored (99.7%,
1 absent = entry.png); thinking_revised (generate.mjs 3 messages, main.ts 2);
thinking_in_window all 290 timestamps in window; thinking_priced 12 usage
records; thinking_turns 89; license_osi (SPDX MIT); entrypoint node22.
Skips are expected (no strategy note, unsigned entry, no --dotenv, no task
terms, no GitHub beacon yet). The 5 at-submission checks (repo public, owner,
created after open, commit pushed, duplicate snapshot) are Friday's job.

## Agents, usage rows, transcripts
- Phase-1 build agent (this session): **28605c44-ee35-4a0f-a649-f54d57c220a6**
  (subagent, started 2026-11-19T03:11:23Z — inside the window). Session file:
  ~/agents/agent-28605c44-ee35-4a0f-a649-f54d57c220a6/sessions/28605c44-ee35-4a0f-a649-f54d57c220a6.jsonl
- Parent agent: 2195fd64-19ab-42af-bbb5-3ff683d663ea (main chat
  e6933df2-c300-41a0-8887-2e1e986477ea). Its session is bundled too (cut to
  after the repo was first named — all in-window; bundle auto-left-out its
  2 pre-opening turns).
- GTA resume coordinator 6f083376-26fe-44e9-bdca-c2b045fbc814 is bundled as
  an "earlier session" (it wrote custom.github files this build read). Do
  NOT touch GTA dirs.
- Usage rows (DRAFT): ~/workspace/makefun/news-image-20261119-dev/muse-usage.jsonl
  — 59 rows, all parent agent (my session had 0 rows while running: a
  subagent's row is written only once its run completes). **Friday MUST
  re-run the SELECT** (query in the kit's bundle --help) with agent_ids:
  28605c44…, the Friday agent's own id, 2195fd64… (parent), 6f083376… —
  after ALL build sessions finish. The top-level agent builds the final
  bundle (BTC precedent).
- System prompt: ~/workspace/makefun/news-image-20261119-dev/system-prompt.md
  (redacted copy of this session's system prompt).
- Draft bundle: ~/workspace/makefun/news-image-20261119-dev/transcripts-draft.tar.gz
  (1,140,390 bytes, sha256
  cc377e5d6d61d651ff36c30f041b689c4fc1d2bde480b8a4033ac3fb9718b69d,
  rebuilt after the HANDOFF.md commit).
  Built with: --harness muse-app --harness-version 1.3 --provider meta
  --model ipnext/avocado-5.17-v7 --effort default --mcp none
  --notes "News-image 19 Nov front page; phase 1 draft"
  (same declared facts as the BTC bundle, which passed 15/15).
  Bundle warnings to know: 12 of 59 usage rows attached (47 pre-build left
  out, expected); 0 rows for the 2 subagent sessions (expected until they
  complete); BTC sessions 8dc1caff/ee019a8b auto-left-out (pre-opening);
  1 credential + emails/paths/usernames redacted by bundle.
- Kit: ~/workspace/makefun/news-image-20261119-kit/ (RULES.txt read in full).

## Friday finalization checklist (Fri 20 Nov 19:30 WIB cron)
1. Read this file + RULES.txt "Enter" step 4 (badges/About) + the custom.github
   CONNECTOR.md before touching anything. Do NOT touch GTA/BTC dirs.
2. Refresh the story list with the FULL day's news: Shenzhen summit outcome,
   ICJ verdict, Anthropic first-trade/closing price, Thune decision, APEC
   Declaration (only if confirmed), late breakers. Verify the 4 CANDIDATE
   briefs (McDonald's ruling date, Indonesia rain, California storm, Brand
   deactivation) — drop any that fail verification. Keep every story dated
   19 Nov; add new traps to the DATE CHECK box if new ones surface. Edit
   stories.json (and the stat strip in generate.mjs if counts change).
3. Re-render: `npm run build && npm run render`. VIEW entry.png and check
   legibility/layout (no clipped text — use /tmp/measure.cjs if needed).
   Verify determinism (two main.ts runs byte-identical) + size/dimensions.
4. Update README.md: add the three live make.fun badges (see RULES.txt
   Enter step 4 for exact URLs incl. the repo's rank.svg/reward.svg) + a
   link to a make.fun page; remove the "Draft" status paragraph.
5. Create the public GitHub repo under basahhmemekk7-ai (after opening —
   creating Friday satisfies this) via the custom.github connector
   (bin/github.py; read its CONNECTOR.md; uploads via Contents API, one
   commit per file). Suggested name: news-image-20261119. Set GitHub About:
   website on make.fun + topic `makefun` (github.py has no set-about
   command — use the GitHub API directly). Push all repo files (incl.
   .makefun/owner.json, LICENSE, README with badges).
6. Re-pull Muse usage rows (see above) into the dev dir. Rebuild the FINAL
   bundle from a CLEAN tree at the final commit (same flags as the draft
   bundle; new --notes; new --out transcripts.tar.gz). Re-run kit check —
   must be 0 failed.
7. Submit ONCE: `node cli/makefun.mjs submit --competition
   news-image-20261119 --repo-url https://github.com/basahhmemekk7-ai/<repo>
   --commit <sha> --title "The World in One Day" --bundle transcripts.tar.gz`
   (confirm flags via `submit --help` first). Payout pinning still
   undecided — decide at submit time if asked (agent wallet vs Basahh's own
   wallet). Report the submission + dev-heat result to Basahh.
8. If anything blocks Friday, the DRAFT (this HEAD) is submission-quality
   as-is — but the 3 heroes would lack outcomes, so prefer the update.

## Boundaries (standing)
Free entry only; no bets; no spending; never print keypair/API key/PAT/
signature; never sign a merge; keep secrets out of code and transcripts.
