# EVALS.md

## Riskiest Assumption (RAT)
Campus recruiters screening a large volume of engineering applications per role will trust a deterministic 4-criterion knockout gate and plain-text execution highlights over ATS keyword-density match scores, reducing initial candidate triage review time without losing qualified hands-on candidates.

## Prediction Stake (committed before the first build)
- **Tight:** 100% pass rate (4/4 deterministic knockout test assertions passing on identical duplicate candidate inputs with 0ms variance in verdict output).
- **Loose:** Determinism and server-side validation will pass cleanly on the first implementation, whereas edge-case malformed inputs, like empty strings vs. whitespace-only strings or boundary graduation years, will fail at least one initial validation test until input normalization is tightened.
- **Open:** Does surfacing contextual project execution verbs alongside deterministic knockout badges actually reduce recruiter triage time per candidate during live observation, or do recruiters still open the raw PDF to double-check?

## Code evals
| Row | Test file | Result | Date |
|---|---|---|---|

## Judgment evals
| Item | Grader 1 | Grader 2 | Agree? |
|---|---|---|---|

## Error log (most frequent first)
| Failure | Frequency | First seen | Fixed in |
|---|---|---|---|

## RAT verdict
Untested. (Committed prior to evaluation runs; will be resolved beneath with empirical test and user observation evidence without modifying the RAT above.)

## Production verdict
Pending Module 12 live user observation against Outcome (15–25s baseline triage reduction), Leading Indicator (100% deterministic reproducibility), and Guardrail (zero unvalidated writes or leaked errors).
