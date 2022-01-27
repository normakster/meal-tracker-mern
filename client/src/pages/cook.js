import React, { useState, useReducer, useEffect, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import api from './../api'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../atoms/ButtonGroup'
import InspectionBox from '../molecules/InspectionBox'
import StatsBox from '../molecules/StatsBox'
import Cook from '../organisms/Cook'
import Pantry from '../organisms/Pantry'
import pantryReducer from '../reducers/pantry.reducer';
import mealReducer from '../reducers/meal.reducer';

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
    
    const [showModal, setShowModal] = useState(false);
    const [meal, mealDispatch] = useReducer(mealReducer,initialMeal);
    const [inventory, pantryDispatch] = useReducer(pantryReducer,[]);

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

    function openModal() {
      setShowModal(true)
    }
    
    const Action = (meal.ingredients.length>0)? [Buttons.More_Items,openModal] : [Buttons.Add_Items,openModal];
    const ModalButton = Action[0];

    return (
        <div id='Cook' className='container-fluid'>
          
          <Cook.Meta meal={meal} dispatch={mealDispatch} datetime={meal.datetime} callback={(date) => mealDispatch({type:'meal/update',payload:{key:'datetime',value:date}})} />
          
          <ButtonGroup>
            <ModalButton callback={Action[1]} />
          </ButtonGroup>

          <StatsBox cache={meal} nutrients={meal.nutrients} />
          
          {(meal.ingredients.length>0) && 
            <Cook.Tables.Standard items={meal.ingredients} dispatch={mealDispatch} />
          }

          <ButtonGroup>
            <Buttons.Save callback={handleSave} />
          </ButtonGroup>
          
          <Pantry.Tables.PopUp
            show={showModal} close={setShowModal} 
            items={inventory} meal={meal} dispatch={mealDispatch}
          ></Pantry.Tables.PopUp>
          

          <InspectionBox name='Meal'>
              <pre>{JSON.stringify(meal, null, 1)}</pre>
          </InspectionBox>
        </div>
    )
}

export default CookPageNew