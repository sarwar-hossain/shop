import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../../pagescss/UpdateInventoryPage.css"; // Import the CSS file

const UpdateInventoryPage = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [item, setItem] = useState({ name: "", quantity: 0, price: 0 });

  // Fetch the item data based on the ID
  useEffect(() => {
    console.log("Fetching item with ID:", id); // Log the ID
    fetch(`http://localhost:3000/inventory/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch item");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched item data:", data); // Log the fetched data
        setItem(data);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/inventory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      // Navigate back to the inventory list after successful update
      navigate("/inventory");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div className="update-container">
      <h2>Update Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) =>
              setItem({ ...item, quantity: parseInt(e.target.value, 10) })
            }
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={(e) =>
              setItem({ ...item, price: parseFloat(e.target.value) })
            }
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateInventoryPage;