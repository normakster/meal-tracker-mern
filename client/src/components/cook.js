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

  const Buttons = {
    Save: ({callback,disabled}) => <Col><Button variant={'success'} onClick={callback} disabled={disabled} >Save</Button></Col>,
    AddItem: ({}) => <Col><Meal.Items.Buttons.AddItem callback={(e) => setShowModal(true)} toggle={meal.ingredients.length>0} /></Col>,
  }

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
    function updateInventories() {
      meal.ingredients.forEach(async ingr => {
        pantryDispatch({type:'pantry/update', payload:{ id:ingr.food._id, key:'quantity', value:(((ingr.quantity * ingr.food.servingSize) - ingr.servings) / ingr.food.servingSize) }})
        let item = inventory.find(i => {
          return i._id === ingr.pantry_id
        });
        await api.pantry.put(item)
      })
    }

    if(id) {
      // let data = await api.meals.put(meal);
      // console.log('Updated: ' + JSON.stringify(data._id));
      // history.push('/');
    } else {
      await api.meals.post(meal)
      .then(data => {
        updateInventories();
        // console.log('Created: ' + JSON.stringify(data._id));
        // console.log(data.msg);
      });
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
      <Meal.Items.Table items={meal.ingredients} />
      <hr />
      <Row>
        <Buttons.AddItem />
        <Buttons.Save callback={handleSave} />
      </Row>
      <br />
      <hr />
      <InspectionBox meal={meal} inventory={inventory} />
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

const InspectionBox = ({ meal,inventory }) => {
  const [inspect,setInspect] = useState(false);
  const Buttons = {
    Inspect: ({callback,disabled}) => <Col><Button variant={'info'} onClick={() => setInspect(!inspect)} disabled={disabled} >Inspect</Button></Col>, 
  }

  return (
    <Row>
      <div id='transactional_data'>
        <Buttons.Inspect />
        <br />
        {inspect && <pre>Inspecting... : done</pre>}
        <br />
        {inspect && false && <pre>{JSON.stringify(meal.ingredients, null, 1)}</pre>}
        <br />
        {inspect && false && <pre>
          {JSON.stringify(
            meal.ingredients.map((ing,i) => {
              return [ing.food.description, ing.servings]
            }), null, 1)}
        </pre> }
        <br />
        {inspect && true && <pre>
          {JSON.stringify(
            meal.ingredients.map(ingr => {
              return [
                ((ingr.quantity * ingr.food.servingSize) - ingr.servings) / ingr.food.servingSize, 
                inventory.find(item => {
                  return item._id === ingr.pantry_id
                })
              ]
            }), null, 1)}
        </pre> }
        <br />
      </div>
    </Row>
  )
}

const Nutrients = ({ meal, nutrients }) => {
  // <StatsBox cache={meal} nutrients={nutrients} />
  return (
    <div id='nutrients'>
      <StatsBox cache={meal} nutrients={nutrients} />
    </div>
  )
}

const StatsBox = ({cache, nutrients}) => {
  function statReducer(state, action) {
    switch (action.type) {
      case 'statBox/update':
        let food = action.payload.food;
        let serv = action.payload.serv;
        return {...state,
          calories: (state.calories + (food.calories * serv)),
          fat: (state.fat + (food.fat * serv)),
          protein: (state.protein + (food.protein * serv)),
          carbohydrates: (state.carbohydrates +(food.carbohydrates * serv))
        }
      case 'reset':
        return {...state, ...(action.payload)}
      default:
        return state
    }
  }

  const [stats,dispatch] = useReducer(statReducer, nutrients? nutrients: initialStats);
  const statNames = ['calories','fat','protein','carbohydrates'];
  const initialStats = { calories: 0, fat: 0, protein:0, carbohydrates: 0, };

  useEffect(() => {
    dispatch({type:'reset',payload:{...initialStats}})
    cache.ingredients.forEach(c => {
      dispatch({type:'statBox/update',payload:{food:c.food.labelNutrients,serv:c.servings}})
    })
  },[cache])

  return (
    <Row>
      <h5>Stats:</h5>
      {false && <pre>{JSON.stringify(cache.ingredients, null, 1)}</pre>}
      <Table>
        <thead>
          <tr>{statNames.map((name) => <td key={'stat-head-'+name}>{name}</td>)}</tr>
        </thead>
        <tbody>
          <tr>{statNames.map((name) => <td key={'stat-'+name}>{stats[name]}</td>)}</tr>
        </tbody>
      </Table>
    </Row>
  )
}


export default CookPage
