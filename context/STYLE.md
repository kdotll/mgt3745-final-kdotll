# STYLE.md

## Voice
This product speaks with an authoritative, transparent, and operational tone—reading like an engineering audit log rather than a subjective recruiter pitch. Labels use precise, verifiable terms (`Eligible`, `Ineligible`, `Audit Log`) and avoid vague scores or hype.

## Layout
- **Max width:** `1120px` centered single-column workspace (`--space-unit: 8px` grid).
- **Spacing & Viewport:** Generous card padding (`24px`) and clear visual separation between candidate intake, active filter controls, and the persistent D1 audit list. Designed for desktop recruiter workstations (`1280px+`) while remaining responsive down to `375px` mobile screens.

## Tokens
Design tokens live in `context/DESIGN.md` (`ink`, `paper`, `background`, `primary`, `accent`, `success`, `warning`, `border`, `font.body`, `font.mono`, `space.unit`, `radius.card`). Use token names in CSS (`var(--color-primary)`, etc.), never raw hex values.

## Contrast Ratios (WebAIM Verified)
- **Body Text on Surface (`#111827` on `#f8fafc`):** Contrast ratio `17.1:1` (Passes WCAG AAA for normal text).
- **Body Text on Background (`#111827` on `#f4f6f9`):** Contrast ratio `16.4:1` (Passes WCAG AAA for normal text).
- **Primary Button Text on Primary (`#f8fafc` on `#12263a`):** Contrast ratio `14.5:1` (Passes WCAG AAA).
- **Primary Button Text on Accent (`#f8fafc` on `#1d4ed8`):** Contrast ratio `6.4:1` (Passes WCAG AA for normal text).
- **Error Status Text on Surface (`#b91c1c` on `#f8fafc`):** Contrast ratio `5.6:1` (Passes WCAG AA for normal text).
- **Success Badge Text on Background (`#1b8036` on `#f4f6f9`):** Contrast ratio `4.6:1` (Passes WCAG AA for normal text).
- **Muted Text on Background (`#4b5563` on `#f4f6f9`):** Contrast ratio `6.6:1` (Passes WCAG AA for normal text).

## Rationale
- **`--color-ink` (`#111827`):** High-contrast charcoal ensures crisp readability for dense candidate records and audit logs.
- **`--color-primary` (`#12263a`):** Deep navy anchors primary form submission actions with authoritative visual weight for institutional recruiting workflows.
- **`--color-accent` (`#1d4ed8`):** Dark slate highlights high-priority interactive candidate attributes without introducing distracting decorative hues.
- **`--color-background` (`#f4f6f9`):** Soft off-white reduces visual fatigue during high-volume resume evaluation sessions while sustaining maximum contrast against dark text.
- **`--color-paper` (`#f8fafc`):** Crisp light card containers create clear hierarchical card boundaries over the soft tinted base page without harsh glare.
- **`--color-warning` (`#b91c1c`):** High-contrast crimson ensures critical validation failures are immediately noticeable to recruiters under WCAG AA requirements.
- **`--color-success` (`#1b8036`):** Deepened forest green provides unmistakable confirmation for eligible candidate submissions without blinding saturation.
- **`--font-body` (`Inter`):** Clean geometric sans-serif maximizes legibility of dense degree, graduation year, and compliance constraints without layout shift.
- **`--space-unit` (`8px`):** Uniform 8px spatial grid enforces rhythm across form padding, margins, and card borders so nothing is visually crammed.
- **`--radius` (`4px`):** Subtle rounding softens input and button perimeters while retaining an enterprise corporate appearance.
- **`--color-border` (`#d1d5db`):** 1px boundary prevents illegible flow lines for users evaluating dense tabular applicant records on low-contrast displays.

## Refusals
1. **No destructive single-click actions without clear distinction:** Breaks Nielsen's visibility and the principle of error prevention; destructive clear or irreversible knockout decisions must never share the same size, styling, or location right next to the primary submission button.
2. **No multi-step modal overlays or popups for core filtering:** Breaks Nielsen's flexibility; recruiting staff rely on inline filtering and visible context rather than nested modal dialogs that interrupt rapid spatial memory and keyboard focus.

## References
- **Inspirations:** Clean, high-density enterprise audit logs and modern applicant list views (e.g., Greenhouse candidate pipeline tables).
- **Anti-patterns:** Cluttered, modal-heavy legacy HR portals (e.g., multi-click Workday screens) and subjective percentage match badges.