import { useState, useEffect, useReducer } from 'react';
import { updateObject, updateItemInArray }  from '../../services/utilities'
import FoodList from '../food/food-list';
import IngredientsList from './ingredient-list';
import TestingBox from '../testingBox.component';
import { Tbl } from '../table.component'

// Initial State

const initialState = {
  meal: {
    date: '',
    time: '',
    location: '',
    ingredients: [],
  },
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

function mealReducer(state = initialState.meal, action) {
  switch (action.type) {
    case 'DATE':
      return {...state, date:action.payload}
      break;
    case 'TIME':
      return {...state, time:action.payload}
      break;
    case 'LOCATION':
      return {...state, location:action.payload}
      break;
    case 'ADD_INGR':
      return {
        ...state,
        ingredients: state.ingredients.concat({
          id: state.ingredients.reduce((maxId,item) => {
            return Math.max(maxId,item.id) + 1
          }, 0),
          serv: '',
          food: action.food,
        })
      }
      break;
    case 'REMOVE_INGR':
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) =>
          item.id !== action.id
        )
      }
      break;
    case 'REMOVE_INGR_BYFOOD':
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) =>
          item.food._id !== action.food._id
        )
      }
      break;
    case 'EDIT_INGR_SERV':
      const newIngredients = updateItemInArray(state.ingredients, action.id, ingr => {
        return updateObject(ingr, { serv: action.serv })
      })
      return {...state, ingredients:newIngredients}
      break;
    default:
      return state
  }
}

// Components

const Meal = ({ ...props }) => {
  const [meal, dispatch] = useReducer(mealReducer,initialState.meal)
  const [modal, setModal] = useState(false);

  const [save, setSave] = useState(false);

  function saveMeal() {
    setModal(!modal);
    setSave(!save);
  }

  return (
    <div>
      <div className='container border border-dark'>
        <div className='form-row'>
          <h5>Meal:</h5>
        </div>
        <div className='form-row'>
          <br />
          <InputText label='Date' name='date' value={meal.date} callback={(e) => dispatch({type:'DATE',payload:e.target.value})} addGroup='col' />
          <InputText label='Time' name='time' value={meal.time} callback={(e) => dispatch({type:'TIME',payload:e.target.value})} addGroup='col' />
          <InputText label='Location' name='location' value={meal.location} callback={(e) => dispatch({type:'LOCATION',payload:e.target.value})} addGroup='col' />
        </div>
        <br />
        <div className='container border border-dark'>
          <StatsBox cache={meal}/>
        </div>
        <br /><br />
        <div className='form-row'>
          <IngredientsList
            meal={meal}
            dispatch={dispatch}
            />
        </div>
        <br />
      </div>
      <br /><br />
      <div className='container border border-dark'>
        <FoodList
          meal={meal}
          dispatch={dispatch}
          />
      </div>
      <br /><br />
      <button onClick={(e) => {saveMeal()}} >Save</button>
      <TestingBox save={save} modal={modal} setModal={setModal} data={meal} />
    </div>
  )
}

const StatsBox = ({cache, ...props }) => {
  const [stats,statsDispatch] = useReducer(statReducer,initialState.stats);
  const layout = {...(initialState.statBoxLayot)};
  const statNames = ['kCal','fat','protien','carb'];

  useEffect(() => {
    calcStats();
  },[cache.ingredients])

  function headerFormat(value) {
    return <span>{value}s:</span>
  }

  function rowFormat(value) {
    return <span>{value}</span>
  }

  function calcStats() {
    statsDispatch({type:'reset'})
    cache.ingredients.map(c => {
      console.log(c.food);
      statsDispatch({type:'KCAL',payload:(c.food.kCal * c.serv)})
      statsDispatch({type:'FAT',payload:(c.food.fat * c.serv)})
      statsDispatch({type:'PROTIEN',payload:(c.food.protien * c.serv)})
      statsDispatch({type:'CARB',payload:(c.food.carb * c.serv)})
    })
  }

  function statReducer(state = initialState.stats, action) {
    switch (action.type) {
      case 'KCAL':
        return {...state, kCal: (state.kCal + action.payload)}
        break;
      case 'FAT':
        return {...state, fat: (state.fat + action.payload)}
        break;
      case 'PROTIEN':
        return {...state, protien: (state.protien + action.payload)}
        break;
      case 'CARB':
        return {...state, carb: (state.carb + action.payload)}
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
