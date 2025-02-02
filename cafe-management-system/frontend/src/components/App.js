import React from 'react';
import OrderManagement from './OrderManagement';
import InventoryTracking from './InventoryTracking';
import StaffScheduling from './StaffScheduling';
import SalesReporting from './SalesReporting';

function App() {
  return (
    <div className="App">
      <h1>Cafe Management System</h1>
      <OrderManagement />
      <InventoryTracking />
      <StaffScheduling />
      <SalesReporting />
    </div>
  );
}

export default App;
