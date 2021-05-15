import { useEffect, useReducer } from 'react';
import { Tbl } from '../table.component'


const initialStats = {
  kCal: 0,
  fat: 0,
  protien:0,
  carb: 0,
}

const StatsBox = ({cache, statBoxLayot, ...props }) => {
  const [stats,statsDispatch] = useReducer(statReducer,initialStats);
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

// TODO: Set one dispatch to handle update.
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

// TODO: move to seperate file, add init/reset, update type to domain/event format, add one bulk setter.
  function statReducer(state, action) {
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
        return {...state, ...initialStats}
        break;
      default:
        return state
    }
  }

  return (
    <div className=''>
      <h5>Stats:</h5>
      <Tbl
        layout={statBoxLayot}
        keys={statNames}
        data={[stats]}
        headerFormat={headerFormat}
        rowFormat={rowFormat}
      />
    </div>
  )
}

export default StatsBox
