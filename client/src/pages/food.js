import { useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import api from '../api'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../atoms/ButtonGroup'
import InspectionBox from '../molecules/InspectionBox'
import Food from '../organisms/Food'
import foodReducer from '../reducers/food.reducer';

const FoodPageNew = () => {
    let history = useHistory();
    let location = useLocation();
    let { id } = useParams();
    if(!id) id = location.state ? location.state.id : undefined;
    const [food,dispatch] = useReducer(foodReducer,empty);

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
        history.push('/Pantry')
        // history.goBack();
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

            <Food.Meta food={food} dispatch={dispatch} />
            
            <Food.Nutri food={food} dispatch={dispatch} />
            
            {/* <Food.NutriExtended food={food} dispatch={dispatch} /> */}
            
            <ButtonGroup>
                <Buttons.Save callback={handleSave} />
                <Buttons.Cancel callback={handleCancel} />
                <Buttons.Delete callback={handleRemove} disabled={!food._id} />
            </ButtonGroup>
            
            
            <InspectionBox name='Id'>
                <pre>{JSON.stringify(id, null, 1)}</pre>
            </InspectionBox>
            <InspectionBox name='Food'>
                <pre>{JSON.stringify(food, null, 1)}</pre>
            </InspectionBox>
        </div>
    )
}

const empty = {
    upc: '',
    description: '',
    brandOwner: '',
    dataSource: '',
    brandedFoodCategory: '',
    ingredients: '',
    servingSize: '',
    servingSizeUnit: '',
    labelNutrients: {
      fat: '',
      saturatedFat: '',
      transFat: '',
      cholesterol: '',
      sodium: '',
      carbohydrates: '',
      fiber: '',
      sugars: '',
      protein: '',
      calcium: '',
      iron: '',
      potassium: '',
      addedSugar: '',
      calories: '',
    },
    dataType: '',
}


export default FoodPageNew