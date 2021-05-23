import { useState, useEffect, useReducer } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { foodReducer, initialState } from './food-reducer'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

import api from '../../api'

const Food = ({ foodItem }) => {
  let history = useHistory();
  let location = useLocation();
  let id = location.state ? location.state.id : undefined;
  const [food,dispatch] = useReducer(foodReducer,initialState.food)

  useEffect(async () => {
    dispatch({type:'INIT',payload:(await api.getFood(id))})
  },[id])

  useEffect(() => {
    dispatch({type:'KCAL'})
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
    history.goBack();
  }

  function handleRemove(e) {
    api.deleteFood(food._id).then((data) => {apiSuccess('Deleted',data)})
  }

  function apiSuccess(type,data) {
    // console.log(type + '!');
    console.log(type + ': ' + JSON.stringify(data._id));
    history.goBack();
  }


  const layout = {
    formGroup: 'form-group form-row',
    label: 'col-sm-1 col-form-label',
    inputDiv: 'col-sm-10',
    inputText: 'form-control mb-2',
  }


  function inputItem(title,key) {
    return (
      <Form.Group>
        <Form.Label>{title}</Form.Label>
        <Form.Control type='text' placeholder={title} name={key} value={food[key]}
          onChange={(e) => dispatch({type:'food/update',payload:{key:key,value:e.target.value}})} />
      </Form.Group>
    )
  }


// TODO: Use HOC to set layout of inputs and (maybe) make an InputText component.
  return (
    <Container>
      <Form onSubmit={(e) => {e.preventDefault()}}>
        <div className='border border-info'>
          Details:
          {inputItem('Name:','name')}
          {inputItem('Desc:','desc')}
          {/*
            <Form.Row>
            <label className={layout.label} >Name:</label>
            <div className={layout.inputDiv}>
              <input required name='name' type='text' className={layout.inputText}
                  value={food.name} placeholder='Name'
                  onChange={(e)=>dispatch({type:'NAME',payload:e.target.value})} />
              </div>
          </Form.Row>
          <Form.Row>
            <label className={layout.label} >Desc:</label>
            <div className={layout.inputDiv}>
              <input required name='desc' type='text' className={layout.inputText}
                  value={food.desc} placeholder='Description'
                  onChange={(e)=>dispatch({type:'DESC',payload:e.target.value})} />
              </div>
          </Form.Row>
          */}
        </div>
        <div className='border border-info'>
          Stats:
          <Form.Row className={layout.formGroup} >
            <label className={layout.label} >kCals:</label>
            <div className={layout.inputDiv}>
              <input required disabled name='kCal' type='text' className={layout.inputText}
                  value={food.kCal} placeholder='Calories'
                  onChange={(e)=>dispatch({type:'KCAL',payload:e.target.value})} />
              </div>
          </Form.Row>
        </div>
        <div className='border border-info'>
          Macros:
          <Form.Row className={layout.formGroup} >
            <label className={layout.label} >Fat (g):</label>
            <div className={layout.inputDiv} >
              <input required name='fat' type='text' className={layout.inputText}
                  value={food.fat} placeholder='Fat in Grams'
                  onChange={(e)=>dispatch({type:'FAT',payload:e.target.value})} />
              </div>
          </Form.Row>
          <Form.Row className={layout.formGroup} >
            <label className={layout.label} >Protien (g):</label>
            <div className={layout.inputDiv} >
              <input required name='protien' type='text' className={layout.inputText}
                  value={food.protien} placeholder='Protien in Grams'
                  onChange={(e)=>dispatch({type:'PROTIEN',payload:e.target.value})} />
              </div>
          </Form.Row>
          <Form.Row className={layout.formGroup} >
            <label className={layout.label} >Carb (g):</label>
            <div className={layout.inputDiv} >
              <input required name='carb' type='text' className={layout.inputText}
                  value={food.carb} placeholder='Carbs in Grams'
                  onChange={(e)=>dispatch({type:'CARB',payload:e.target.value})} />
              </div>
          </Form.Row>
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
