const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./routes/orders');
const inventoryRoutes = require('./routes/inventory');
const staffRoutes = require('./routes/staff');
const salesRoutes = require('./routes/sales');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cafe-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/orders', orderRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/staff', staffRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
