const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  kCal: { type: Number, required: true },
  otherFoods: this
}, {
  timestamps: true,
});

const Ingredient = mongoose.model('Ingredient', foodSchema);

module.exports = Ingredient;
