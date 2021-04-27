import { useState, useEffect } from 'react';
import { FoodItem } from './food-item';

function FoodList({ foods, cache, setCache }) {
  const [filterValue, setFilterValue] = useState('');
  let filteredFoods = foods.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  function handleUpdate(food,added) {
    if(added) {
      console.log('Adding ' + food.name);
      const arr = cache;
      const id = arr.length + 1;
      arr.push({id: id, serv: 0, food: food});
      setCache(arr);
    } else {
      console.log('Trying to un-add ' + food.name);
      const arr = cache.filter(e => e.food._id !== food._id);
      setCache(arr);
    }
  }

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
              <FoodItem food={food} cache={cache} handleUpdate={handleUpdate} key={food._id} />
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
