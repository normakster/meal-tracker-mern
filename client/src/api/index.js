import Api from './api'
const api = {
  foods_old: new Api('foods'),
  meals_old: new Api('mealsOld'),
  meals: new Api('meals'),
  pantry: new Api('pantry'),
  fdaFood: new Api('fda/foods'),
  fdaFoodSearch: new Api('fda/foods/search'),
  upcFoods: new Api('upc'),
  upcSearch: new Api('upc/search'),
};

export default api
