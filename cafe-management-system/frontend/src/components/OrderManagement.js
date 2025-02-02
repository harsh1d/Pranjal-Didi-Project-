import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleInputChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    axios.post('http://localhost:5000/orders', { customerName, items, total })
      .then(response => setOrders([...orders, response.data]))
      .catch(error => console.error('Error creating order:', error));
  };

  return (
    <div>
      <h2>Order Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          required
        />
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Price"
              required
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Add Item</button>
        <button type="submit">Submit Order</button>
      </form>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <h3>{order.customerName}</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name} - {item.quantity} x ${item.price}</li>
              ))}
            </ul>
            <p>Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
