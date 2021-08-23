import Api from './api'
const api = {
  foods: new Api('foods'),
  meals: new Api('meals'),
  pantry: new Api('pantry'),
};

export default api
