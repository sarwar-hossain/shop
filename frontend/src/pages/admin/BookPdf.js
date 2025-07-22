import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/Pdf.css"; // Import the CSS file

const BookPdf = () => {
  const [pdfs, setPdfs] = useState([]); // Initialize as an empty array
  const navigate = useNavigate(); // React Router navigation

  // Fetch PDFs from the backend
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookpdfs", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch PDFs");
        }

        setPdfs(data); // Set the list of PDFs
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, []);

  return (
    <div className="pdf-show-container">
      <h2>Uploaded PDFs</h2>
      <button className="upload-pdf-button" onClick={() => navigate("/admin/add-book-pdf")}>
        Upload New PDF
      </button>

      <div className="pdf-list">
        {pdfs.map((pdf) => (
          <div key={pdf._id} className="pdf-item">
            <h2>{pdf.book}</h2>
            <h3>{pdf.type}</h3>
            <p>{pdf.subject}</p>
            <a
              href={`http://localhost:3000${pdf.pdfPath}`} // Correctly construct the URL
              target="_blank"
              rel="noopener noreferrer"
              className="view-pdf-button"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPdf;