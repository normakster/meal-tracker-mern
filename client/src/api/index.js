import * as food from './food-api'
import * as meal from './meal-api'

function handleResponse(res) {
  if (res.status >= 400 && res.status < 600) {
    throw new Error("Bad response");
  }
  // if (!res.headers.get("content-type").includes("application/json")) {
  //   throw new TypeError("Response not JSON");
  // }
  // console.log(res.data);
  return res.data;
}

export {
  // Functions
  handleResponse,
}

const api = {

  // Meal Routes
  postMeal: meal.post,
  getMeal: meal.get,
  putMeal: meal.put,
  deleteMeal: meal.remove,
  getAllMeals: meal.getAll,

  // Food Routes
  postFood: food.post,
  getFood: food.get,
  putFood: food.put,
  deleteFood: food.remove,
  getAllFoods: food.getAll,
};

export default api
