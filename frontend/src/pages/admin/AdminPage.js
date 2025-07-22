import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../pagescss/AdminHome.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by type
  const groupedProducts = products.reduce((acc, product) => {
    const type = product.type ? product.type.toLowerCase() : 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(product);
    return acc;
  }, {});

  const handleTypeClick = (type) => {
    navigate(`/admin/product/${type}`);
  };

  if (loading) {
    return (
      <div className="admin-page-container loading">
        <div className="spinner"></div>
        <p className="loading-text">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page-container error">
        <p className="error-text">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Product Dashboard</h1>
        <p className="admin-subtitle">Manage and view product links by type.</p>
      </header>

      {Object.keys(groupedProducts).length === 0 ? (
        <div className="no-products-message">
          <p className="no-products-text">No products found.</p>
        </div>
      ) : (
        <div className="product-grids">
          {Object.entries(groupedProducts).map(([type, productsOfType]) => (
               <button  key={type}
              className="product-type-card"
              onClick={() => handleTypeClick(type, navigate)} >
              <h2 className="product-type-title">
                {type.charAt(0).toUpperCase() + type.slice(1)} Products ({productsOfType.length})
              </h2>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;