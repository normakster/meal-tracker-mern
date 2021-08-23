import Api from './api'
const api = {
  foods: new Api('foods'),
  meals: new Api('meals'),
};

export default api
