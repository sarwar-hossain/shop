import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/AddInventory.css"; // Import the CSS file

const AddInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    try {
      const response = await fetch("http://localhost:3000/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Inventory item added successfully!");
        setFormData({ name: "", quantity: "", price: "" }); // Reset form
        navigate("/inventory"); // Redirect to inventory page
      } else {
        alert("Failed to add inventory item.");
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  return (
    <div className="add-inventory-container">
      <h2>Add New Inventory Item</h2>
 
      <form onSubmit={handleSubmit} className="add-inventory-form">
        <label>Item Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Item</button>
      </form>

      <br />
      <button className="view-inventory-button" onClick={() => navigate("/inventory")}>
        View Inventory
      </button>
    </div>
  );
};

export default AddInventory;