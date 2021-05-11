import { useState, useEffect, useReducer } from 'react';
// import http from '../services/http.service'
import { foodReducer } from './food-reducer'

// Business Logic

const initialState = {
  food: {
    _id: '',
    name: '',
    desc: '',
    kCal: '',
  }
}

// Components

const FoodItem = ({ foodItem, foodsDispatch, ingrDispatch, inCache }) => {
  const [food,foodDispatch] = useReducer(foodReducer,foodItem);
  const [isEditable, setIsEditable] = useState(false);

  function handleAddRemove() {
    if(!inCache) {
      ingrDispatch({type: 'ADD_INGR', food: food});
    } else {
      ingrDispatch({type: 'REMOVE_INGR_BYFOOD', food: food});
    }
  }

  function handleSave(updatedFood) {
      setIsEditable(false);
  }

  function handleCancel(e) {
    setIsEditable(false)
  }

  function handleRemove(e) {
    console.log('TODO: Deleting - ' + food._id);
  }

  return (
    <div >
    {
      (isEditable)
      ? <Editable food={food} foodDispatch={foodDispatch} handleSave={handleSave} >
          <div className='btn btn-warning col' onClick={(e) => handleCancel(e)}>Cancel</div>
          <div className='btn btn-danger col' onClick={(e) => handleRemove(e)}>Delete</div>
        </Editable>
      : <ReadOnly food={food} >
          <div className='btn btn-danger' onClick={() => setIsEditable(true)} >Edit</div>
          &nbsp; or &nbsp;
          <div className='btn btn-warning' onClick={handleAddRemove} >{inCache ? '[X]' : '[ ]'}</div>
        </ReadOnly>
    }
    </div>
  )
}

const ReadOnly = ({ food, children }) => {
  return (
    <div className='row border rounded'>
      <div className='col'>{food.name}</div>
      <div className='col'>{food.desc}</div>
      <div className='col'>{food.kCal}</div>
      <div className='col'>
        <div className='row'>
          {children}
        </div>
      </div>
    </div>
  )
}

const NewFood = ({ callback }) => {
  const [food,foodDispatch] = useReducer(foodReducer,initialState.food);
  const [isEditable, setIsEditable] = useState(true)

  async function handleSave(updatedFood) {
    callback();
  }

  function handleCancel(e) {
    setIsEditable(false);
    callback();
  }

  return (
    <div>
    {
      (isEditable)
      ? <Editable food={food} foodDispatch={foodDispatch} handleSave={handleSave} >
          <div className='btn btn-primary col' onClick={(e) => handleCancel(e)}>Cancel</div>
        </Editable>
      : <ReadOnly food={food} >
          <div className='btn btn-primary' onClick={() => setIsEditable(true)} >UnSaved</div>
        </ReadOnly>
    }
    </div>

  )
}

const Editable = ({ food, foodDispatch, handleSave, children }) => {

  function onSubmit(e) {
    e.preventDefault();
    console.log(food);
    handleSave(food);
  }

  return (
      <form onSubmit={onSubmit} >
        <div className='form-row'>
          <div className='col-auto'>
            <label className='sr-only' >Name</label>
            <input
                required
                name='name'
                type='text'
                className='form-control mb-2'
                value={food.name}
                placeholder='Name'
                onChange={(e)=>{foodDispatch({type:'NAME',payload:e.target.value})}}
                />
          </div>
          <div className='col-auto'>
            <label className='sr-only' >Desc.</label>
            <input
                required
                name='desc'
                type='text'
                className='form-control'
                value={food.desc}
                placeholder='Desc.'
                onChange={(e)=>{foodDispatch({type:'DESC',payload:e.target.value})}}
                />
          </div>
          <div className='col-auto'>
            <label className='sr-only' >kCal</label>
            <input
                required
                name='kCal'
                type='text'
                className='form-control'
                value={food.kCal}
                placeholder='kCal'
                onChange={(e)=>{foodDispatch({type:'KCAL',payload:e.target.value})}}
                />
          </div>
          <div className='col-auto'>
            <div className='row'>
              <input type='submit' value='Save' className='btn btn-primary col' />
              {children}
            </div>
          </div>
        </div>
        <div className=''>{food._id}</div>
      </form>
  )
}

export {
  FoodItem,
  NewFood
}
