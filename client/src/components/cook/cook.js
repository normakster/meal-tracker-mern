import { Fragment, useState, useReducer } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import StatsBox from '../meal/meal-statBox'
import FoodList from '../food/food-list';
import Popup from '../modal.component'

import { updateObject, updateItemInArray }  from '../../services/utilities'

let initialMeal = {
  servingSize: 1,
  units_total: 1,
  nutrients: {
    kcal: 'bad',
    protein: 'bad',
    fat: 'bad',
    carb: 'bad',
  },
  ingredients: [],
  allergies: [],
};

function mealReducer(state, action) {
  switch (action.type) {
    case 'meal/update':
      return {...state, [(action.payload.key)]:action.payload.value}
    case 'meal_ingr/update':
      const newIngredients = updateItemInArray(state.ingredients, action.payload.id, ingr => {
        return updateObject(ingr, { serv: action.payload.serv })
      })
      return {...state, ingredients:newIngredients}
    case 'meal_food/add':
      return { ...state, ingredients: state.ingredients.concat({
        id: state.ingredients.reduce((maxId,item) => {
          return Math.max(maxId,item.id) + 1
        }, 0),
        serv: '',
        food: {...action.payload.food},
      })}
    case 'meal_food/remove':
      return { ...state,
        ingredients: state.ingredients.filter((item, index) => item.food._id !== action.payload.food._id),
      }
    case 'meal/init':
      console.log('Reset Meal');
      return updateObject(state,action.payload)
    default:
      return state
  }
}

const Cook = () => {
  const [meal, dispatch] = useReducer(mealReducer,initialMeal);

  return (
    <Container>
      <div id='transactional_data'></div>
      <hr />
      <Servings meal={meal} dispatch={dispatch} />
      <hr />
      <Nutrients meal={meal} nutrients={meal.nutrients}/>
      <hr />
      <Ingredients meal={meal} dispatch={dispatch} />
    </Container>
  )
}

const Servings = ({ meal, dispatch }) => {
  const style = {margin: '10px'};

  return (
    <div id='servings'>
      <label>Size:</label>
      <input style={style}
        type='text'
        name='servingSize'
        className=''
        value={meal.servingSize}
        onChange={(e) => dispatch({type:'meal/update',payload:{key:'servingSize',value:e.target.value}})}
        placeholder='Serving Size'
      />
      <label>Units</label>
      <input style={style}
        type='text'
        name='units'
        className=''
        value={meal.units_total}
        onChange={(e) => dispatch({type:'meal/update',payload:{key:'units_total',value:e.target.value}})}
        placeholder='Units'
      />
    </div>
  )
}

const Ingredients = ({ meal, dispatch }) => {
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function updateItem(item,e) {
    dispatch({type:'meal_ingr/update',payload:{ id:item.id, serv:e.target.value }})
  }

  function removeItem(food) {
    dispatch({type: 'meal_food/remove', payload:{food: food}});
  }

  return (
    <div id='ingredients'>
      <Row>
        <Button variant='outline-primary' onClick={handleShowModal} >Show Food List</Button>
        <Popup
          show={showModal}
          handleClose={handleCloseModal}
          title='Food List'
          body={<FoodList meal={meal} mealDispatch={dispatch} />}
          footer={<div></div>}
          />
      </Row>
      <br />
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
                    <Form.Control required size='sm'
                      type='text' placeholder='Serv.' name='serv' value={item.serv}
                      onChange={(e) => updateItem(item,e)} />
                  </td>
                  <td>{item.food.name}</td>
                  <td>{item.food.kCal}</td>
                  <td>
                    <Button variant='warning' onClick={() => removeItem(item.food)} >X</Button>
                  </td>
                </tr>
            )})}
          </tbody>
          <tfoot>
          </tfoot>
        </Table>
      </Row>
    </div>
  )
}

const Nutrients = ({ meal, nutrients }) => {
  const data = {protein:'Protein',fat:'Fat',carb:'Carb'};
  function iterateData() {
    return Object.entries(data).map(([key, value]) => {
      return (
        <Row>
          <div>{value}: {nutrients[key]}</div>
        </Row>
      )
    })
  }

  return (
    <div id='nutrients'>
      <StatsBox cache={meal} nutrients={nutrients} />
    </div>
  )
}

export default Cook;
