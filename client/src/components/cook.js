import React, { useState, useReducer, useEffect, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import api from './../api'
import Pantry from './pantryItems'
import Popup from './modal.component'
import Meal, { initialMeal } from './meal'
export const XmealDispatch = React.createContext(null);

const CookPage = () => {
  const [meal, mealDispatch] = useReducer(Meal.Reducer,initialMeal);
  const [inventory, pantryDispatch] = useReducer(Pantry.reducer,[]);
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let { id } = useParams();
  if(!id) id = (location.state) ? location.state.id : undefined;

  useEffect(() => {
    async function fetch() {
      pantryDispatch({type:'pantry/fetch',payload:(await api.pantry.getAll())})
    }
    fetch()
  },[])

  function handleAddNew() {
    alert('Add New Item');
  }

  async function handleSave() {
    if(id) {
      let data = await api.meals.put(meal);
      console.log('Updated: ' + JSON.stringify(data._id));
      history.push('/');
    } else {
      let data = await api.meals.post(meal);
      console.log('Created: ' + JSON.stringify(data._id));
      console.log(meal);
      history.push('/');
    }
  }
  return (
    <XmealDispatch.Provider value={mealDispatch}>
    <Container>
      <Meal.Meta meal={meal} />
      <hr />
      <Meal.Items.Table items={meal.ingredients} />
      <hr />
      <Nutrients meal={meal} nutrients={meal.nutrients}/>
      <hr />
      <Row>
        <Col>
          <Meal.Items.Buttons.AddItem callback={(e) => setShowModal(true)} toggle={meal.ingredients.length>0} />
        </Col>
        <Col>
          <Button variant={'success'} onClick={handleSave} >Save</Button>
        </Col>
      </Row>
      <div id='transactional_data'>
        {/*
        <pre>
          {JSON.stringify(
            meal.ingredients.map((ing,i) => {
              return [ing.food.description, ing.servings]
            }), null, 1)}
        </pre>
        */}
      </div>
      <Popup
        show={showModal}
        handleClose={(e) => setShowModal(false)}
        title='Pantry'
        body={<Pantry.List.Table meal={meal} items={inventory} />}
        footer={<div></div>}
        />
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
