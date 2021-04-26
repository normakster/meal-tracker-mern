import { useState, useEffect } from 'react';
import {InputText} from './meal.component';

function IngredientsList({ cache, removeIngredient }) {
  return (
    <div>
      <h3>Ingredient List</h3>
      <div className=''>
        <div className='row'>
          <div className='col'>#</div>
          <div className='col'>Servings</div>
          <div className='col'>Ingredients</div>
          <div className='col'>kCal</div>
          <div className='col'>Remove</div>
        </div>
      </div>
      <div className=''>
        {
          cache.map((ingr,i) => {
            return (
              <div key={i}>
                <Ingredient ingredient={ingr} removeIngredient={removeIngredient} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const Ingredient = ({ ingredient, removeIngredient }) => {
  const [serv, setServ] = useState(0);

  useEffect(() => {
      ingredient.serv = serv;
    },
    [serv],
  );

  return (
    <div className='row'>
      <div className='col'>{ingredient.id}</div>
      <div className='col'>
        <div className={'form-group '}>
          <input type="text"
            className='form-control '
            name='servings'
            value={serv}
            onChange={(e) => {ingredient.serv = e.target.value}}
          />
        </div>
      </div>
      <div className='col'>{ingredient.food.name}</div>
      <div className='col'>{ingredient.food.kCal}</div>
      <div className='col'>
        <button onClick={(e) => removeIngredient(ingredient.id)}>-</button>
      </div>
    </div>
  )
}

export default IngredientsList;
