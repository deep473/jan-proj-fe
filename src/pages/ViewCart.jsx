import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewCart() {
  const [username] = useState(localStorage.getItem('username') || '');
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/viewCart', { params: { username } })
      .then(res => setItems(res.data))
      .catch(console.error);
  }, [username]);

  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return;
    axios.post('http://localhost:8080/updateCartItem', {
        username, prod: { id: item.productId }, quantity: newQty
      })
      .then(() => axios.get('http://localhost:8080/viewCart', { params: { username } })
                      .then(res => setItems(res.data)))
      .catch(console.error);
  };

  return (
    <div className="container">
      <h2>{username}'s Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th>
            <th>Qty</th><th>Subtotal</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.productId}>
              <td><img src={it.image} alt={it.name} width="80" /></td>
              <td>{it.name}</td>
              <td>{it.price}</td>
              <td>{it.quantity}</td>
              <td>{it.price * it.quantity}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateQuantity(it, it.quantity + 1)}
                >+</button>
                <button
                  className="btn btn-secondary"
                  onClick={() => updateQuantity(it, it.quantity - 1)}
                >−</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
