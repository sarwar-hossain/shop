import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/AddMydata.css"; // Import the CSS file

const AddClassVideo = () => {
    const [formData, setFormData] = useState({
        type: "",
        subject: "",
        topic: "",
        name: "",
        link: "",
        img: null, // Store the image file here
    });

    const navigate = useNavigate(); // React Router navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setFormData({ ...formData, img: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission

        try {
            const formDataToSend = new FormData(); // Create a FormData object
            formDataToSend.append("type", formData.type);
            formDataToSend.append("subject", formData.subject);
            formDataToSend.append("topic", formData.topic);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("link", formData.link);
            formDataToSend.append("img", formData.img); // Append the image file

            const response = await fetch("http://localhost:3000/classvideo", {
                method: "POST",
                body: formDataToSend, // Send FormData instead of JSON
            });

            if (response.ok) {
                alert("Inventory item added successfully!");
                setFormData({ type: "", subject: "", topic: "", name: "", link: "", img: null }); // Reset form
                navigate("/admin/class-video"); // Redirect to inventory page
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

                <label>topic:</label>
                <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                />

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Link:</label>
                <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                />

                <label>Photo (Upload Image):</label>
                <input
                    type="file"
                    name="img" // Match the backend field name
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />


                <button type="submit">Add Item</button>

            </form>


            <button className="view-mydata-button" onClick={() => navigate("/admin/class-video")}>
                View Mydata
            </button>
        </div>
    );
};

export default AddClassVideo;