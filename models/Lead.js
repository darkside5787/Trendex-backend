const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  whatsapp: String,
  instagram: String
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);