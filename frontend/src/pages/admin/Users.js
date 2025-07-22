import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../pagescss/UserPage.css'; // Create a corresponding CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/login');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error (show toast/notification)
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/login/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  return (
    <div className="user-page">
      <h1>User Management</h1>
      <button className="upload-pdf-button" onClick={() => navigate("/signup")}>
        Upload New User
      </button>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p> {/* Never show actual password */}
            </div>
            <div className="user-actions">
          
              <button
                className="delete-btn"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;