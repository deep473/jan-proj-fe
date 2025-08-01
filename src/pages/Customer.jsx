import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Customer() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
    axios.get('http://localhost:8080/getAllProducts')
      .then(res => {
        setProducts(res.data);
        const q = {};
        res.data.forEach(p => q[p.id] = 1);
        setQuantities(q);
      })
      .catch(console.error);
  }, []);

  const handleQuantityChange = (pid, val) =>
    setQuantities(q => ({ ...q, [pid]: Math.max(1, parseInt(val,10) || 1) }));

  const handleCart = prod => {
    axios.post('http://localhost:8080/addToCart', {
      username, prod, quantity: quantities[prod.id]
    })
    .then(() => alert('Added to cart!'))
    .catch(console.error);
  };

  return (
    <div className="container">
      <h2>Welcome, {username}</h2>
      <button className="btn btn-primary" onClick={() => navigate('/view_cart_page')}>
        View Cart
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Description</th>
            <th>Price</th><th>Qty</th><th>Ops</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><img src={p.image} alt={p.name} width="80" /></td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <input
                  type="number"
                  value={quantities[p.id]}
                  onChange={e => handleQuantityChange(p.id, e.target.value)}
                />
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleCart(p)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
