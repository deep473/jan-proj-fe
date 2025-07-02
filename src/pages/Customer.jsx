// src/pages/Customer.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customer() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1. Grab the username you stored after sign-in
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);

    // 2. Load products
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8080/getAllProducts')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  };

  const handleCart = (prod) => {
    const payload = {username, prod}
    axios
      .post('http://localhost:8080/addToCart', payload )
      .then(() => fetchProducts())
      .catch(err => console.error('Add to cart failed!:', err));
  }; 

  return (
    <div>
      <h2>Welcome {username}</h2>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} width="80" />
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <button
                  onClick={() => handleCart(p)}
                >Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
