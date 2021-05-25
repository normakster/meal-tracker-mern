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
import Popup from '../modal.component'
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
      dispatch({type:'meal/init',payload:(await api.getMeal(id))})
    }
  },[])

  useEffect(() => {
    if(history.location.state.hasOwnProperty('meal')) {
      dispatch({type:'meal/init',payload:history.location.state.meal})
    }
  },[])

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
      <hr />
      <Button variant='secondary'  onClick={(e) => {handleSave(meal)}} >Save</Button>
    </Container>
  )
}


const MealEditable = ({ meal, dispatch }) => {
  const [showModal, setShowModal] = useState(false);

    function handleShowModal() {
      setShowModal(true);
    }

    function handleCloseModal() {
      setShowModal(false);
    }

  function inputItem(title,key) {
    return (
      <Col>
        <Form.Group>
          <Form.Label srOnly>{title}</Form.Label>
          <Form.Control type='text' placeholder={title} name={key} value={meal[key]}
            onChange={(e) => dispatch({type:'meal/update',payload:{key:key,value:e.target.value}})} />
        </Form.Group>
      </Col>
    )
  }

  function removeItem(food) {
    dispatch({type: 'meal_food/remove', payload:{food: food}});
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
      <hr />
      <StatsBox cache={meal} />
      <hr />
      <Row>
        <h5>Ingredients:</h5>
        <Table striped bordered>
          <thead>
            <tr>
              <td>#</td>
              <td>Servings</td>
              <td>Ingredient</td>
              <td>kCal</td>
              <td></td>
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
                  <td>
                    <Button variant='warning' onClick={() => removeItem(item.food)} >X</Button>
                  </td>
                </tr>
            )})}
          </tbody>
        </Table>
        <Button variant='outline-primary' onClick={handleShowModal} >Show Food List</Button>
        <Popup
          show={showModal}
          handleClose={handleCloseModal}
          title='Food List'
          body={<FoodList meal={meal} mealDispatch={dispatch} />}
          footer={<div></div>}
          />
      </Row>
    </Container>
  )
}

export {
}
export default Meal;
