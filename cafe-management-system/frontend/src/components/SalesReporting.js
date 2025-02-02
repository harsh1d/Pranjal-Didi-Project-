import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesReporting() {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Error fetching sales:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/sales', { totalSales })
      .then(response => setSales([...sales, response.data]))
      .catch(error => console.error('Error adding sales record:', error));
  };

  return (
    <div>
      <h2>Sales Reporting</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="totalSales"
          value={totalSales}
          onChange={(e) => setTotalSales(e.target.value)}
          placeholder="Total Sales"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {sales.map(record => (
          <li key={record._id}>
            <p>{new Date(record.date).toLocaleString()}</p>
            <p>Total Sales: ${record.totalSales}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesReporting;
