const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');

router.post('/', async (req, res) => {
  const { totalSales } = req.body;
  const newSales = new Sales({ totalSales });
  await newSales.save();
  res.status(201).json(newSales);
});

router.get('/', async (req, res) => {
  const sales = await Sales.find();
  res.status(200).json(sales);
});

module.exports = router;
