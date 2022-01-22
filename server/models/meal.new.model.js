const mongoose = require('mongoose');
const foodData = require('./newFood.model')

const data = {
  schema: new mongoose.Schema(
    {
      date: { type: String, required: false },
      time: { type: String, required: false },
      datetime: { type: String, required: false },
      location: { type: String, required: true },
      ingredients: [{
        servings: { type: String, required: true },
        food: { type: foodData.schema, required: true },
      }],
    }, {
      timestamps: true,
    }
  ),
  validate: (rawData) => {
    return rawData
  },
  create: (valid) => {
    const meal = new Meal(valid);
    return meal.save()
  },
  save: {},
  delete: {},
  getAll: {},
  search: {},
}

data.schema.query = {
  checkUnique: function(upc,description) {
    return this.where({
      $or: [
        {upc: new RegExp(upc,'i')},
        {description: new RegExp(description,'i')},
      ]
    })
  }
}

data['Meal'] = mongoose.model( 'newMeals', data.schema );

const Meal = data.Meal;

module.exports = data;
