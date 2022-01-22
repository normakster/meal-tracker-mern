import React, { useState, useReducer, useEffect, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import api from './../api'
import InspectionBox from '../molecules/InspectionBox'
import StatsBox from '../molecules/StatsBox'
import Cook from '../organisms/Cook'
import Pantry from '../organisms/Pantry'
import StatsBox from '../modules/StatsBox'
import InspectionBox from '../modules/InspectionBox'
import Popup from '../components/modal.component'
import pantryReducer from '../reducers/pantry.reducer';
import mealReducer from '../reducers/meal.reducer';

import Popup from '../components/modal.component'


const initialMeal = {
  datetime: '2021-08-27T21:00:00.000Z',
  location: '',
  servingSize: 1,
  units_total: 1,
  nutrients: {
    calories: 'bad',
    protein: 'bad',
    fat: 'bad',
    carbohydrates: 'bad',
  },
  ingredients: [],
  allergies: [],
};

const CookPageNew = () => {
    let history = useHistory();
    let location = useLocation();
    let { id } = useParams();
    if(!id) id = (location.state) ? location.state.id : undefined;

    const [meal, mealDispatch] = useReducer(mealReducer,initialMeal);
    const [inventory, pantryDispatch] = useReducer(pantryReducer,[]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      async function fetch() {
        pantryDispatch({type:'pantry/fetch',payload:(await api.pantry.getAll())})
      }
      fetch()
    },[])

  

    async function handleSave() {
      function updateInventories() {
        meal.ingredients.forEach(async ingr => {
          pantryDispatch({type:'pantry/update', payload:{ id:ingr.food._id, key:'quantity', value:(((ingr.quantity * ingr.food.servingSize) - ingr.servings) / ingr.food.servingSize) }})
          let item = inventory.find(i => {
            return i._id === ingr.pantry_id
          });
          await api.pantry.put(item)
        })
      }
  
      if(id) {
      } else {
        await api.meals.post(meal)
        .then(data => {
          updateInventories();
        });
        history.push('/');
      }
    }

    return (
        <div id='Cook' className='container-fluid'>
          <Cook.Meta meal={meal} dispatch={mealDispatch} datetime={meal.datetime} callback={(date) => mealDispatch({type:'meal/update',payload:{key:'datetime',value:date}})} />
          <Cook.Buttons handleSave={null} showPopup={(e) => setShowModal(true)} toggle={meal.ingredients.length>0} />
          <StatsBox cache={meal} nutrients={meal.nutrients} />
          <Cook.Table items={meal.ingredients} dispatch={mealDispatch} />
          <Popup
              show={showModal}
              handleClose={(e) => setShowModal(false)}
              title='Pantry'
              body={<Pantry.Popup meal={meal} inventory={inventory} mealDispatch={mealDispatch} />}
              footer={<div></div>}
          />
          <InspectionBox name='Meal'>
              <pre>{JSON.stringify(meal, null, 1)}</pre>
          </InspectionBox>
        </div>
    )
}

export default CookPageNew