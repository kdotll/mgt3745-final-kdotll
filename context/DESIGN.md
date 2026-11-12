---
tokens:
  color:
    ink: { $type: color, $value: "#111827" }
    paper: { $type: color, $value: "#f8fafc" }
    background: { $type: color, $value: "#f4f6f9" }
    primary: { $type: color, $value: "#12263a" }
    accent: { $type: color, $value: "#1d4ed8" }
    success: { $type: color, $value: "#1b8036" }
    warning: { $type: color, $value: "#b91c1c" }
    border: { $type: color, $value: "#d1d5db" }
  font:
    body: { $type: fontFamily, $value: ["Inter", "Helvetica", "system-ui"] }
    mono: { $type: fontFamily, $value: ["JetBrains Mono", "monospace"] }
  space:
    unit: { $type: dimension, $value: "8px" }
  radius:
    card: { $type: dimension, $value: "4px" }
---
# Design rationale
These tokens prioritize high-contrast legibility and low visual fatigue for campus recruiters scanning a large volume of applications per requisition. Soft off-white surfaces (`#f8fafc` on `#f4f6f9`) eliminate pure-white screen glare while maintaining a 17.1:1 contrast ratio against `#111827` body text. The `warning` crimson (`#b91c1c`) appears exclusively on validation errors, network outage banners, and `Ineligible` knockout badges—never on decorative accents or secondary buttons—while `success` forest green (`#1b8036`) is reserved strictly for `Eligible` candidate badges.