import { useEffect, useReducer } from 'react';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

// TODO: move to seperate file, add init/reset, update type to domain/event format, add one bulk setter.
function statReducer(state, action) {
  switch (action.type) {
    case 'statBox/update':
      let food = action.payload.food;
      let serv = action.payload.serv;
      return {...state,
        kCal: (state.kCal + (food.kCal * serv)),
        fat: (state.fat + (food.fat * serv)),
        protein: (state.protein + (food.protein * serv)),
        carb: (state.carb +(food.carb * serv))
      }
    case 'reset':
      return {...state, ...initialStats}
    default:
      return state
  }
}

const initialStats = {
  kCal: 0,
  fat: 0,
  protein:0,
  carb: 0,
}

const StatsBox = ({cache, ...props }) => {
  const [stats,dispatch] = useReducer(statReducer,initialStats);
  const statNames = ['kCal','fat','protein','carb'];

  useEffect(() => {
    dispatch({type:'reset'})
    cache.ingredients.forEach(c => {
      dispatch({type:'statBox/update',payload:{food:c.food,serv:c.serv}})
    })
  },[cache.ingredients])


  return (
    <Row>
      <h5>Stats:</h5>
      <Table>
        <thead>
          <tr>{statNames.map((name) => <td key={'stat-head-'+name}>{name}</td>)}</tr>
        </thead>
        <tbody>
          <tr>{statNames.map((name) => <td key={'stat-'+name}>{stats[name]}</td>)}</tr>
        </tbody>
      </Table>
    </Row>
  )
}

export default StatsBox
