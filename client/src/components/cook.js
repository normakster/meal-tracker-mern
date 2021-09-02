import React, { useState, useReducer, useEffect, useContext } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import Meal, { initialMeal } from './meal'
export const XmealDispatch = React.createContext(null);

const CookPage = () => {
  const [meal, dispatch] = useReducer(Meal.Reducer,initialMeal);
  return (
    <XmealDispatch.Provider value={dispatch}>
    <Container>
      <Meal.Meta meal={meal} />
      <hr />
      <Meal.Items.Table items={meal.ingredients} />
      <hr />
      <Nutrients meal={meal} nutrients={meal.nutrients}/>
      <hr />
      <div id='transactional_data'>
        <pre>
          {JSON.stringify(
            meal.ingredients.map((ing,i) => {
              return [ing.food.description, ing.servings]
            }), null, 1)}
        </pre>
      </div>
    </Container>
    </XmealDispatch.Provider>
  )
}

const Nutrients = ({ meal, nutrients }) => {
  // <StatsBox cache={meal} nutrients={nutrients} />
  return (
    <div id='nutrients'>
    </div>
  )
}


export default CookPage
