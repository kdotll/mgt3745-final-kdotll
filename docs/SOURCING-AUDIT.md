# Sourcing Audit

## Audit 1, November 2026

### Prediction Stake (commit before any evidence)
- **Tight:** 6 external dependencies and services audited across runtime, dev tooling, and build platforms (`Cloudflare Workers`, `Cloudflare D1`, `wrangler`, `Node.js / node:test`, `Google Gemini API`, and `Bolt.new`), with at least 4 placed in **Adopt** and 0 in **Hold**.
- **Loose:** Zero-cost edge compute, SQLite persistence, and standard Node test tooling (`Cloudflare Workers`, `Cloudflare D1`, `Node.js / node:test`) will score above 85/100 due to high stability and low exit cost, whereas external AI/scaffolding services (`Google Gemini API` and `Bolt.new`) will score lower on pricing/privacy boundaries and require strict isolation or post-scaffolding exit.
- **Open:** Does `package.json` or `worker/` pull in any transitive npm packages with restrictive licenses or undocumented runtime weight that should be pinned or removed?

### Weights (commit in their own commit, before scoring)
| Criterion | Weight | Why this weight for this project |
|---|---|---|
| Stability | 25 | Recruiter triage workflows cannot tolerate flaky runtime dependencies or breaking API changes during active campus recruiting windows. |
| Pricing predictability | 30 | As a student-built career center prototype operating on a strict `$0/mo` budget, every service must have hard, transparent free-tier limits with zero surprise overage charges. |
| Institutional fit | 25 | Candidate qualification records involve student privacy and university career center standards, requiring zero PII leakage to public AI training pipelines. |
| Exit cost | 20 | Qualification rules and D1 SQLite audit logs are the core institutional assets, so we must be able to migrate compute or storage providers in under 4 hours. |
Total: 100

### Inventory
| Dependency | Kind (package, dev package, platform, model, builder, CDN script) | Where it is recorded | Ships to users? |
|---|---|---|---|
| `wrangler` (`4.161.0`) | dev package | `package.json` (`devDependencies`), `package-lock.json` | No |
| Node.js (`node:test`, `node:assert`) | dev package (built-in runtime) | `package.json` (`scripts.test`, `scripts.test:proxy`) | No |
| Cloudflare Workers (`mgt3745-final`) | platform | `worker/wrangler.toml`, `worker/src/index.js`, `context/TOOLS.md` | Yes (edge API) |
| Cloudflare D1 (`mgt3745-entries`) | platform | `worker/wrangler.toml`, `worker/schema.sql`, `context/TOOLS.md` | Yes (database) |
| Google Gemini API (`gemini-2.5-flash`) | model / external API | `worker/wrangler.toml`, `context/TOOLS.md` | No (unused in runtime) |
| GitHub & Codespaces | platform | `.git/config`, `context/TOOLS.md` | No |
| Bolt.new | builder | `context/TOOLS.md`, `docs/DDR-LOG.md` | No (scaffolding only) |

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|---|---|---|---|---|---|---|
| `wrangler` | `4.161.0` (verified via `npx wrangler --version` & `package-lock.json`) | Cloudflare, Inc. | MIT / Apache-2.0 | Free CLI (`$0/mo`) | `npm install` added 38 packages (`npm ls --all \| wc -l` = 105 lines); `npm audit` found **0 vulnerabilities** | 2026-11-12 |
| Node.js (`node:test`) | Node v22 LTS (2026) | OpenJS Foundation | MIT License | Free / local runtime | Built-in test runner; zero third-party test packages in `package.json` | 2026-11-12 |
| Cloudflare Workers | Compatibility date `2026-11-12` (`mgt3745-final.kdotll.workers.dev`) | Cloudflare, Inc. | Cloudflare Standard Service Terms | Free tier: 100,000 req/day, 10ms CPU/req (`$0/mo`) | Verified live `GET /entries` (`HTTP 200`) and `POST /entries` (`HTTP 400`) via `curl` | 2026-11-12 |
| Cloudflare D1 | SQLite Edge DB (`6f84bd7c-96d6-4de9-810f-ab56714e474e`) | Cloudflare, Inc. | Cloudflare Standard Service Terms | Free tier: 500 MB storage, 5M rows read/day (`$0/mo`) | Parameterized `.bind()` SQLite queries in `worker/src/index.js` | 2026-11-12 |
| Google Gemini API | `gemini-2.5-flash` (configured in `worker/wrangler.toml`) | Google LLC | Google APIs Terms of Service | Free tier: 15 RPM / 1,500 RPD (`$0/mo`) | Not invoked by deterministic knockout gate; guarded by `worker/test/key.test.js` | 2026-11-12 |
| GitHub & Codespaces | GitHub Cloud (2026) | Microsoft / GitHub, Inc. | GitHub Terms of Service | Free tier: unlimited repos + monthly Codespaces hours (`$0/mo`) | Hosts `kdotll/mgt3745-final-kdotll` | 2026-11-12 |
| Bolt.new | Web Builder (2026) | StackBlitz, Inc. | StackBlitz Terms of Service | Free tier: daily token cap (`$0/mo`) | Used strictly for initial static HTML/CSS scaffolding; zero runtime dependency | 2026-11-12 |

