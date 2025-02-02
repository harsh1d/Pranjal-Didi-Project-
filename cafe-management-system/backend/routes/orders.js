const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const { customerName, items, total } = req.body;
  const newOrder = new Order({ customerName, items, total });
  await newOrder.save();
  res.status(201).json(newOrder);
});

router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

module.exports = router;
