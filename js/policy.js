const policyPublicDocumentGrid = document.getElementById("policyPublicDocumentGrid");
const policyPublicPdfModal = document.getElementById("policyPublicPdfModal");
const policyPublicPdfFrame = document.getElementById("policyPublicPdfFrame");
const policyPublicModalClose = document.getElementById("policyPublicModalClose");

function getPolicyPublicPdfUrl(filePath) {
  if (!filePath) return "";

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  return `${BASE_URL}${filePath}`;
}

function getPolicyPublicPdfViewerUrl(pdfUrl) {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
}

async function fetchPublicPolicyDocuments() {
  try {
    policyPublicDocumentGrid.innerHTML = `
      <p class="document-loading">Loading policy documents...</p>
    `;

    const res = await fetch(API_PATHS.POLICY_DOCUMENTS);
    const documents = await res.json();

    if (!res.ok) {
      policyPublicDocumentGrid.innerHTML = `
        <p class="document-empty">${documents.message || "Policy documents not found"}</p>
      `;
      return;
    }

    if (!documents || documents.length === 0) {
      policyPublicDocumentGrid.innerHTML = `
        <p class="document-empty">No policy documents available.</p>
      `;
      return;
    }

    renderPublicPolicyDocuments(documents);

  } catch (error) {
    console.error("Public policy documents fetch error:", error);

    policyPublicDocumentGrid.innerHTML = `
      <p class="document-empty">Server error while loading policy documents.</p>
    `;
  }
}

function renderPublicPolicyDocuments(documents) {
  policyPublicDocumentGrid.innerHTML = "";

  documents.forEach((pdf) => {
    const pdfUrl = getPolicyPublicPdfUrl(pdf.file);

    const card = document.createElement("div");
    card.className = "document-card";

    card.innerHTML = `
      <div class="document-card-content">
        <div class="document-pdf-icon">
          <i class="fa-solid fa-file-pdf"></i>
        </div>

        <h3 class="document-name">${pdf.name || "Policy Document"}</h3>

        <div class="document-actions">
          <button class="document-action-btn document-view-btn" title="View PDF">
            <i class="fa-solid fa-eye"></i>
          </button>

          <a 
            class="document-download-btn" 
            href="${pdfUrl}" 
            download="${pdf.name || "policy-document.pdf"}" 
            target="_blank"
            title="Download PDF"
          >
            <i class="fa-solid fa-download"></i>
          </a>
        </div>
      </div>
    `;

    card.querySelector(".document-pdf-icon").addEventListener("click", () => {
      openPolicyPublicPdfModal(pdfUrl);
    });

    card.querySelector(".document-view-btn").addEventListener("click", () => {
      openPolicyPublicPdfModal(pdfUrl);
    });

    policyPublicDocumentGrid.appendChild(card);
  });
}

function openPolicyPublicPdfModal(pdfSrc) {
  policyPublicPdfFrame.src = getPolicyPublicPdfViewerUrl(pdfSrc);
  policyPublicPdfModal.classList.add("active");
}

function closePolicyPublicPdfModal() {
  policyPublicPdfModal.classList.remove("active");
  policyPublicPdfFrame.src = "";
}

policyPublicModalClose.addEventListener("click", closePolicyPublicPdfModal);

policyPublicPdfModal.addEventListener("click", (e) => {
  if (e.target === policyPublicPdfModal) {
    closePolicyPublicPdfModal();
  }
});

fetchPublicPolicyDocuments();