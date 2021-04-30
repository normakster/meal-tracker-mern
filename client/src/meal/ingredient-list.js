import { useState, useEffect, useReducer } from 'react';
import {InputText} from './meal';

function IngredientsList({ ingredients, ingrDispatch }) {
  return (
    <div className='col'>
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
          ingredients.map((ingr,i) => {
            return (
              <div key={i}>
                <Ingredient ingredient={ingr} ingrDispatch={ingrDispatch} key={ingr.id} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const Ingredient = ({ ingredient, ingrDispatch }) => {
  const [serv, setServ] = useState(0);

  // Assigns Serv to Ingredient instead of handleServUpdate()
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
        <button onClick={() => ingrDispatch({type:'REMOVE_INGR', id: ingredient.id})}>-</button>
      </div>
    </div>
  )
}

export default IngredientsList;
