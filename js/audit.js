const auditDocumentGrid = document.getElementById("auditDocumentGrid");
const auditDocumentPdfModal = document.getElementById("auditDocumentPdfModal");
const auditDocumentPdfFrame = document.getElementById("auditDocumentPdfFrame");
const auditDocumentModalClose = document.getElementById("auditDocumentModalClose");

function removePdfExtension(fileName) {
  return fileName.replace(/\.pdf$/i, "");
}

function getAuditPdfUrl(filePath) {
  if (!filePath) return "";

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  return `${BASE_URL}${filePath}`;
}

function getAuditPdfViewerUrl(pdfUrl) {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
}

async function fetchAuditDocuments() {
  try {
    auditDocumentGrid.innerHTML = `
      <p class="document-loading">Loading audit documents...</p>
    `;

    const res = await fetch(API_PATHS.AUDIT_DOCUMENTS);
    const documents = await res.json();

    if (!res.ok) {
      auditDocumentGrid.innerHTML = `
        <p class="document-empty">${documents.message || "Audit documents not found"}</p>
      `;
      return;
    }

    if (!documents || documents.length === 0) {
      auditDocumentGrid.innerHTML = `
        <p class="document-empty">No audit documents available.</p>
      `;
      return;
    }

    renderAuditDocuments(documents);

  } catch (error) {
    console.error("Audit documents fetch error:", error);
    auditDocumentGrid.innerHTML = `
      <p class="document-empty">Server error while loading audit documents.</p>
    `;
  }
}

function renderAuditDocuments(documents) {
  auditDocumentGrid.innerHTML = "";

  documents.forEach((pdf) => {
    const pdfUrl = getAuditPdfUrl(pdf.file);

    const card = document.createElement("div");
    card.className = "document-card";

    card.innerHTML = `
      <div class="document-card-content">
        <div class="document-pdf-icon">
          <i class="fa-solid fa-file-pdf"></i>
        </div>

        <h3 class="document-name">${removePdfExtension(pdf.name || "Audit Document")}</h3>

        <div class="document-actions">
          <button class="document-action-btn document-view-btn" title="View PDF">
            <i class="fa-solid fa-eye"></i>
          </button>

          <a 
            class="document-download-btn" 
            href="${pdfUrl}" 
            download="${pdf.name || "audit-document.pdf"}" 
            target="_blank"
            title="Download PDF"
          >
            <i class="fa-solid fa-download"></i>
          </a>
        </div>
      </div>
    `;

    card.querySelector(".document-pdf-icon").addEventListener("click", () => {
      openAuditDocumentPdfModal(pdfUrl);
    });

    card.querySelector(".document-view-btn").addEventListener("click", () => {
      openAuditDocumentPdfModal(pdfUrl);
    });

    auditDocumentGrid.appendChild(card);
  });
}

function openAuditDocumentPdfModal(pdfSrc) {
  auditDocumentPdfFrame.src = getAuditPdfViewerUrl(pdfSrc);
  auditDocumentPdfModal.classList.add("active");
}

function closeAuditDocumentPdfModal() {
  auditDocumentPdfModal.classList.remove("active");
  auditDocumentPdfFrame.src = "";
}

auditDocumentModalClose.addEventListener("click", closeAuditDocumentPdfModal);

auditDocumentPdfModal.addEventListener("click", (e) => {
  if (e.target === auditDocumentPdfModal) {
    closeAuditDocumentPdfModal();
  }
});

fetchAuditDocuments();