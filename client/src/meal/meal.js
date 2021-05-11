import { useState, useEffect, useReducer } from 'react';
import FoodList from './food-list';
import IngredientsList from './ingredient-list';
import Modal from '../components/modal.component';
import { ingredientsReducer } from './ingredient-reducer'
import { Tbl } from '../components/table.component'

// Initial State

const initialState = {
  ingredients: [],
  stats: {
    kCal: 0,
    fat: 0,
    protien:0,
    carb: 0,
  },
  statBoxLayot: {
    row: 'row',
    col: 'col',
  }
}

// Business Logic


// Components

const Meal = ({ ...props }) => {
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
      <div className='container border border-dark'>
        <div className='form-row'>
          <h5>Meal Data:</h5>
        </div>
        <div className='form-row'>
          <br />
          <InputText label='Date' name='date' value={date} callback={(e) => {setDate(e.target.value)}} addGroup='col' />
          <InputText label='Time' name='time' value={time} callback={(e) => {setTime(e.target.value)}} addGroup='col' />
          <InputText label='Location' name='location' value={location} callback={(e) => {setLocation(e.target.value)}} addGroup='col' />
        {/**/}
        </div>
        <br /><br />
        <div className='form-row'>
          <IngredientsList
            ingredients={ingredients}
            ingrDispatch={ingrDispatch}
            />
          </div>
      </div>
      <br /><br />
      <div className='container border border-dark'>
        <StatsBox cache={ingredients}/>
      </div>
      <br /><br />
      <div className='container border border-dark'>
        <FoodList
          ingredients={ingredients}
          ingrDispatch={ingrDispatch}
          />
      </div>
      <br /><br />
      <button onClick={(e) => {saveMeal()}} >Save</button>
      <TestingBox save={save} modal={modal} setModal={setModal} ingredients={ingredients} />
    </div>
  )
}

const StatsBox = ({cache, ...props }) => {
  const [stats,statsDispatch] = useReducer(statReducer,initialState.stats);
  // const [stats,setStats] = useState(initialState.stats);
  const layout = {...(initialState.statBoxLayot)};
  const statNames = ['kCal','fat','protien','carb'];

  useEffect(() => {
    calcStats();
  },[cache])

  function headerFormat(value) {
    return <span>{value}s:</span>
  }

  function rowFormat(value) {
    return <span>{value}</span>
  }

  function calcStats() {
    statsDispatch({type:'reset'})
    cache.map(c => {
      console.log(c.food);
      const kCal = c.food.kCal * c.serv
      statsDispatch({type:'kCal',payload:kCal})
    })
  }

  function statReducer(state = initialState.stats, action) {
    switch (action.type) {
      case 'kCal':
        console.log(state.kCal);
        console.log(action.payload);
        return {...state, kCal: (state.kCal + action.payload)}
        break;
      case 'reset':
        return {...state, ...(initialState.stats)}
        break;
      default:
        return state
    }
  }

  return (
    <div className=''>
      <h5>Stats:</h5>
      <Tbl
        layout={layout}
        keys={statNames}
        data={[stats]}
        headerFormat={headerFormat}
        rowFormat={rowFormat}
      />
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
