import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/StudentPage.css"; // Import the CSS file

const Student = () => {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch student data
  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student:", error));
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid student ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setStudent(student.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Navigate to update page
  const handleUpdateClick = (id) => {
    navigate(`/updatestudent/${id}`); // Navigate to the update page with the student ID
  };

  return (
    <div className="student-container">
       <button className="upload-pdf-button" onClick={() => navigate("/add-student")}>
        Upload New Student
      </button>
      <h2>Student Details</h2>
      <div className="student-list">
        {student.map((student, index) => (
          <div key={index} className="student-card">
             <img style={{
          width: "300px", 
          height: "200px", 
          objectFit: "cover", 
        }} src={student.college} alt="MyImage" />
            <h3>{student.name}</h3>
            <p><strong>Roll:</strong> {student.roll}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Stream:</strong> {student.stream}</p>
            <p><strong>Id:</strong> {student._id}</p>
            <div className="button-group">
              <button className="update-button" onClick={() => handleUpdateClick(student._id)}>Update</button>
              <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
