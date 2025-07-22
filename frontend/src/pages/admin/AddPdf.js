import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./../pagescss/AddPdf.css"; // Import the CSS file

const AddPdf = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "", // Field for PDF type
    subject: "", // Field for PDF subject
    pdfFile: null, // Store the PDF file here
  });

  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, pdfFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    try {
      const formDataToSend = new FormData(); // Create a FormData object
      formDataToSend.append("name", formData.name); // Append the type
      formDataToSend.append("type", formData.type); // Append the type
      formDataToSend.append("subject", formData.subject); // Append the subject
      formDataToSend.append("pdfFile", formData.pdfFile); // Append the PDF file

      const response = await fetch("http://localhost:3000/pdfs", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });

      if (response.ok) {
        alert("PDF uploaded successfully!");
        setFormData({ name: "", type: "", subject: "", pdfFile: null }); // Reset form
        navigate("/admin/pdf"); // Redirect to PDFs page (or any other page)
      } else {
        alert("Failed to upload PDF.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    <div className="add-mydata-container">
      <h2>Upload New PDF</h2>
      <form onSubmit={handleSubmit} className="add-mydata-form">
        <label>Topic name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label>Upload PDF:</label>
        <input
          type="file"
          name="pdfFile" // Match the backend field name
          accept="application/pdf" // Allow only PDF files
          onChange={handleFileChange}
          required
        />

        <button type="submit">Upload PDF</button>
      </form>

      <button className="view-mydata-button" onClick={() => navigate("/admin/pdf")}>
        View PDFs
      </button>
    </div>
  );
};

export default AddPdf;