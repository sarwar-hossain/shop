import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import PropTypes from 'prop-types';

function NoteSubjectTopics({ subject }) {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/pdfs", {
          method: "GET",
        });
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const filteredPdfs = data.filter(pdf => 
          pdf.type === "note" && pdf.subject === subject
        );
        setPdfs(filteredPdfs); 
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPdfs();
  }, [subject]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="subject-topics-page">
      <header className="subject-header formula-header">
        <div className="header-content">
          <div className="subject-icon" aria-hidden="true">
            <FaCalculator />
          </div>
          <div>
            <h1>{subject} formulas</h1>
          </div>
        </div>
      </header>

      <div className="topics-container">
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => (
            <Link 
              key={pdf._id}
              to={`/pdf-viewer/${encodeURIComponent(pdf.pdfPath)}`}
              className="link"
            >
              <div className="topic-card">
                <div className="topic-header">
                  <h2>{pdf.name}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No formulas found for {subject}</p>
        )}
      </div>
    </div>
  );
}

NoteSubjectTopics.propTypes = {
  subject: PropTypes.string.isRequired
};

export default NoteSubjectTopics;