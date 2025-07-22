import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../../pagescss/UpdateInventoryPage.css"; // Import the CSS file

const UpdateMydataPage = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [item, setItem] = useState({ item: "", qty: 0, status: "" });

  // Fetch the item data based on the ID
  useEffect(() => {
    console.log("Fetching item with ID:", id); // Log the ID
    fetch(`http://localhost:3000/mydata/${id}`)
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
      const response = await fetch(`http://localhost:3000/mydata/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      // Navigate back to the MyData list after successful update
      navigate("/mydata");
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
      <h2>Update MyData Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            name="item"
            value={item.item}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="qty"
            value={item.qty}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={item.status}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/mydata")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateMydataPage;
