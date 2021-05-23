import { useEffect, useReducer } from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
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
        protien: (state.protien + (food.protien * serv)),
        carb: (state.carb +(food.carb * serv))
      }
      break;
    case 'reset':
      return {...state, ...initialStats}
      break;
    default:
      return state
  }
}

const initialStats = {
  kCal: 0,
  fat: 0,
  protien:0,
  carb: 0,
}

const StatsBox = ({cache, ...props }) => {
  const [stats,dispatch] = useReducer(statReducer,initialStats);
  const statNames = ['kCal','fat','protien','carb'];

  useEffect(() => {
    calcStats();
  },[cache.ingredients])

// TODO: Set one dispatch to handle update.
  function calcStats() {
    dispatch({type:'reset'})
    cache.ingredients.map(c => {
      dispatch({type:'statBox/update',payload:{food:c.food,serv:c.serv}})
    })
  }

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
