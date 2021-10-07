const mongoose = require('mongoose');
const { str2obj, merge, update } = require('../services/utilities');

const data = {
  fields: [
    'upc',
    'description',
    'brandOwner',
    'dataSource',
    'brandedFoodCategory',
    'ingredients',
    'servingSize',
    'servingSizeUnit',
    'labelNutrients.fat',
    'labelNutrients.saturatedFat',
    'labelNutrients.transFat',
    'labelNutrients.cholesterol',
    'labelNutrients.sodium',
    'labelNutrients.carbohydrates',
    'labelNutrients.fiber',
    'labelNutrients.sugars',
    'labelNutrients.protein',
    'labelNutrients.calcium',
    'labelNutrients.iron',
    'labelNutrients.potassium',
    'labelNutrients.addedSugar',
    'labelNutrients.calories',
    'dataType',
  ],
  testObj: {
    upc: "1234",
    description: "Test Item",
    brandOwner: "Testing",
    dataSource: "TD",
    brandedFoodCategory: "Tested",
    ingredients: "Nuts",
    servingSize: "1",
    servingSizeUnit: "10",
    labelNutrients: {
      fat: "1",
      saturatedFat: "1",
      transFat: "1",
      cholesterol: "1",
      sodium: "1",
      carbohydrates: "1",
      fiber: "1",
      sugars: "1",
      protein: "1",
      calcium: "1",
      iron: "1",
      potassium: "1",
      addedSugar: "1",
      calories: "1",
    },
    dataType: "",
  },
  schema: new mongoose.Schema(
    {
      upc: { type: String, required: false },
      description: { type: String, required: false },
      brandOwner: { type: String, required: false },
      dataSource: { type: String, required: false },
      brandedFoodCategory: { type: String, required: false },
      ingredients: { type: String, required: false },
      servingSize: { type: String, required: false },
      servingSizeUnit: { type: String, required: false },
      labelNutrients: {
        fat: { type: String, required: false },
        saturatedFat: { type: String, required: false },
        transFat: { type: String, required: false },
        cholesterol: { type: String, required: false },
        sodium: { type: String, required: false },
        carbohydrates: { type: String, required: false },
        fiber: { type: String, required: false },
        sugars: { type: String, required: false },
        protein: { type: String, required: false },
        calcium: { type: String, required: false },
        iron: { type: String, required: false },
        potassium: { type: String, required: false },
        addedSugar: { type: String, required: false },
        calories: { type: String, required: false },
      },
      dataType: { type: String, required: false },
    }
  ),
  empty: () => (data.fields).reduce((acc,key)=>{
    str2obj(acc,key,'');
    return acc;
  },{}),
  make: (newData) => update(data.empty(),newData),
  update: (newData,exitings) => merge(newData,exitings),
}

data.schema.query = {
  byUPC: function(upc) {
    return this.where({ upc: new RegExp(upc, 'i') })
  },
  byQuery: function(q) {
    return this.where({
      $or: [
        { upc: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { brandOwner: new RegExp(q, 'i') },
      ]
    })
  },
}

data['Food'] = mongoose.model('upcFoods', data.schema);

module.exports = data;
