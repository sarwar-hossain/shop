import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/AddStudent.css"; // Import the CSS file

const AddStudent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
      name: "",
      roll: "",
      section: "",
      stream: "",
      college: "",
    });
  
    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:3000/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add student");
        }
  
        alert("Student added successfully!");
        navigate("/student"); // Redirect to student list
      } catch (error) {
        console.error("Error adding student:", error);
      }
    };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
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

        <button type="submit" className="submit-button">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
