# CLAUDE.md

Always-on instructions for any agent working in this repository. Read `STANDARDS.md` for the human version; this file restates it as rules an agent follows without asking.

## Read First
`PROJECT.md`, `FEATURES.md`, `ARCHITECTURE.md`, `STANDARDS.md`, `TOOLS.md`, `STYLE.md`, then the current page files.
Do not read `USERS.md` unless asked.

## What You May Do
- `CLAUDE.md` itself is never edited after it is accepted; it is superseded.
- Edit code and tests inside `src/`, `worker/`, and `evals/` to fulfill `FEATURES.md` acceptance criteria.
- Draft and update documentation in `docs/` (`ADR-001.md`, `DDR-LOG.md`, `SOURCING-AUDIT.md`).

## Secrets and Data
- Never place an API key, token, or secret in client code or commit it to this repository.
- Keys live in Worker secrets only (e.g., `GEMINI_API_KEY` via `wrangler secret put`).
- Use synthetic data unless `EVALS.md` says otherwise.

## Scope
- Do only what the rows in `FEATURES.md` say. Do not add authentication, accounts, dark mode, or any feature `FEATURES.md` does not name.

## Hard Rules
- Never use `innerHTML` with user input; use `textContent` and safe DOM manipulation (`replaceChildren`, `createElement`).
- Never concatenate strings into SQL; always use `.bind()` on parameterized D1 queries.
- Never add an external dependency or tool without adding a documented row to `TOOLS.md` and `docs/SOURCING-AUDIT.md`.
- Keep HTML, CSS, and JS in separate files; never write inline styles or inline `onclick` attributes.
- Handle failed requests and network errors visibly on the page (`textContent`). Never throw unhandled errors to the console.
- No `console.log` in committed code; remove temporary debugging statements before committing.
- Prefer the boring choice. Make any innovation you spend in an ADR.
- Small diffs. One concern per commit. Explain why in the commit message.

## When Unsure
Ask, in a comment or in the chat, rather than guessing. Say what you could not verify.

## Accountability
You may be Responsible or Consulted. A named person is always Accountable.