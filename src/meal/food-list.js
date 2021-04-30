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
            return (
              <FoodItem foodItem={food} ingredients={ingredients} ingrDispatch={ingrDispatch} key={food._id} />
            )
          })
        }
      </div>
    </div>
  )
}

const SearchInput = ({ filterValue, setFilterValue  }) => {
  const label = 'Search Foods: ';
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name='searchInput'
        className="form-control"
        value={filterValue}
        onChange={(e) => {setFilterValue(e.target.value)}}
        />
    </div>
  )
}

export default FoodList;
