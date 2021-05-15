import { useState, useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { mealReducer } from './meal-reducer'
import StatsBox from './statBox'
import FoodList from '../food/food-list';
import IngredientsList from './ingredient-list';
import TestingBox from '../testingBox.component';
import api from '../../api'

// Initial State

const initialState = {
  meal: {
    date: 'May 13, 2021',
    time: '',
    location: 'Home',
    ingredients: [],
  },
  statBoxLayot: {
    row: 'row',
    col: 'col',
  }
}

// Business Logic

function apiSuccess(type,data) {
  // console.log(type + '!');
  console.log(type + ': ' + JSON.stringify(data._id));
  // history.goBack();
}

// Components

const MealEditable = ({ meal,dispatch }) => {
  return (
    <div className='container border border-dark'>
      <div className='form-row'>
        <h5>Meal:</h5>
      </div>
      <div className='form-row'>
        <br />
        <InputText label='Date' name='date' value={meal.date} callback={(e) => dispatch({type:'DATE',payload:e.target.value})} addGroup='col' />
        <InputText label='Time' name='time' value={meal.time} callback={(e) => dispatch({type:'TIME',payload:e.target.value})} addGroup='col' />
        <InputText label='Location' name='location' value={meal.location} callback={(e) => dispatch({type:'LOCATION',payload:e.target.value})} addGroup='col' />
      </div>
      <br />
      <div className='container border border-dark'>
        <StatsBox cache={meal} statBoxLayot={initialState.statBoxLayot} />
      </div>
      <br /><br />
      <div className='form-row'>
        <IngredientsList
          meal={meal}
          dispatch={dispatch}
          />
      </div>
      <br />
    </div>
  )
}

const Meal = ({ ...props }) => {
  let { id } = useParams();
  const [meal, dispatch] = useReducer(mealReducer,initialState.meal)

  const [modal, setModal] = useState(false);
  const [save, setSave] = useState(false);

  function handleSave(updatedMeal) {
    if(id) {
      api.putMeal(updatedMeal).then(data => {apiSuccess('Updated',data)})
    } else {
      api.postMeal(updatedMeal).then(data => {apiSuccess('Created',data)})
    }
  }

  return (
    <div>
      <MealEditable meal={meal} dispatch={dispatch} />
      <br /><br />
      <FoodList meal={meal} dispatch={dispatch} />
      <br /><br />
      <div className='btn btn-secondary'  onClick={(e) => {handleSave(meal)}} >Save</div>
      <TestingBox save={save} modal={modal} setModal={setModal} data={meal} />
    </div>
  )
}

const InputText = ({ addGroup, addControl, label, name, value, callback}) => {
  return (
    <div className={'form-group ' + addGroup}>
      {label ? <label>{label}</label> : null }
      <input
        type="text"
        className={'form-control ' + addControl}
        name={name}
        value={value}
        onChange={callback}
      />
    </div>
  )
}

export {
  InputText
}
export default Meal;
