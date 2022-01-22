const mongoose = require('mongoose');

const fdaFoodSchema = new mongoose.Schema(
  {
    "fdcId": { type: Number, required: true },
    "description": { type: String, required: true },
    "publicationDate": { type: String, required: true },
    "dataType": { type: String, required: true },
    "modifiedDate": { type: String, required: true },
    "availableDate": { type: String, required: true },
    "brandOwner": { type: String, required: true },
    "dataSource": { type: String, required: true },
    "brandedFoodCategory": { type: String, required: true },
    "gtinUpc": { type: String, required: true },
    "ingredients": { type: String, required: true },
    "marketCountry": { type: String, required: true },
    "servingSize": { type: Number, required: true },
    "servingSizeUnit": { type: String, required: true },
    "labelNutrients": {
      "fat": {
        "value":{ type: Number, required: false }
      },
      "saturatedFat": {
        "value": { type: Number, required: false }
      },
      "transFat": {
        "value": { type: Number, required: false }
      },
      "cholesterol": {
        "value": { type: Number, required: false }
      },
      "sodium": {
        "value": { type: Number, required: false }
      },
      "carbohydrates": {
        "value": { type: Number, required: false }
      },
      "fiber": {
        "value": { type: Number, required: false }
      },
      "sugars": {
        "value": { type: Number, required: false }
      },
      "protein": {
        "value": { type: Number, required: false }
      },
      "calcium": {
        "value": { type: Number, required: false }
      },
      "iron": {
        "value": { type: Number, required: false }
      },
      "potassium": {
        "value": { type: Number, required: false }
      },
      "addedSugar": {
        "value": { type: Number, required: false }
      },
      "calories": {
        "value": { type: Number, required: false }
      }
    }
  }
);

fdaFoodSchema.query.byQuery = function(q) {
  return this.where({
    $or: [
      { gtinUpc: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') }
    ]
  })
};

fdaFoodSchema.query.byUPC = function(upc) {
  return this.where({ gtinUpc: new RegExp(upc, 'i') })
};

fdaFoodSchema.query.byFdcID = function(id) {
  return this.where({ fdcId: id })
};

module.exports = {
  FdaFood: mongoose.model('FdaFood', fdaFoodSchema),
  fdaFoodSchema: fdaFoodSchema
};
