import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../../pagescss/UpdateInventoryPage.css"; // Import the CSS file

const UpdateStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    roll: "",
    section: "",
    stream: "",
    college: "",
  });

  // Fetch student details by ID
  useEffect(() => {
    fetch(`http://localhost:3000/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student:", error));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      alert("Student updated successfully!");
      navigate("/student"); // Redirect to student list
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="update-container">
      <h2>Update Student Details</h2>
      <form onSubmit={handleUpdate} className="update-form">
        <label>Name:</label>
        <input type="text" name="name" value={student.name} onChange={handleChange} required />

        <label>Roll:</label>
        <input type="text" name="roll" value={student.roll} onChange={handleChange} required />

        <label>Section:</label>
        <input type="text" name="section" value={student.section} onChange={handleChange} required />

        <label>Stream:</label>
        <input type="text" name="stream" value={student.stream} onChange={handleChange} required />

        <label>College:</label>
        <input type="text" name="college" value={student.college} onChange={handleChange} required />

        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
