import { useState } from 'react';
import FoodList from './food-list.component';
import IngredientsList from './ingredient-list.component';
import Modal from './modal.component';

function Meal({ foods, ...props }) {
  const [modal, setModal] = useState(false);
  const [save, setSave] = useState(false);
  const [meal, setMeal] = useState(props.meals[0]);
  const [date, setDate] = useState(props.meals[0].date);
  const [time, setTime] = useState(props.meals[0].time);
  const [location, setLocation] = useState(props.meals[0].location);
  const [ingredients, setIngredients] = useState(props.meals[0].ingredients);
  const [filterValue, setFilterValue] = useState('');

  function removeIngredient(i) {
    const arr = ingredients.filter(e => e.id !== i);
    setIngredients(arr);
  }

  function saveMeal() {
    let prev = meal;
    prev.date = date;
    prev.time = time;
    prev.locatoin = location;
    setMeal(prev);
    setSave(!save);
  }

  return (
    <div><div>{date}</div>
      <InputText label={'Date'} name={'date'} value={date} callback={(e) => {setDate(e.target.value)}} />
      <InputText label={'Time'} name={'time'} value={time} callback={(e) => {setTime(e.target.value)}} />
      <InputText label={'Location'} name={'location'} value={location} callback={(e) => {setLocation(e.target.value)}} />
      <div>
        <IngredientsList arr={ingredients} callback={removeIngredient}/>
        <button onClick={() => setModal(true)} >Add</button>
        <Modal show={modal} handleClose={() => setModal(false)} >
          <InputText label={'Search Foods: '} name={'searchInput'} value={filterValue} callback={(e) => {setFilterValue(e.target.value)}} />
          <FoodList foods={foods} cache={ingredients} callback={setIngredients} filterValue={filterValue} />
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

const InputText = ({ label, name, value, callback}) => {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
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

