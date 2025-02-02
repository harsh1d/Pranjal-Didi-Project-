const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

router.post('/', async (req, res) => {
  const { itemName, quantity } = req.body;
  const newItem = new Inventory({ itemName, quantity });
  await newItem.save();
  res.status(201).json(newItem);
});

router.get('/', async (req, res) => {
  const inventory = await Inventory.find();
  res.status(200).json(inventory);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const updatedItem = await Inventory.findByIdAndUpdate(id, { quantity, lastUpdated: Date.now() }, { new: true });
  res.status(200).json(updatedItem);
});

module.exports = router;
