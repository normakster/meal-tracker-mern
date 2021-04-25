import { useState, useEffect } from 'react';

function FoodList({ foods, filterValue, cache, callback }) {
  let filteredFoods = filterItemsBy(foods,filterValue,'name');

  useEffect(() => {
      filteredFoods.forEach((food, i) => {
        food.added = false;
      });
      console.log('Reset Foods list !!');
    },
    [foods],
  );

  function filterItemsBy(arr, query, by) {
    return arr.filter(el => el[by].toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }

  function handleAction(food,added) {
    if(added) {
      const arr = cache;
      arr.push({serv: 0, food: food});
      callback(arr);
    } else {
      const arr = cache.filter(e => e.food._id !== food._id);
      callback(arr);
    }
  }

  return (
    <div>
      <h5>Food List:</h5>
      <table className='table table-sm'>
        <thead className='thead-dark'>
          <tr>
            <td>Name</td>
            <td>Desc.</td>
            <td>kCal</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            filteredFoods.map((food,i) => {
              return (
                <FoodRow food={food} id={i} callback={handleAction} />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const FoodRow = ({ food, id, callback }) => {

  function handleClick(added) {
    food.added = added;
    callback(food,added);
  }

  return (
    <tr key={food._id}>
      <td>{food.name}</td>
      <td>{food.added ? 'TRUE' : 'FALSE'}</td>
      <td>{food.kCal}</td>
      <td><FoodButton callback={handleClick} added={food.added} /></td>
    </tr>
  )
}

const FoodButton = ({ callback, added }) => {
  const [text, setText] = useState('[ ]');

  useEffect(() => {
    setText(added ? '[X]' : '[ ]')
  },
    [added],
  );

  function handleClick() {
    added = !added;
    callback(added);
  }
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default FoodList;
