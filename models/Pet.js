const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String },
  age: { type: Number, min: 0 },
  healthStatus: {
    type: String,
    enum: ['Good', 'Fair', 'Delicate'],
    default: 'Good'
  },
  description: String,
  location: String,
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);
