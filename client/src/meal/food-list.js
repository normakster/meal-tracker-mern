import { useState, useEffect, useReducer } from 'react';
import api from '../api'
import { foodsReducer } from './foods-reducer'
import { FoodItem, NewFood } from './food-item';

// Business Logic



// Components

const FoodList = ({ ingredients, ingrDispatch }) => {
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
            ingredients.forEach((c) => {
              if(food._id === c.food._id) {
                inCache = true;
              }
            });

            return (
              <FoodItem
                foodItem={food}
                foodsDispatch={foodsDispatch}
                ingrDispatch={ingrDispatch}
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

const SearchInput = ({ filterValue, setFilterValue  }) => {
  const label = 'Search: ';

  function handleClear() {
    setFilterValue('');
  }

  return (
    <div className='row'>
      <label className='col-auto'>{label}</label>
      <input
        type="text"
        name='searchInput'
        className="col-2"
        value={filterValue}
        onChange={(e) => {setFilterValue(e.target.value)}}
      />
      <div className='col-auto btn btn-light' onClick={() => handleClear()}>X</div>
    </div>
  )
}

export default FoodList;
