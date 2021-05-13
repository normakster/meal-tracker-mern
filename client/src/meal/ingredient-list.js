import { useState, useEffect, useReducer } from 'react';
import {InputText} from './meal';

function IngredientsList({ meal, dispatch }) {
  return (
    <div className='container border border-dark'>
      <h5>Ingredient List</h5>
      <div className=''>
        <div className='row'>
          <div className='col col-1'>#</div>
          <div className='col'>Servings</div>
          <div className='col'>Ingredients</div>
          <div className='col'>kCal</div>
          <div className='col'>Remove</div>
        </div>
      </div>
      <div className=''>
        {
          meal.ingredients.map((ingr,i) => {
            return (
              <div key={i}>
                <Ingredient ingredient={ingr} dispatch={dispatch} key={ingr.id} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const Ingredient = ({ ingredient, dispatch }) => {

  return (
    <div className='row'>
      <div className='col col-1'>{ingredient.id}</div>
      <div className='col'>
        <div className={'form-group '}>
          <input type="text"
            className='form-control '
            name='servings'
            value={ingredient.serv}
            onChange={(e) => dispatch({type:'EDIT_INGR_SERV',id:ingredient.id,serv:e.target.value})}
          />
        </div>
      </div>
      <div className='col'>{ingredient.food.name}</div>
      <div className='col'>{ingredient.food.kCal}</div>
      <div className='col'>
        <div className='btn btn-warning' onClick={() => dispatch({type:'REMOVE_INGR', id: ingredient.id})}>X</div>
      </div>
    </div>
  )
}

export default IngredientsList;
