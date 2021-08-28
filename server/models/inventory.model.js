const mongoose = require('mongoose');
const { fdaFoodSchema } = require('./fdaFood.model')

const inventorySchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    food: { type: fdaFoodSchema, required: true },
  }, {
    timestamps: true,
  }
);

inventorySchema.query.byFdcID = function(fcdId) {
  return this.where({ 'food.fdcId': fcdId })
}

module.exports = {
  Inventory: mongoose.model( 'Inventory', inventorySchema ),
  inventorySchema: inventorySchema
}
