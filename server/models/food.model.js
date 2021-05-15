const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    kCal: { type: Number, required: true },
    fat: { type: Number, required: true },
    protien: { type: Number, required: true },
    carb: { type: Number, required: true },
  }, {
    timestamps: true,
  }
);

module.exports = {
  Food: mongoose.model('Food', foodSchema),
  foodSchema: foodSchema
};
