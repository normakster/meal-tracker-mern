import { useState, useEffect, useReducer } from 'react';
import { Rows, Editable, ReadOnly } from '../components/form-row.component'
import { foodReducer } from './food-reducer'
import api from '../api'

// Business Logic

const initialState = {
  food: {
    _id: '',
    name: '',
    desc: '',
    kCal: '',
  },
  keys: [
    { key: 'name', placeholder: 'Name', dispatch: 'NAME', type: 'text', },
    { key: 'desc', placeholder: 'Desc', dispatch: 'DESC', type: 'text', },
    { key: 'kCal', placeholder: 'kCal', dispatch: 'KCAL', type: 'text', },
  ]
}

// Components

const FoodItem = ({ foodItem, foodsDispatch, ingrDispatch, inCache }) => {
  const [food,foodDispatch] = useReducer(foodReducer,foodItem)
  const [isEditable, setIsEditable] = useState(false)

  function handleAddRemove() {
    if(!inCache) {
      ingrDispatch({type: 'ADD_INGR', food: food});
    } else {
      ingrDispatch({type: 'REMOVE_INGR_BYFOOD', food: food});
    }
  }

  function handleSave(updatedFood) {
    api.putFood(updatedFood).then(data => {
      foodsDispatch({type:'UPDATE_FOOD', food: updatedFood});
      setIsEditable(false);
    })
  }

  function handleCancel(e) {
    setIsEditable(false)
  }

  function handleRemove(e) {
    console.log('TODO: Deleting - ' + food._id);
    api.deleteFood(food._id).then(() => {
      api.getAllFoods().then(data => {
        foodsDispatch({type:'FETCH_ALL',foods:data});
      })
    })
  }

  function editBtns() {
    return (
      <div className='row'>
        <input type='submit' value='Save' onClick={() => handleSave(food)} className='btn btn-primary col' />
        <div className='btn btn-warning col' onClick={(e) => handleCancel(e)}>Cancel</div>
        <div className='btn btn-danger col' onClick={(e) => handleRemove(e)}>Delete</div>
      </div>
    )
  }

  function roBtns() {
    return (
      <div className='row'>
        <div className='btn btn-danger' onClick={() => setIsEditable(true)} >Edit</div>
        &nbsp; or &nbsp;
        <div className='btn btn-warning' onClick={handleAddRemove} >{inCache ? 'X' : 'Add'}</div>
      </div>
    )
  }

  return (
    <Rows
    item={food}
    dispatch={foodDispatch}
    keys={initialState.keys}
    isEditable={isEditable}
    editBtns={editBtns}
    roBtns={roBtns}
    />
  )
}

const NewFood = ({ callback }) => {
  const [food,foodDispatch] = useReducer(foodReducer,initialState.food)
  const [isEditable, setIsEditable] = useState(true)

  async function handleSave(updatedFood) {
    await api.postFood(updatedFood).then(data => {
      console.log(data);
    })
    callback();
  }

  function handleCancel() {
    setIsEditable(false);
    callback();
  }

  function editBtns() {
    return (
      <div className='row'>
        <input type='submit' value='Save' onClick={() => handleSave(food)} className='btn btn-primary col' />
        <div className='btn btn-primary col' onClick={() => handleCancel()}>Cancel</div>
      </div>
    )
  }

  function roBtns() {
    return <div className='btn btn-primary' onClick={() => setIsEditable(true)} >UnSaved</div>
  }

  return (
    <Rows
    item={food}
    dispatch={foodDispatch}
    keys={initialState.keys}
    isEditable={isEditable}
    editBtns={editBtns}
    roBtns={roBtns}
    />
  )
}

export {
  FoodItem,
  NewFood
}
