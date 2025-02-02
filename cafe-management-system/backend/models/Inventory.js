const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', inventorySchema);
