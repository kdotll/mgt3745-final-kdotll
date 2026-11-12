// app.js
// Behavior and data. Integrates Feature F-03 (Candidate Search & Status Filter).

const API = "https://mgt3745-final.kdotll.workers.dev";

// Form and UI elements
const form = document.getElementById("candidate-form");
const nameInput = document.getElementById("candidate-name");
const degreeSelect = document.getElementById("degree-program");
const yearSelect = document.getElementById("grad-year");
const workAuthSelect = document.getElementById("work-auth");
const relocationSelect = document.getElementById("relocation");
const candidateList = document.getElementById("candidate-list");
const statusDiv = document.getElementById("save-status");
const emptyState = document.getElementById("empty-state");

// F-03 Filter Controls
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");

// Master candidate array fetched from Cloudflare D1
let allCandidates = [];

// DOM safe status messaging (No console throwing)
function showError(message) {
  if (statusDiv) {
    statusDiv.textContent = message;
    statusDiv.style.color = "var(--color-warning)";
  }
}

function showSuccess(message) {
  if (statusDiv) {
    statusDiv.textContent = message;
    statusDiv.style.color = "var(--color-success)";
  }
}

function clearStatus() {
  if (statusDiv) {
    statusDiv.textContent = "";
  }
}

// 4-Rule Deterministic Knockout Gate
function evaluateEligibility(degree, year, workAuth, relocation) {
  const isDegreeValid = degree === "Mechanical Engineering";
  const numYear = Number(year);
  const isYearValid = numYear >= 2026 && numYear <= 2028;
  const isWorkAuthValid = workAuth === "Yes";
  const isRelocationValid = relocation === "Yes";

  return isDegreeValid && isYearValid && isWorkAuthValid && isRelocationValid;
}

// F-03: Filter candidates dynamically based on search box and status dropdown
function getFilteredCandidates() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedStatus = statusFilter ? statusFilter.value : "All";

  return allCandidates.filter((candidate) => {
    const candidateName = (candidate.name || "").toLowerCase();
    const nameMatch = query === "" || candidateName.includes(query);

    const statusMatch =
      selectedStatus === "All" || candidate.status === selectedStatus;

    return nameMatch && statusMatch;
  });
}

// Render candidates safely using textContent and createElement
function renderCandidates() {
  if (!candidateList) return;

  const filtered = getFilteredCandidates();
  candidateList.replaceChildren();

  if (allCandidates.length === 0) {
    if (emptyState) {
      emptyState.textContent = "No candidate evaluations on record.";
      emptyState.style.display = "block";
    }
    return;
  }

  if (filtered.length === 0) {
    if (emptyState) {
      emptyState.textContent = "No candidates match the selected filters.";
      emptyState.style.display = "block";
    }
    return;
  }

  if (emptyState) {
    emptyState.style.display = "none";
  }

  filtered.forEach((candidate) => {
    const li = document.createElement("li");
    li.className = "candidate-item";

    const textSpan = document.createElement("span");
    const formattedYear = candidate.grad_year || candidate.gradYear;
    textSpan.textContent = `${candidate.name} (${candidate.degree}, ${formattedYear})`;

    const badge = document.createElement("span");
    badge.textContent = candidate.status;
    badge.className =
      candidate.status === "Eligible" ? "badge-eligible" : "badge-ineligible";

    li.appendChild(textSpan);
    li.appendChild(badge);
    candidateList.appendChild(li);
  });
}

// Remote Load via GET /entries
async function loadCandidates() {
  clearStatus();
  try {
    const res = await fetch(`${API}/entries`);
    if (!res.ok) {
      showError("Could not load candidate entries from server.");
      return [];
    }
    const data = await res.json();
    return data;
  } catch (err) {
    showError("Network error: Unable to connect to backend server.");
    return [];
  }
}

// Remote Save via POST /entries
async function saveCandidate(candidate) {
  clearStatus();
  try {
    const res = await fetch(`${API}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidate),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      showError(errorData.error || `Server error: failed with status ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    showError("Network error: Failed to save candidate record.");
    return false;
  }
}

// Event Listeners and Initial Load
document.addEventListener("DOMContentLoaded", async () => {
  allCandidates = await loadCandidates();
  renderCandidates();

  // F-03 Real-Time Filter Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderCandidates();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      renderCandidates();
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearStatus();

      const name = nameInput ? nameInput.value.trim() : "";
      const degree = degreeSelect ? degreeSelect.value : "";
      const gradYear = yearSelect ? yearSelect.value : "";
      const workAuth = workAuthSelect ? workAuthSelect.value : "";
      const relocation = relocationSelect ? relocationSelect.value : "";

      if (!name || !degree || !gradYear || !workAuth || !relocation) {
        showError("Please complete all candidate evaluation fields.");
        return;
      }

      const isEligible = evaluateEligibility(degree, gradYear, workAuth, relocation);
      const status = isEligible ? "Eligible" : "Ineligible";

      const candidateRecord = {
        name,
        degree,
        gradYear,
        workAuth,
        relocation,
        status,
      };

      const success = await saveCandidate(candidateRecord);
      if (success) {
        form.reset();
        showSuccess(`Candidate ${name} evaluated and saved as ${status}.`);
        allCandidates = await loadCandidates();
        renderCandidates();
      }
    });
  }
});