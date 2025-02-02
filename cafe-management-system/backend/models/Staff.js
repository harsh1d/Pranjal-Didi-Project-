const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  role: String,
  shifts: [{ start: Date, end: Date }],
});

module.exports = mongoose.model('Staff', staffSchema);
