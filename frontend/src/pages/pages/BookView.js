import { useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Fixed import
import './../../pagescss/PDFViewer.css';

function PDFViewer() {
  const { id } = useParams();
  const pdfUrl = `${process.env.PUBLIC_URL}/pdfs/${id}`;

  useEffect(() => {
    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('PDF not found');
        }
        return response.blob();
      })
      .catch(err => {
        console.error('PDF loading error:', err);
      });
  }, [pdfUrl]);

  return (
    <div className="pdf-container">
      <div className="pdf-viewer">
        <iframe
          title="PDF Viewer"
          src={`${pdfUrl}#toolbar=0&navpanes=0`}
          className="pdf-iframe"
        />
      </div>
    </div>
  );
}

export default PDFViewer;