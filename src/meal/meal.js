import { useState, useEffect } from 'react';
import FoodList from './food-list';
import IngredientsList from './ingredient-list';
import Modal from '../component/modal.component';

function Meal({ foods, ...props }) {
  const [modal, setModal] = useState(false);
  const [save, setSave] = useState(false);
  const [meal, setMeal] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [ingredients, setIngredients] = useState([]);

  function removeIngredient(i) {
    const arr = ingredients.filter(e => e.id !== i);
    setIngredients(arr);
  }

  function assembleMeal() {
    let prev = meal;
    prev.date = date;
    prev.time = time;
    prev.location = location;
    prev.ingredients = ingredients;
    setMeal(prev);
  }

  function saveMeal() {
    assembleMeal();
    setSave(!save);
  }

  return (
    <div><div>{date}</div>
      <div className='form-row'>
        <InputText label='Date' name='date' value={date} callback={(e) => {setDate(e.target.value)}} addGroup='col' />
        <InputText label='Time' name='time' value={time} callback={(e) => {setTime(e.target.value)}} addGroup='col' />
        <InputText label='Location' name='location' value={location} callback={(e) => {setLocation(e.target.value)}} addGroup='col' />
      </div>
      <div>
        <IngredientsList cache={ingredients} removeIngredient={removeIngredient}/>
        <button onClick={() => setModal(true)} >Add</button>
        <Modal show={modal} handleClose={() => setModal(false)} >
          <FoodList foods={foods} cache={ingredients} setCache={setIngredients} />
        </Modal>
      </div>


      <button onClick={(e) => {saveMeal()}} >Save</button>
      <br />
      <br />
      <div className={save ? "d-block" : "d-none"}>
        {JSON.stringify(meal, undefined, 2)}
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
