const mongoose = require('mongoose');
const { foodSchema } = require('./food.model')

const mealSchema = new mongoose.Schema(
  {
    date: { type: String, required: false },
    time: { type: String, required: false },
    datetime: { type: String, required: false },
    location: { type: String, required: true },
    ingredients: [{
      serv: { type: Number, required: true },
      food: { type: foodSchema, required: true },
    }],
  }, {
    timestamps: true,
  }
);

module.exports = {
  Meal: mongoose.model( 'Meal', mealSchema ),
  mealSchema: mealSchema
}
