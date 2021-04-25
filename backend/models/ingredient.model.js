const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  kCal: { type: Number, required: true },
  otherIngredients: this
}, {
  timestamps: true,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
