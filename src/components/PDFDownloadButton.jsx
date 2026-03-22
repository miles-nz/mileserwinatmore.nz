const PDFDownloadButton = () => (
    <a
        href="/Miles Erwin-Atmore CV.pdf"
        download
        className="pdf-download-btn pdf-download-fab"
        aria-label="Download CV as PDF"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="pdf-download-icon"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <strong className="pdf-download-label">Download PDF</strong>
    </a>
);

export default PDFDownloadButton;
