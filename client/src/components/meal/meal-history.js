import { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import api from '../../api'

const mealHistoryReducer = (state,action) => {
  switch (action.type) {
    case 'meal/fetchAll':
      if(action.payload) {
        return [...(action.payload)]
      }
      return state
      break;
    default:
      return state
  }
}

const MealHistory = () => {
  const history = useHistory()
  const [meals,dispatch] = useReducer(mealHistoryReducer,[])

  useEffect(async () => {
    dispatch({type:'meal/fetchAll',payload:(await api.getAllMeals())})
  },[])

  function mealItem(meal,i) {
    return (
      <tr className='border rounded' key={i}
        onClick={() => history.push({
          pathname: '/Meal/',
          state: { id: meal._id }
        })}>
        <td>{meal.time}</td>
        <td>{meal.date}</td>
        <td>{meal.location}</td>
        <td>{meal.ingredients.length}</td>
      </tr>
    )
  }

  return (
    <Container className=''>
      <h5>Meal List:</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Time</td>
            <td>Date</td>
            <td>Location</td>
            <td>Ingr. Qt.</td>
          </tr>
        </thead>
        <tbody>
        {meals.map((meal,i) => mealItem(meal,i))}
        </tbody>
      </Table>
      <br />
      <div className='row btn btn-secondary d-none'
        onClick={async (e) => dispatch({type:'meal/fetchAll',payload:(await api.getAllMeals())})} >
        Fetch
      </div>
    </Container>
  )
}

export default MealHistory
