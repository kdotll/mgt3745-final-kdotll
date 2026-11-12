# TOOLS.md

# Tools

| Tool | Purpose | Ring | Checked on | Limit or price | Exit |
|---|---|---|---|---|---|
| Cloudflare Workers & D1 | Edge API runtime & SQLite persistence (`mgt3745-final`) | Adopt | 2026-11-12 | Free tier: 100k req/day; 500 MB storage (`$0/mo`) | Migrate standard Fetch API routes & `.sql` dump to Deno Deploy / Turso (~3 hrs) |
| `wrangler` (`4.161.0`) | CLI & local dev/deploy toolchain (`devDependencies` only) | Adopt | 2026-11-12 | Free CLI (`$0/mo`); `0` npm audit vulnerabilities | Standard Node/Deno CLI or Cloudflare REST API (~2 hrs) |
| Node.js (`node:test`) | Built-in zero-dependency unit & eval test runner | Adopt | 2026-11-12 | Free / open-source MIT runtime (`$0/mo`) | Standard TAP/assertion runner swap (~1 hr) |
| Google Gemini API (`gemini-2.5-flash`) | Optional non-PII rubric parsing (excluded from knockout gate) | Trial | 2026-11-12 | Free tier: 15 RPM / 1,500 RPD (`$0/mo`) | Deterministic JS regex/keyword parser (~1 hr) |
| GitHub & Codespaces | Source control, commit history, & dev environment | Adopt | 2026-11-12 | Free tier (`$0/mo`) | Mirror Git remote to GitLab or Bitbucket (~1 hr) |
| Bolt.new | Static HTML/CSS layout scaffolding (prototyping only) | Assess | 2026-11-12 | Free tier daily token cap (`$0/mo`) | Zero runtime dependency; static files live directly in repo (0 hrs) |

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