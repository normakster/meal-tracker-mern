import { useState, useEffect, useReducer } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import StatsBox from './meal-statBox'
import FoodList from '../food/food-list';
import { mealReducer } from './meal-reducer'
import api from '../../api'

// Initial State

const initialState = {
  meal: {
    date: '',
    time: '',
    location: '',
    ingredients: [],
  },
}

// Business Logic

// Components

const Meal = ({ ...props }) => {
  let history = useHistory();
  let location = useLocation();
  let id = location.state ? location.state.id : undefined;
  const [meal, dispatch] = useReducer(mealReducer,initialState.meal)

  useEffect(async () => {
    if(id) {
      dispatch({type:'INIT',payload:(await api.getMeal(id))})
    }
  },[id])

  async function handleSave(updatedMeal) {
    if(id) {
      let data = await api.putMeal(updatedMeal);
      console.log('Updated: ' + JSON.stringify(data._id));
      history.push('/');
    } else {
      let data = await api.postMeal(updatedMeal);
      console.log('Created: ' + JSON.stringify(data._id));
      history.push('/');
    }
  }

  return (
    <Container fluid>
      <MealEditable meal={meal} dispatch={dispatch} />
      <FoodList meal={meal} mealDispatch={dispatch} />
      <Button variant='secondary'  onClick={(e) => {handleSave(meal)}} >Save</Button>
    </Container>
  )
}


const MealEditable = ({ meal, dispatch }) => {

  function inputItem(title,key) {
    return (
      <Col>
        <Form.Group>
          <Form.Label srOnly>{title}</Form.Label>
          <Form.Control type='text' placeholder={title} name={key} value={meal[key]}
            onChange={(e) => dispatch({type:'meal_'+key+'/update',payload:e.target.value})} />
        </Form.Group>
      </Col>
    )
  }

  return (
    <Container fluid>
      <Row><h5>Meal:</h5></Row>
      <Form>
        <Row>
          {inputItem('Date','date')}
          {inputItem('Time','time')}
          {inputItem('Location','location')}
        </Row>
      </Form>
      <StatsBox cache={meal} />
      <Row>
        <Table striped bordered>
          <thead>
            <tr>
              <td>#</td>
              <td>Servings</td>
              <td>Ingredient</td>
              <td>kCal</td>
            </tr>
          </thead>
          <tbody>
            {meal.ingredients.map((item,i) => {
              return (
                <tr key={'ingr-row-'+i}>
                  <td>{i}</td>
                  <td>
                    <Form.Control size='sm'
                      type='text' placeholder='Serv.' name='serv' value={item.serv}
                      onChange={(e) => dispatch({type:'meal_ingr/update',payload:{id:item.id,serv:e.target.value}})} />
                  </td>
                  <td>{item.food.name}</td>
                  <td>{item.food.kCal}</td>
                </tr>
            )})}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export {
}
export default Meal;
