const documentGrid = document.getElementById("documentGrid");
const documentPdfModal = document.getElementById("documentPdfModal");
const documentPdfFrame = document.getElementById("documentPdfFrame");
const documentModalClose = document.getElementById("documentModalClose");

function getPdfUrl(filePath) {
  if (!filePath) return "";

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  return `${BASE_URL}${filePath}`;
}

function getPdfViewerUrl(pdfUrl) {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
}

async function fetchDocuments() {
  try {
    documentGrid.innerHTML = `
      <p class="document-loading">Loading reports...</p>
    `;

    const res = await fetch(API_PATHS.DOCUMENTS);
    const documents = await res.json();

    if (!res.ok) {
      documentGrid.innerHTML = `
        <p class="document-empty">${documents.message || "Documents not found"}</p>
      `;
      return;
    }

    if (!documents || documents.length === 0) {
      documentGrid.innerHTML = `
        <p class="document-empty">No reports available.</p>
      `;
      return;
    }

    renderDocuments(documents);

  } catch (error) {
    console.error("Documents fetch error:", error);
    documentGrid.innerHTML = `
      <p class="document-empty">Server error while loading reports.</p>
    `;
  }
}

function renderDocuments(documents) {
  documentGrid.innerHTML = "";

  documents.forEach((pdf) => {
    const pdfUrl = getPdfUrl(pdf.file);

    const card = document.createElement("div");
    card.className = "document-card";

    card.innerHTML = `
      <div class="document-card-content">
        <div class="document-pdf-icon">
          <i class="fa-solid fa-file-pdf"></i>
        </div>

        <h3 class="document-name">${pdf.name || "Report Document"}</h3>

        <div class="document-actions">
          <button class="document-action-btn document-view-btn" title="View PDF">
            <i class="fa-solid fa-eye"></i>
          </button>

          <a 
            class="document-download-btn" 
            href="${pdfUrl}" 
            download="${pdf.name || "report.pdf"}" 
            target="_blank"
            title="Download PDF"
          >
            <i class="fa-solid fa-download"></i>
          </a>
        </div>
      </div>
    `;

    card.querySelector(".document-pdf-icon").addEventListener("click", () => {
      openDocumentPdfModal(pdfUrl);
    });

    card.querySelector(".document-view-btn").addEventListener("click", () => {
      openDocumentPdfModal(pdfUrl);
    });

    documentGrid.appendChild(card);
  });
}

function openDocumentPdfModal(pdfSrc) {
  documentPdfFrame.src = getPdfViewerUrl(pdfSrc);
  documentPdfModal.classList.add("active");
}

function closeDocumentPdfModal() {
  documentPdfModal.classList.remove("active");
  documentPdfFrame.src = "";
}

documentModalClose.addEventListener("click", closeDocumentPdfModal);

documentPdfModal.addEventListener("click", (e) => {
  if (e.target === documentPdfModal) {
    closeDocumentPdfModal();
  }
});

fetchDocuments();