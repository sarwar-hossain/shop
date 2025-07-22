import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/InventoryPage.css"; // Import the CSS file

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch inventory data
  useEffect(() => {
    fetch("http://localhost:3000/inventory")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid item ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/inventory/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setInventory(inventory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Navigate to update page
  const handleUpdateClick = (id) => {
    navigate(`/update/${id}`); // Navigate to the update page with the item ID
  };

  return (
    <div className="inventory-container">
      <h2>Inventory List</h2>
      <button className="upload-pdf-button" onClick={() => navigate("/add-inventory")}>
        Upload New Item
      </button>
      <div className="inventory-list">
        {inventory.map((item, index) => (
          <div key={index} className="inventory-item">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleUpdateClick(item._id)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;