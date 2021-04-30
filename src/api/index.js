import http from "../services/http.service";

// const [id,food] = null

// Foods
const postFood = ( food ) => http.post('/foods/', food);
const getFood = ( id ) => http.get('/foods/${ id }');
const putFood = ( food ) => http.put('/foods/${ id }', food);
const deleteFood = ( id ) => http.delete('/foods/${ id }');
const getAllFoods = () => http.get('/foods/');

export default {
    postFood,
    getFood,
    putFood,
    deleteFood,
    getAllFoods,
}