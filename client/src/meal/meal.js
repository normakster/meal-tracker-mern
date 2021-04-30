import { useState, useEffect, useReducer } from 'react';
import FoodList from './food-list';
import IngredientsList from './ingredient-list';
import Modal from '../components/modal.component';
import { ingredientsReducer } from './ingredient-reducer'

// Initial State

const initialState = {
  ingredients: [],
}

// Business Logic


// Components

const Meal = ({ foods, ...props }) => {
  const [ingredients, ingrDispatch] = useReducer(ingredientsReducer,initialState.ingredients)

  const [modal, setModal] = useState(false);

  const [save, setSave] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  function saveMeal() {
    setModal(!modal);
    setSave(!save);
    return {
      date: date,
      time: time,
      location: location,
      ingredients: ingredients
    }
  }

  return (
    <div>
      <div className='form-row'>
        <InputText label='Date' name='date' value={date} callback={(e) => {setDate(e.target.value)}} addGroup='col' />
        <InputText label='Time' name='time' value={time} callback={(e) => {setTime(e.target.value)}} addGroup='col' />
        <InputText label='Location' name='location' value={location} callback={(e) => {setLocation(e.target.value)}} addGroup='col' />
      </div>
      <div className='form-row'>
        <IngredientsList
          ingredients={ingredients}
          ingrDispatch={ingrDispatch}
          />
      </div>
      <br /><br />
      <FoodList foods={foods}
        ingredients={ingredients}
        ingrDispatch={ingrDispatch}
        />
      <button onClick={(e) => {saveMeal()}} >Save</button>
      <TestingBox save={save} modal={modal} setModal={setModal} ingredients={ingredients} />
    </div>
  )
}

const TestingBox = ({ save, modal, ingredients, setModal }) => {
  return (
    <div>
      <br />
      <br />
      <div className={save ? "d-block" : "d-none"}>
        <button onClick={() => setModal(true)} >Alert()</button>
        <Modal show={modal} handleClose={() => setModal(false)} >
          <div>{JSON.stringify(ingredients)}</div>
        </Modal>
        // {JSON.stringify(ingredients, undefined, 2)}
      </div>
    </div>
  )
}

const InputText = ({ addGroup, addControl, label, name, value, callback}) => {
  return (
    <div className={'form-group ' + addGroup}>
      {label ? <label>{label}</label> : null }
      <input
        type="text"
        className={'form-control ' + addControl}
        name={name}
        value={value}
        onChange={callback}
      />
    </div>
  )
}

export {
  InputText
}
export default Meal;
