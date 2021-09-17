import Api from './api'
const api = {
  foods: new Api('foods'),
  meals: new Api('meals'),
  pantry: new Api('pantry'),
  fdaFood: new Api('fda/foods'),
  fdaFoodSearch: new Api('fda/foods/search'),
  upcFoods: new Api('upc'),
  upcSearch: new Api('upc/search'),
};

export default api
