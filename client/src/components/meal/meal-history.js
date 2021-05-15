import { useState, useEffect, useReducer } from 'react';
import api from '../../api'

const mealHistoryReducer = (state,action) => {
  switch (action.type) {
    case 'meal/fetchAll':
      return [...(action.payload)]
      return state
      break;
    default:
      return state
  }
}

function fetchAll(dispatch) {
  api.getAllMeals().then(data => {
    console.log(data);
    dispatch({type:'meal/fetchAll',payload:data});
  })
}

const MealHistory = () => {
  const [meals,dispatch] = useReducer(mealHistoryReducer,[])

  useEffect(() => {
    fetchAll(dispatch)
  },[])

  function mealItem(meal) {
    return (
      <div className='row border rounded'>
        <div className='col'>
        {meal.time}
        </div>
        <div className='col'>
        {meal.date}
        </div>
        <div className='col'>
        {meal.location}
        </div>
        <div className='col'>
        {meal.ingredients.length}
        </div>
      </div>
    )
  }

  return (
    <div className='container border rounded'>
      <h5>Meal List:</h5>
      {meals.map((meal,i) => mealItem(meal))}
      <br />
      <div className='row btn btn-secondary'  onClick={(e) => {fetchAll()}} >Fetch</div>
    </div>
  )
}

export default MealHistory
