import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/AddMydata.css"; // Import the CSS file

const AddMydata = () => {
  const [formData, setFormData] = useState({
    item: "",
    qty: "",
    image: null, // Store the selected file
  });

  const navigate = useNavigate(); // React Router navigation

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Store the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("item", formData.item);
    formDataToSend.append("qty", formData.qty);
    formDataToSend.append("image", formData.image); // Append the file

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });

      if (response.ok) {
        alert("Inventory item added successfully!");
        setFormData({ item: "", qty: "", image: null }); // Reset form
        navigate("/products"); // Redirect to products page
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

        <label>Image (Upload Image):</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Add Item</button>
      </form>

      <br />
      <button
        className="view-mydata-button"
        onClick={() => navigate("/products")}
      >
        View Mydata
      </button>
    </div>
  );
};

export default AddMydata;