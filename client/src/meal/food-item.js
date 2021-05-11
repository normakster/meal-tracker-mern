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

const FoodItem = ({ food, foodsDispatch, ingrDispatch, inCache }) => {
  const [isEditable, setIsEditable] = useState(false);
  // const [food, foodDispatch] = useReducer(foodReducer,(foodItem)?foodItem:initialState.food)


  function handleClick() {
    if(!inCache) {
      ingrDispatch({type: 'ADD_INGR', food: food});
    } else {
      ingrDispatch({type: 'REMOVE_INGR_BYFOOD', food: food});
    }
  }

  // className='container'
  return (
    <div >
    {isEditable ? (
        <Editable food={food} />
      ) : (
        <ReadOnly food={food} onClick={() => handleClick()} inCache={inCache} />
      )
    }
    </div>
  )
}

const ReadOnly = ({ food, onClick, inCache }) => {
  return (
    <div className='row' onClick={onClick} >
      <div className='col'>{food.name}</div>
      <div className='col'>{food.desc}</div>
      <div className='col'>{food.kCal}</div>
      <div className='col'><button onClick={onClick}>{inCache ? '[X]' : '[ ]'}</button></div>
    </div>
  )
}

const NewFood = () => {
  const [food, foodDispatch] = useReducer(foodReducer,initialState.food)

  function handleOnSubmit(food) {
    foodDispatch({type:'ADD_FOOD', food})
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  }

  return (
    <Editable foodItem={food} lifter={handleOnSubmit} />
  )
}

const Editable = ({ foodItem, lifter }) => {
  const [food, setFood] = useState(foodItem);
  const [_id, setID] = useState(food._id);
  const [name, setName] = useState(food.name);
  const [desc, setDesc] = useState(food.desc);
  const [kCal, setKCal] = useState(food.kCal);

  useEffect(() => {
    const updatedFood = {
      _id: _id,
      name: name,
      desc, desc,
      kCal, kCal,
    };
    setFood(updatedFood);
  },[_id,name,desc,kCal])

  function onSubmit(e) {
    e.preventDefault();;
    lifter(food);
  }

  return (
    // <div className='row'>
      <form onSubmit={onSubmit} >
        <div className='form-row'>
          <div className='col-auto'>
            <label className='sr-only' >Name</label>
            <input
                required
                name='name'
                type='text'
                className='form-control mb-2'
                value={name}
                placeholder='Name'
                onChange={(e)=>{setName(e.target.value)}}
                />
          </div>
          <div className='col-auto'>
            <label className='sr-only' >Desc.</label>
            <input
                required
                name='desc'
                type='text'
                className='form-control'
                value={desc}
                placeholder='Desc.'
                onChange={(e)=>{setDesc(e.target.value)}}
                />
          </div>
          <div className='col-auto'>
            <label className='sr-only' >kCal</label>
            <input
                required
                name='kCal'
                type='text'
                className='form-control'
                value={kCal}
                placeholder='kCal'
                onChange={(e)=>{setKCal(e.target.value)}}
                />
          </div>
          <div className='col-auto'>
            <input type='submit' value='Save' className='btn btn-primary col' />
          </div>
        </div>
        <div className=''>{food._id}</div>
      </form>
    // </div>
  )
}

export {
  FoodItem,
  NewFood
}
