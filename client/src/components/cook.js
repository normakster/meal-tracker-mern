import React, { useReducer, useEffect, useContext } from 'react';

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
        <Meal.Items.Table Head={Meal.Items.Head} Body={Meal.Items.Body} items={meal.ingredients} />
        <hr />
        <div id='transactional_data'><pre>{JSON.stringify(meal, null, 1)}</pre></div>
        <hr />
        <Nutrients meal={meal} nutrients={meal.nutrients}/>
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
