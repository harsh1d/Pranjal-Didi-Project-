import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryTracking() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/inventory')
      .then(response => setInventory(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/inventory', { itemName, quantity })
      .then(response => setInventory([...inventory, response.data]))
      .catch(error => console.error('Error adding inventory:', error));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    axios.put(`http://localhost:5000/inventory/${id}`, { quantity: newQuantity })
      .then(response => {
        const updatedInventory = inventory.map(item => item._id === id ? response.data : item);
        setInventory(updatedInventory);
      })
      .catch(error => console.error('Error updating quantity:', error));
  };

  return (
    <div>
      <h2>Inventory Tracking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          required
        />
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <button type="submit">Add Inventory</button>
      </form>
      <ul>
        {inventory.map(item => (
          <li key={item._id}>
            {item.itemName} - {item.quantity}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item._id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryTracking;
