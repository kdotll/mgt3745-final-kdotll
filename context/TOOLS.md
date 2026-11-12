# TOOLS.md

| Tool | Role | Boundary crossed | Where the key lives | Service or model | Checked against vendor page | Owner |
|---|---|---|---|---|---|---|
| Cloudflare Workers | Compute & Edge API | Browser -> Worker | None (Edge execution) | Workers Bundled (Free) | 11-09-2026 | Kenneth Riley II |
| Cloudflare D1 | Relational Storage | Worker -> D1 | `wrangler.toml` binding | SQLite Edge DB (Free) | 11-09-2026 | Kenneth Riley II |
| Google Gemini API | AI Gateway Proxy | Worker -> Gemini | `GEMINI_API_KEY` (Worker Secret) | `gemini-2.5-flash` | 11-09-2026 | Kenneth Riley II |
| GitHub | Version Control & Hosting | Local -> GitHub | SSH / Codespaces Token | GitHub Free | 11-09-2026 | Kenneth Riley II |
| Bolt.new | UI Scaffolding Prototype | Browser -> Bolt | Session Auth | Bolt Free Tier | 10-15-2026 | Kenneth Riley II |

## Trust Boundaries
Every service in the table above is a Trust Boundary crossing. One row per external service this repository depends on. Never put a credential in this file—a key, token, or password anywhere in the repository is graded as a security failure regardless of the rest.

## Service Audit & Switch Triggers

### Cloudflare Workers & D1
- **Service:** Cloudflare Workers + D1
- **Status:** Trusted with credentials
- **Live Crossing:** Included (candidate submissions, IP address requests, timestamped logs, edge runtime logs)
- **Limits & Pricing:** Cloudflare dashboard verifies 100,000 daily requests, 10ms CPU time per invocation, 500 MB D1 storage, and 5 million rows read per day on the Free plan (`$0/mo`).
- **Exit Cost & Portability:** Low (`~2-4 hours`). Standard Web Fetch API request/response patterns and standard SQL queries allow porting to Deno Deploy, Vercel Edge Functions, or a standalone Node.js + SQLite server without changing frontend contracts.

### Google Gemini API (via AI Gateway)
- **Service:** Google Gemini (`gemini-2.5-flash`)
- **Status:** Trusted with credentials
- **Live Crossing:** Restricted (only invoked when optional fallback parsing is enabled; never receives unredacted candidate PII in core deterministic mode)
- **Limits & Pricing:** Free tier rate limits (15 RPM / 1,500 RPD) verified via Google AI Studio documentation (`$0/mo`).
- **Exit Cost & Portability:** Low (`~1 hour`). Routed through Cloudflare AI Gateway; swapping to another OpenAI-compatible provider or local deterministic regex parser requires updating a single endpoint URL and worker secret.

### GitHub
- **Service:** GitHub
- **Status:** Trusted with credentials
- **Live Crossing:** Included (source code, commit history, developer configuration)
- **Limits & Pricing:** GitHub account session stores repositories in public/private repos (`$0/mo`).
- **Exit Cost & Portability:** Low (`~1 hour`). Standard Git repository; trivial to mirror to GitLab or Bitbucket via `git remote`.

### Bolt.new
- **Service:** Bolt.new
- **Status:** Trusted without credentials (used for initial HTML/CSS layout prototyping only)
- **Limits & Pricing:** Free web tier session limits (`$0/mo`).
- **Exit Cost & Portability:** Zero (`0 hours`). Static HTML/CSS/JS output lives directly in this repository with no ongoing runtime dependency on Bolt.

## Switch Triggers
We re-evaluate a row when:
- Daily request volume approaches 80% of the Cloudflare Free tier ceiling (`80,000 requests/day`) or D1 storage exceeds `400 MB`.
- A vendor changes pricing, rate limits, or terms of service.
- A dependency shows no commits or security maintenance for more than 12 months.