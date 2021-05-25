import { useState, useEffect, useReducer } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { foodReducer, initialState } from './food-reducer'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

import api from '../../api'

const Food = ({ foodItem }) => {
  let history = useHistory();
  let location = useLocation();
  let id = location.state ? location.state.id : undefined;
  const [food,dispatch] = useReducer(foodReducer,initialState.food)

  useEffect(async () => {
    if(id) {
      dispatch({type:'food/init',payload:(await api.getFood(id))})
    }
  },[id])

  useEffect(() => {
    dispatch({type:'food_kcal/update'})
  },[food.fat,food.protien,food.carb])

  async function handleSave(updatedFood) {
    if(id) {
      let data = await api.putFood(updatedFood);
      console.log('Updated: ' + JSON.stringify(data._id));
      history.goBack();
    } else {
      let data = await api.postFood(updatedFood);
      console.log('Created: ' + JSON.stringify(data._id));
      history.goBack();
    }
  }

  function handleCancel(e) {
    console.log(history.location.state);
    history.goBack();
  }

  function handleRemove(e) {
    api.deleteFood(food._id).then((data) => {apiSuccess('Deleted',data)})
  }

  function apiSuccess(type,data) {
    console.log(type + ': ' + JSON.stringify(data._id));
    history.goBack();
  }

  function inputItem(title,key,disabled=false) {
    return (
      <Form.Group as={Row}>
        <Form.Label column sm='2'>{title}</Form.Label>
        <Col sm='5'>
          <Form.Control  type='text' placeholder={title} name={key} value={food[key]}
            onChange={(e) => dispatch({type:'food/update',payload:{key:key,value:e.target.value}})}
            disabled={disabled} />
        </Col>
      </Form.Group>
    )
  }


// TODO: Use HOC to set layout of inputs and (maybe) make an InputText component.
  return (
    <Container>
      <Form onSubmit={(e) => {e.preventDefault()}}>
        <div className='border border-info'>
          Details:
          <Container>
            {inputItem('Name:','name')}
            {inputItem('Desc:','desc')}
          </Container>
        </div>
        <div className='border border-info'>
          Stats:
          <Container>
            {inputItem('Calories:','kCal',true)}
          </Container>
        </div>
        <div className='border border-info'>
          Macros / Servings:
          <Container>
            {inputItem('Fat (g):','fat',false)}
            {inputItem('Protien (g):','protien',false)}
            {inputItem('Carb (g):','carb',false)}
          </Container>
        </div>
        <div className='row justify-content-center'>
          <input type='submit' value='Save' onClick={() => handleSave(food)}
          className='btn btn-primary col-auto' />
          <div className='btn btn-warning col-auto' onClick={(e) => handleCancel(e)}>Cancel</div>
          <div className='btn btn-danger col-auto' onClick={(e) => handleRemove(e)}>Remove</div>
        </div>
      </Form>
    </Container>
  )
}

export default Food
