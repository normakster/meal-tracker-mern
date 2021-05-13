import { useState, useEffect, useReducer } from 'react';
import api from '../../api'
import { foodsReducer } from './foods-reducer'
import { FoodItem, NewFood } from './food-item';
import SearchInput from '../search-component'

// Business Logic



// Components

const FoodList = ({ meal, dispatch }) => {
  const [foods,foodsDispatch] = useReducer(foodsReducer,[]);
  let [newFoodItem, setNewFoodItem] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  let filteredFoods = foods.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  useEffect(() => {
    api.getAllFoods().then(data => {
      foodsDispatch({type:'FETCH_ALL',foods:data});
    })
  },[newFoodItem])

  function resetNewFood() {
    setNewFoodItem(null);
  }


  return (
    <div>
      <h5>Food List:</h5>
      <SearchInput filterValue={filterValue} setFilterValue={setFilterValue} />
      <div className='container border border-info'>
        <div className='row'>
          <div className='col'>Name</div>
          <div className='col'>Desc.</div>
          <div className='col'>kCal</div>
          <div className='col'></div>
        </div>
        {
          filteredFoods.map((food,i) => {
            let inCache = false;
            meal.ingredients.forEach((c) => {
              if(food._id === c.food._id) {
                inCache = true;
              }
            });

            return (
              <FoodItem
                foodItem={food}
                foodsDispatch={foodsDispatch}
                ingrDispatch={dispatch}
                inCache={inCache}
                key={food._id}
                />
            )
          })
        }
        {newFoodItem}
      </div>
      <br />
      <br />
      <div
        onClick={() => setNewFoodItem(<NewFood callback={resetNewFood}/>)}
        className='btn btn-info'
      >Add New</div>
      <br />
      <br />
      <div
        onClick={() => console.log(foods)}
        className='btn btn-light'
      >CHECK_STATE</div>
    </div>
  )
}

export default FoodList;
