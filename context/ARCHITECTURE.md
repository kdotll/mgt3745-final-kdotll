# ARCHITECTURE.md

```mermaid
flowchart LR
  Browser["Browser (Web Pages: index.html)"]
  Worker["Cloudflare Worker (Edge API)"]
  D1[("Cloudflare D1 (SQLite)")]
  Browser -->|POST /entries, GET /entries| Worker
  Worker <-->|Parameterized SQL .bind()| D1
```

## Decisions
- **ADR-001 (Stack & Build Gate):** Build static HTML/CSS/JS frontend + Cloudflare Worker edge API + D1 SQLite storage; delegate initial layout scaffolding to Bolt.new, keeping deterministic knockout logic in house. See `docs/ADR-001.md`.
- **ADR-002 (Persistence Migration):** Migrated candidate evaluation persistence from browser `localStorage` to Cloudflare D1 to survive cleared browser caches and support multi-recruiter audit review.

## Trust boundary
- **Crosses Browser -> Worker:** Candidate qualification inputs (name, degree discipline, graduation year, work authorization, coursework status) over HTTPS POST/GET requests.
- **Crosses Worker -> D1:** Validated, parameterized SQL records stored in Cloudflare D1 under Cloudflare's Standard Service Terms.
- **Never Crosses:** Raw secrets (`GEMINI_API_KEY`, Cloudflare API tokens) never enter client-side bundles or Git commits. Candidate PII is never sent to third-party public AI model training endpoints.

## The Gate: HW7 rerun
Where should entries live now that they must survive a cleared cache?

| Option | Build (Worker + D1) | Buy (Hosted SaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|
| Time to working | 5 (15) | 3 (9) | 5 (15) |
| Cost over 1 year | 5 (20) | 1 (4) | 2 (8) |
| Reversibility | 5 (10) | 2 (4) | 1 (2) |
| Fits team | 5 (10) | 4 (8) | 3 (6) |
| Fit to spec | 5 (10) | 2 (4) | 3 (6) |
| Total (out of 65) | **65** | **29** | **37** |

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Accepted  
**Supersedes:** ADR-001  

### Context
HW3 proved client-side evaluation speed but failed multi-user and persistence constraints: data could not survive a cleared cache or follow a recruiter across workstations. Evaluated candidate records must now leave the browser.

**Crossing Statement:** Evaluated candidate records (name, degree, graduation year, work authorization, relocation status, and eligibility verdict) cross from the user's browser over HTTPS to Cloudflare Workers and D1 database under Cloudflare's Standard Service Terms (free tier), with Kenneth Riley II accountable for schema integrity, credential protection, and student data privacy.

### Decision
Build and deploy a serverless edge endpoint using Cloudflare Workers and Cloudflare D1 SQLite database to ingest, validate, and store candidate evaluation records. The client application communicates exclusively via `GET /entries` and `POST /entries`.

### Alternatives considered
* **Buy (Hosted BaaS - Airtable/Firebase):** Scored 65. Discarded due to proprietary API lock-in, recurring cost tiers after initial quotas, and lack of granular inspectability into database boundaries.
* **Delegate (AI Builder - Bolt.new/v0):** Scored 76. Discarded due to lack of local inspectability, unvetted server-side code generation, and uncontrolled cloud deployment endpoints.

### Consequences
* **Positive:** Candidate records persist across device reloads, browser cache purges, and different recruiter workstations.
* **Negative (What got harder):** Network latency and connectivity failures must now be handled asynchronously. If Cloudflare or the network drops, the application cannot save offline without explicit caching layers. Server-side validation errors (400/500) require visual user feedback without throwing console errors.

### Revisit trigger
Revisit this decision when a second user role (e.g., student applicant direct portal) requires authenticated session cookies, role-based access control, or per-user data isolation.

---

## ADR-001: Store entries in localStorage

**Status:** Superseded by ADR-002

### Title and date:
ADR-001: Client-Side Vanilla JavaScript and LocalStorage for Candidate Knockout Intake (2026-09-17)

### Status:
Accepted

### Door / concrete acquisition and execution choice:
Build — Hand-built implementation using native HTML5, vanilla JavaScript, and browser `localStorage` running in a local browser environment.

### Context:
`FEATURES.md` defines Feature F-02 (Deterministic Operational Knockout Gate), requiring the system to evaluate four strict candidate constraints (graduation date window, degree program, U.S. work authorization, and relocation readiness) in under 2.0 seconds.

### Decision:
Build the candidate knockout intake form and list view directly using semantic HTML5, vanilla CSS, and client-side JavaScript adhering strictly to the load-save-render cycle with browser `localStorage`, rejecting external UI frameworks and hosted SaaS form builders.

### Consequences and revisit trigger:
* **Positive consequences:** Execution latency is under 50ms, easily beating the 2.0-second EARS acceptance limit. Zero out-of-pocket cost and zero external dependencies or API keys. 100% inspectable and transparent code logic for grading and verification.
* **Negative consequences:** Fails to persist candidate data across different devices or browsers because `localStorage` is isolated to the local client. Does not support concurrent multi-user recruiter workflows.
* **Revisit trigger:** Revisit this decision in Module 4 when a shared backend database and authentication layer are introduced to support multi-user persistence.