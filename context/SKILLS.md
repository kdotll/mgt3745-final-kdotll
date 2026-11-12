# SKILLS.md

| Skill | When it was needed | Evidence |
|---|---|---|
| Pattern: Fetch with the failure shown on the page | Whenever any call from `app.js` to the Worker failed | `src/app.js` / `index.html` |
| Delegation guidance: what to paste, what to check first | Before delegating UI layout or Worker edits to AI builders | `context/CLAUDE.md` |
| Edge API design & parameterized D1 SQL migrations | When replacing volatile `localStorage` with persistent relational storage | `worker/src/index.js` |
| Deterministic EARS acceptance test authoring | When verifying that duplicate candidate evaluations yield identical verdicts | `evals/f01.test.js` |

## Pattern: Fetch with the failure shown on the page
- **When:** Before any call from `app.js` to the Worker.
- **How:** Read `response.ok` first; on false, read `response.text()` and put it in the status element with `textContent`; wrap the call in `try/catch` for network errors; never throw to the console.
- **Evidence:** Because `localStorage` never failed, the network does (`ADR-002`).

## Delegation guidance: what to paste, what to check first
- **When:** Before delegating any task to an AI coding tool.
- **How:** Paste `PROJECT.md`, `FEATURES.md`, `ARCHITECTURE.md`, `STANDARDS.md`, `TOOLS.md`, then the current page files. One instruction line naming the files it may touch. Check first: inspect the diff's file list, then `innerHTML`, then unparameterized SQL, then whether it used the tokens.
- **Evidence:** Identified during error-analysis log reviews when unguided prompts introduced inline styles and `innerHTML`.

## Edge API design & parameterized D1 SQL migrations
- **When:** Transitioning candidate triage logs from client-side browser storage to server-side persistence.
- **How:** Define explicit schema constraints (`NOT NULL`), bind all user-supplied fields using `.bind(...)` on prepared D1 statements, and return sanitized HTTP status codes (`201`, `400`).
- **Evidence:** Implemented in `worker/src/index.js` and documented in `ADR-002`.