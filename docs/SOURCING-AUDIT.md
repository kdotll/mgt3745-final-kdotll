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

### Evidence (each fact with its source and the date you read it)
| Dependency | Latest version and date | Maintainers or vendor | License or terms | Limits or price | Other notes | Checked on |
|---|---|---|---|---|---|---|

### Scores and Rings
| Dependency | Stability | Pricing | Institutional fit | Exit cost | Weighted | Ring | Reason in one line |
|---|---|---|---|---|---|---|---|

### Exit Plans (every critical dependency, every Trial)
| Dependency | Trigger | Substitute | Hours to swap | Tested? (date and how) |
|---|---|---|---|---|

### Changes Caused by This Audit
- <removal, pin, or replacement, with commit hash>
- <ADR amended or superseded, if any>
- <DDR lines added, if AI helped>

### Prediction Stake Resolution
<What happened, and whether the prediction held.>