import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../pagescss/MyDataPage.css'; // Import the CSS file

const MyDataPage = () => {
  const [myData, setMyData] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setMyData(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleDeleteMyData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMyData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        console.error('Failed to delete MyData item');
      }
    } catch (error) {
      console.error('Error deleting MyData item:', error);
    }
  };

  // Navigate to update page
  const handleUpdateClick = (id) => {
    navigate(`/updateproducts/${id}`); // Navigate to the update page with the item ID
  };

  return (
    <div className="my-data-page">
      <h1>MyData Page</h1>
      <button className="upload-pdf-button" onClick={() => navigate("/add-products")}>
        Upload New Item
      </button>
      <ul className="my-data-list">
        {myData.map((item) => {
          console.log('Image Path:', item.status); // Debugging
          return (
            <li key={item._id} className="my-data-item">
              <div className="image-container">
                <img
                  style={{
                    width: '300px',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                  src={`http://localhost:3000${item.image}`}
                  alt="MyImage"
                  onError={(e) => {
                    e.target.src = 'path/to/fallback-image.jpg'; // Fallback image
                  }}
                />
              </div>
              <div className="item-details">
                <span>{item.item}</span>
                <span>{item.qty}</span>
               
              </div>
              <div className="button-container">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMyData(item._id)}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyDataPage;