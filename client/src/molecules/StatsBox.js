import { useReducer, useEffect, } from 'react';

import InspectionBox from './InspectionBox'
import statsReducer from '../reducers/stats.reducer';

const StatsBox = ({cache, nutrients}) => {  
    const [stats,dispatch] = useReducer(statsReducer, nutrients? nutrients: initialStats);
    const statNames = ['calories','fat','protein','carbohydrates'];
    const initialStats = { calories: 0, fat: 0, protein:0, carbohydrates: 0, };
  
    useEffect(() => {
      dispatch({type:'reset',payload:{...initialStats}})
      cache.ingredients.forEach(c => {
        dispatch({type:'statBox/update',payload:{food:c.food.labelNutrients,serv:c.servings}})
      })
    },[cache])
  
    return (
      <div className='row border border-info'>
          <h5>Stats:</h5>
        <div className='container-fluid p-2 border border-info'>
          <div className='row'>
            {statNames.map((name) => <div className='col' key={'stat-head-'+name}>{name}</div>)}
          </div>
          <div className='row'>
            {statNames.map((name) => <div className='col' key={'stat-'+name}>{stats[name]}</div>)}
          </div>
          <InspectionBox name='Cache'>
              <pre>{JSON.stringify(cache.ingredients, null, 1)}</pre>
          </InspectionBox>
        </div>
      </div>
    )
  }

  export default StatsBox;