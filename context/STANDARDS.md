# STANDARDS.md

## Code

1. Use descriptive camelCase identifiers for functions and variables. Short conventional event/index names are acceptable when their role is obvious.
2. Separation of concerns: HTML for structure, CSS for presentation, JS for behavior and data. No inline CSS or inline event handlers.
3. User input reaches the page through `textContent`, never `innerHTML`. Dynamic containers are reset with `replaceChildren()`.
4. User values reach SQL through `.bind()`, never string concatenation or template literal injection.
5. No credentials in the repository. Not in code, not in config, not in a context file. Database IDs are addresses and may appear in `wrangler.toml`.
6. A failed request or network outage is shown to the user on the page and is never thrown in the console.
7. No stray `console.log` in committed code. Clean temporary debug logs before commit.

## Naming

- camelCase for JavaScript functions and variables.
- kebab-case for file names and CSS classes.
- UPPERCASE for environment constants and configuration keys.

## Data
- **Persistence:** Candidate evaluation records persist in Cloudflare D1 via bound SQL parameters (`ORDER BY id ASC`).
- **Privacy & Synthetic Data:** Test suites use synthetic candidate personas and mock requisition IDs. Live applicant PII is never committed to the repository or sent to public AI model training endpoints.

## Documentation

- Inline comments explain why, never what.
- Commit messages name the changed behavior and purpose.
- `README.md` stays current with each deployment.

---

## Split Test

### Test 1: Separation of Concerns (Rule 2)
* **Does this rule apply to every task in the project, or to some tasks?** Applies to every code task and file creation in the project.
* **Does it stay the same from task to task, or change?** Stays invariant across all modules.
* **If it lands in the wrong place, which failure mode does that risk?** Risk of clash and confusion if repeated or altered across individual task prompts.
* **Verdict:** This rule belongs in `CLAUDE.md`.

### Test 2: SQL Parameter Binding (Rule 4)
* **Does this rule apply to every task in the project, or to some tasks?** Applies to every backend database operation and query.
* **Does it stay the same from task to task, or change?** Stays invariant across all data persistence tasks.
* **If it lands in the wrong place, which failure mode does that risk?** Risk of poisoning if left out of persistent agent instructions, resulting in SQL injection vulnerabilities.
* **Verdict:** This rule belongs in `CLAUDE.md`.

### Test 3: No Stray console.log in Committed Code (Rule 7)
* **Does this rule apply to every task in the project, or to some tasks?** Applies to every client and server script task across the repository.
* **Does it stay the same from task to task, or change?** Stays invariant across all code edits and delegations.
* **If it lands in the wrong place, which failure mode does that risk?** Risk of context rot and noisy console outputs polluting automated grading runners if an agent omits log hygiene.
* **Verdict:** This rule belongs in `CLAUDE.md`.

---

## Colleague Test

* **Colleague:** Caleb (Peer Mechanical Engineering Student)
* **What they asked / misunderstood:** Caleb read `CLAUDE.md` and asked whether the rule "Insert user text with textContent; do not use innerHTML" meant template literals were completely prohibited, even for static table row wrappers.
* **Revision Made:** Clarified the rule in `CLAUDE.md` to state: "Never use `innerHTML` with user input. Use `textContent` and safe DOM manipulation (`replaceChildren`, `createElement`)."