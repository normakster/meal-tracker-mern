const mongoose = require('mongoose');
const foodData = require('./newFood.model');

const inventorySchema = new mongoose.Schema(
  {
    quantity: { type: String, required: true },
    food: { type: foodData.schema, required: false },
  }, {
    timestamps: true,
  }
);

inventorySchema.query.byFdcID = function(fcdId) {
  return this.where({ 'food.fdcId': fcdId })
}

inventorySchema.query.byFoodID = function(foodId) {
  return this.where({ 'food._id': foodId })
}

module.exports = {
  Inventory: mongoose.model( 'Inventory', inventorySchema ),
  inventorySchema: inventorySchema
}
