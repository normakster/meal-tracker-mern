import { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { QuickBites } from '../home'
// import { MealsChart } from '../charts'
import api from '../../api'

const mealHistoryReducer = (state,action) => {
  switch (action.type) {
    case 'meal/fetchAll':
      if(action.payload) {
        return [...(action.payload)]
      }
      return state
    default:
      return state
  }
}

function formatDate(datetime) {
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  }
  return new Intl.DateTimeFormat('en-US',options).format(new Date(datetime))
}

const MealHistory = () => {
  const history = useHistory();
  const [meals,dispatch] = useReducer(mealHistoryReducer,[]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true);
      try {
        const data = await api.meals.getAll();
        !didCancel && dispatch({type:'meal/fetchAll',payload:(data)})
      } catch (e) {
        console.log(e);
      } finally {
        !didCancel && setIsLoading(false);
      }
    }
    fetchData()
    return () => {didCancel = true}
  },[])

  async function handleRemove(id) {
    try {
      await api.meals.delete(id);
      const data = await api.meals.getAll();
      dispatch({type:'meal/fetchAll',payload:(data)})
    } catch (e) {
      console.log(e);
    }
  }

  function handleClick(id) {
    history.push({
      pathname: '/Meal/',
      state: { id: id }
    })
  }

  function mealItem(meal,i) {
    return (
      <tr className='border rounded' key={i}>
        <td onClick={() => handleClick(meal._id)}>{formatDate(meal.datetime)}</td>
        <td onClick={() => handleClick(meal._id)}>{meal.location}</td>
        <td onClick={() => handleClick(meal._id)}>{meal.ingredients.length}</td>
        <td>
          <Button variant='warning' onClick={() => handleRemove(meal._id)} >remove</Button>
        </td>
      </tr>
    )
  }

  return (
    <Container className=''>
      <hr />
      <QuickBites />
      <hr />
      <h5>Meal List:</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Date / Time</td>
            <td>Location</td>
            <td>Ingr. Qt.</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
        {meals.map((meal,i) => mealItem(meal,i))}
        </tbody>
      </Table>
      <br />
      {/*
      <div className='btn btn-secondary d-block'
        onClick={() => update()} >
        Fetch
      </div>
      */}
    </Container>
  )
}

export default MealHistory
