const mongoose = require('mongoose');
const { foodSchema } = require('./food.model')

const inventorySchema = new mongoose.Schema(
  {
    quantity: { type: String, required: false },
    food: { type: foodSchema, required: true },
  }, {
    timestamps: true,
  }
);

module.exports = {
  Inventory: mongoose.model( 'Inventory', inventorySchema ),
  inventorySchema: inventorySchema
}
