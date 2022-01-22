import { useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import InspectionBox from '../molecules/InspectionBox'
import api from '../api'
import foodReducer from '../reducers/food.reducer';
import Food from '../organisms/Food'

import FoodItems from '../components/foodItems';

const FoodPageNew = () => {
    let history = useHistory();
    let location = useLocation();
    let { id } = useParams();
    if(!id) id = location.state ? location.state.id : undefined;
    const [food,dispatch] = useReducer(foodReducer,{});

    async function handleSave() {
        if(id) {
            let result = await api.upcFoods.put(food);
        } else {
            await api.upcFoods.post(food).then(data => apiSuccess('Created',data.data))
        }
    }

    function handleCancel(e) {
      console.log(history.location.state);
      history.goBack();
    }

    function handleRemove(e) {
      alert('Deleted')
    }

    function apiSuccess(type,data) {
        console.log(type + ': ' + JSON.stringify(data._id));
        history.push('/PantryNew')
    }

    useEffect(() => {
        async function fetch() {
            if(id) {
            dispatch({type:'food/init',payload:((await api.upcFoods.get(id)).data)})
            }
        }
        fetch()
    },[id])

    return (
        <div id='Food' className='container-fluid'>
            <Food.Buttons handleSave={handleSave} handleCancel={handleCancel} handleRemove={handleRemove} disabled={!food._id}  />
            <Food.Meta food={food} dispatch={dispatch} />
            <Food.Nutri food={food} dispatch={dispatch} />
            <Food.NutriExtended food={food} dispatch={dispatch} />
            <InspectionBox name='Id'>
                <pre>{JSON.stringify(id, null, 1)}</pre>
            </InspectionBox>
            <InspectionBox name='Food'>
                <pre>{JSON.stringify(food, null, 1)}</pre>
            </InspectionBox>
        </div>
    )
}


export default FoodPageNew