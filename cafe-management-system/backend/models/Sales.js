const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  totalSales: Number,
});

module.exports = mongoose.model('Sales', salesSchema);
