import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/AddMydata.css"; // Import the CSS file

const AddMydata = () => {
  const [formData, setFormData] = useState({
    item: "",
    qty: "",
    status: null, // Store the image file here
  });

  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, status: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    try {
      const formDataToSend = new FormData(); // Create a FormData object
      formDataToSend.append("item", formData.item);
      formDataToSend.append("qty", formData.qty);
      formDataToSend.append("status", formData.status); // Append the image file

      const response = await fetch("http://localhost:3000/mydata", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });

      if (response.ok) {
        alert("Inventory item added successfully!");
        setFormData({ item: "", qty: "", status: null }); // Reset form
        navigate("/mydata"); // Redirect to inventory page
      } else {
        alert("Failed to add inventory item.");
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  return (
    <div className="add-mydata-container">
      <h2>Add New Mydata Item</h2>
      <form onSubmit={handleSubmit} className="add-mydata-form">
        <label>Item Name:</label>
       
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          required
        />
       

        <label>Quantity:</label>
       
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          required
        />
       

        <label>Status (Upload Image):</label>
       
        <input
          type="file"
          name="status" // Match the backend field name
          accept="image/*"
          onChange={handleFileChange}
          required
        />
       

        <button type="submit">Add Item</button>

      </form>

   
      <button className="view-mydata-button" onClick={() => navigate("/mydata")}>
        View Mydata
      </button>
    </div>
  );
};

export default AddMydata;