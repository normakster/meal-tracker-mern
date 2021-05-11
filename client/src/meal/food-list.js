import { useState, useEffect, useReducer } from 'react';
import { FoodItem } from './food-item';

// Business Logic



// Components

const FoodList = ({ foods, ingredients, setCache, ingrDispatch }) => {
  const [filterValue, setFilterValue] = useState('');
  let filteredFoods = foods.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  return (
    <div>
      <h5>Food List:</h5>
      <SearchInput filterValue={filterValue} setFilterValue={setFilterValue} />
      <div className='container'>
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
                food={food}
                ingrDispatch={ingrDispatch}
                inCache={inCache}
                key={food._id}
                />
            )
          })
        }
      </div>
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
      <div className='col-1 btn btn-light' onClick={() => handleClear()}>X</div>
    </div>
  )
}

export default FoodList;
