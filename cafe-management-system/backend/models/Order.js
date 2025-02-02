const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [{ name: String, quantity: Number, price: Number }],
  total: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
