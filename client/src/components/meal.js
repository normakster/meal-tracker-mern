import React, { Fragment, useReducer, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { XmealDispatch } from './cook'
import { Assembled, updateObject, updateItemInArray }  from './../services/utilities'

// Initial State
import { ingredients } from '../data/dummy';

export const initialMeal = {
  datetime: '2021-08-27T21:00:00.000Z',
  location: '',
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

// Components

const Meal = {
  Meta: ({ meal }) => {
    const dispatch = useContext(XmealDispatch);
    const style = {margin: '10px'};
    return (
      <Row>
        <Formatter.WithLabel label='Date: ' >
          <DatePicker selected={meal.datetime ? new Date(meal.datetime) : null}
            onChange={(date) => dispatch({type:'meal/update',payload:{key:'datetime',value:date}})}
            showTimeSelect timeFormat="HH:mm" dateFormat="MM-dd-yyyy HH:mm"
            timeIntervals={15} timeCaption="time"
          />
        </Formatter.WithLabel>
        <Formatter.InputItem title={'Location'} field={'location'} obj={meal} dispatch={dispatch} action={'meal/update'} />
        <Formatter.InputItem title={'Serving Size'} field={'servingSize'} obj={meal} dispatch={dispatch} action={'meal/update'} />
        <Formatter.InputItem title={'Total Servings'} field={'units_total'} obj={meal} dispatch={dispatch} action={'meal/update'} />
      </Row>
    )
  },
  Items: {
    Head: function () {
      return [
        <td key={0}>Servings</td>,
        <td key={1}>Ingredient</td>,
        <td key={2}>Calories</td>,
        <td key={3}>Action</td>,
      ]
    },
    Body: function ({ item }) {
      const dispatch = useContext(XmealDispatch);
      function remove() {
        dispatch({type: 'meal_food/remove', payload:{food: item.food}});
      }
      return [
        <td key={0}>
          <input type='text' name='servings' className=''
            placeholder='Servings (required)'
            value={item.servings} onChange={(e) => {
              dispatch({type:'meal_ingr/update',payload:{ id:item.id, servings:e.target.value }})
            }}
          />
        </td>,
        <td key={1}>{item.food.description}</td>,
        <td key={2}>{item.food.labelNutrients.calories}</td>,
        <td key={3}><Meal.Items.Buttons.Remove callback={remove} /></td>,
      ]
    },
    Buttons: {
      AddItem: ({callback,toggle}) => <Button variant={'info'} onClick={callback}>{toggle?'More Items':'Add Items'}</Button>,
      Add: ({callback}) => <Button variant={'success'} onClick={callback} >Add</Button>,
      Remove: ({callback}) => <Button variant={'warning'} onClick={callback} >X</Button>
    },
    Table: ({ items }) => <Assembled Head={Meal.Items.Head} Body={Meal.Items.Body} items={items} />,
  },
  Reducer: function mealReducer(state, action) {
    switch (action.type) {
      case 'meal/update':
        return {...state, [(action.payload.key)]:action.payload.value}
      case 'meal_ingr/update':
        const newIngredients = updateItemInArray(state.ingredients, action.payload.id, ingr => {
          return updateObject(ingr, { servings: action.payload.servings })
        })
        return {...state, ingredients:newIngredients}
      case 'meal_food/add':
        return { ...state, ingredients: state.ingredients.concat({
          id: state.ingredients.reduce((maxId,item) => {
            return Math.max(maxId,item.id) + 1
          }, 0),
          servings: '',
          food: {...action.payload.food},
        })}
      case 'meal_food/remove':
        return { ...state,
          ingredients: state.ingredients.filter((item, index) => item.food._id !== action.payload.food._id),
        }
      case 'meal/init':
        console.log('Reset Meal');
        return action.payload
      default:
        return state
    }
  },
}

const Formatter = {
  WithLabel: function WithLabel({label,children}) {
    return (
      <Col>
        <Row><label >{label}</label></Row>
        <Row>{children}</Row>
      </Col>
    )
  },

  InputItem: function InputItem({obj,dispatch,action,title,field}) {
    return (
      <Col>
        <Form.Group>
          <Form.Label >{title}</Form.Label>
          <Form.Control type='text' placeholder={field} name={field} value={obj[field]}
            onChange={(e) => dispatch({type:action,payload:{key:field,value:e.target.value}})} />
        </Form.Group>
      </Col>
    )
  }
}

export default Meal
