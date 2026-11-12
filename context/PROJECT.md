# PROJECT.md

## Problem
In advising students at the career center on co-op and internship searches, qualified engineering students with rigorous hands-on technical, CAD, and manufacturing experience are routinely rejected by automated corporate applicant tracking systems (ATS) before a human ever reviews their file. This failure stems not from a lack of engineering competence, but from corporate recruiting teams being overwhelmed by thousands of online submissions and resorting to aggressive keyword-density filters that mistake vocabulary frequency for verified technical ability. Because there is no mathematical threshold for an objectively "optimized" resume and intervening directly influences student career outcomes, candidate screening remains a wicked business problem.

### Wickedness Test  

- **No stopping rule:** You can endlessly tweak bullet points, reword verbs, and swap word phrases, but there's no clear moment where a resume is 100% done or objectively optimized for ATS.
- **Solutions are good or bad rather than true or false:** There’s no logically true or false resume, no mathematical threshold that says a resume will get you an interview or job. Applicant Tracking Systems may provide comparison scores, but they say if resumes are a good or bad match to the job description.
- **May be a symptom of another problem:** A high rejection rate at the screening stage could just be evidence of a larger structural issue of recruiting teams being buried under thousands of online applications and resorting to harsh filters keyword filters to reduce volume.
- **The problem solver is liable for consequences:** If I advise a student to rewrite their experiences around a specific angle or writing style, I would be liable for directly impacting whether they secure competitive interviews, offers, or maintain career trajectories.

**Verdict:** This is a wicked problem because everyone's hiring expectations are different, there is no single correct resume to submit for a job that can be proven to pass ATS, and intervening carries real-world consequences for student careers

## Reframe
* **Original Framing:** Engineering students lack the specialized resume-writing skills required to tailor technical keywords to match automated ATS job description requirements.
* **The Reframe (Stakeholder Shift):** Corporate recruiting teams rely on blunt screening filters because they are buried under thousands of online applications and cannot realistically evaluate each portfolio by hand. The real bottleneck is a broken filtering workflow that treats keyword density as a proxy for engineering competence to artificially shrink applicant volume.
* **Why the Reframe is the Better Problem:** Treating this solely as candidate incompetence ignores why the barrier exists and leads to superficial resume keyword-stuffing tools. Focusing on recruiter triage constraints targets the root cause: building an auditable, deterministic qualification gate that verifies technical credentials without relying on keyword games.

## Value proposition
* **What we will meet better than alternatives:**
  * Deterministic, auditable qualification checks (accredited degree discipline, graduation timeline, work authorization status, and core engineering coursework verification) that run identically every time.
  * Instant, transparent pass/fail feedback for applicants that specifies exact knockout reasons rather than silent ATS rejection.
  * Edge-authoritative validation that eliminates recruiter manual scanning for non-negotiable compliance criteria.
* **What we deliberately leave alone:**
  * We deliberately leave alone automated AI resume rewriting, ghostwriting, and synthetic keyword insertion into student bullet points.
  * We deliberately leave alone subjective portfolio grading, candidate ranking algorithms, and black-box fit scores.

## Success measures
- Outcome: Eliminate keyword-based rejection for compliant engineering applicants by replacing blunt ATS filters with an auditable qualification gate, reducing initial candidate triage review time from 15–25 seconds of manual resume scanning to an instant, deterministic verdict.
- Leading indicator: 100% triage reproducibility on test suites before December 14: running the same candidate profile twice across our evaluation gate produces identical eligibility verdicts in sub-50ms execution.
- Guardrail: Zero unvalidated candidate records written to persistent storage; zero internal server errors, database exceptions, or stack traces leaked to applicants during knockout evaluation.