### Scores and Rings
*(Weighted formula: `0.25*Stability + 0.30*Pricing + 0.25*Institutional fit + 0.20*Exit cost`)*

| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|---|---|---|---|---|---|---|---|
| Node.js (`node:test`) | 100 | 100 | 100 | 100 | **100** | **Adopt** | Zero-dependency built-in test runner with MIT license and instant portability. |
| Cloudflare Workers | 95 | 95 | 90 | 85 | **92** | **Adopt** | Standard Web Fetch API edge compute at `$0/mo` with 100k daily request headroom. |
| Cloudflare D1 | 90 | 95 | 90 | 90 | **91.5** | **Adopt** | Relational SQLite storage with simple `.sql` dump portability and zero cost. |
| GitHub & Codespaces | 95 | 95 | 95 | 95 | **95** | **Adopt** | Industry-standard Git hosting with 1-command remote migration. |
| `wrangler` (`4.161.0`) | 90 | 100 | 90 | 85 | **92** | **Adopt** | Official Cloudflare CLI (`0` audit vulnerabilities) isolated to `devDependencies`. |
| Google Gemini API | 85 | 85 | 70 | 85 | **81** | **Trial** | Reserved for optional non-PII parsing only; core knockout logic stays deterministic. |
| Bolt.new | 75 | 80 | 80 | 95 | **82** | **Assess** | Used strictly for initial layout scaffolding; zero ongoing runtime dependency. |

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|---|---|---|---|---|
| Cloudflare Workers | Daily traffic exceeds 80,000 req/day or free-tier CPU limits tighten | Deno Deploy or Node.js Hono/Express server | 3 hours | Verified on 2026-11-12 that `worker/src/index.js` uses only standard Web `Request`/`Response` APIs with zero proprietary Worker runtime imports |
| Cloudflare D1 | Database storage exceeds 400 MB (80% of 500 MB free cap) | Turso (libSQL) or local SQLite (`better-sqlite3`) | 2 hours | Verified on 2026-11-12 via `worker/schema.sql` and `curl https://mgt3745-final.kdotll.workers.dev/entries` JSON export that all queries use standard ANSI SQLite syntax |
| Google Gemini API (Trial) | Free tier rate limit (15 RPM) throttles requests or privacy terms change | Deterministic regex/keyword-pair parser in vanilla JS | 1 hour | Verified on 2026-11-12 that `evaluateEligibility()` in `app.js` and `/entries` in `worker/src/index.js` execute 100% without LLM calls |

### Changes Caused by This Audit
- Generated and locked `package-lock.json` with `wrangler` (`4.161.0`) isolated to `devDependencies` (`0` runtime packages shipped to users; `0` vulnerabilities in `npm audit`).
- Kept `Google Gemini API` in **Trial** and excluded from the deterministic knockout path (`docs/ADR-001.md`, commit `06bfed6`) to protect candidate PII and guarantee reproducible verdicts.
- Confirmed `worker/wrangler.toml` holds only placeholder gateway vars (`<your account id>`) and zero committed API secrets (`25545c3`).

### Prediction Stake Resolution
**Held:** All core runtime, storage, and dev dependencies were audited. Five dependencies (`Node.js`, `Cloudflare Workers`, `Cloudflare D1`, `GitHub & Codespaces`, and `wrangler`) scored above 90/100 and landed in **Adopt**, while **0** landed in **Hold**, confirming our Tight prediction. Our Loose prediction also held—AI/scaffolding tools (`Google Gemini API` and `Bolt.new`) scored lower (81 and 82) due to rate-limit and data-boundary constraints, keeping Gemini in **Trial** rather than **Adopt**. For our Open question, running `npm install`, `npm ls --all | wc -l` (105 lines across 38 transitive dev packages), and `npm audit` (0 vulnerabilities) confirmed that `wrangler` is strictly a dev-time tool and zero third-party packages ship to end users.