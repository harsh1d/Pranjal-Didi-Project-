const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

router.post('/', async (req, res) => {
  const { name, role, shifts } = req.body;
  const newStaff = new Staff({ name, role, shifts });
  await newStaff.save();
  res.status(201).json(newStaff);
});

router.get('/', async (req, res) => {
  const staff = await Staff.find();
  res.status(200).json(staff);
});

module.exports = router;
