import { useState, } from 'react';

import api from '../api'
import Table from '../atoms/Table'
import Buttons from '../atoms/Buttons'
import Popup from '../components/modal.component'

const Pantry = {
    Tables: {
        AddRem: (props) => <Table Head={Pantry.Heads.Standard} Row={Pantry.Rows.AddRem} {...props} />,
        Standard: (props) => <Table Head={Pantry.Heads.Standard} Row={Pantry.Rows.Editable} {...props} />,
        PopUp: (props) => {
            const { items, meal, dispatch, close } = props;
            return (
                <Popup title='Pantry' footer={<div></div>} handleClose={() => close(false)}
                    body={ <Pantry.Tables.AddRem items={items} meal={meal} dispatch={dispatch} /> }
                    {...props}
                />
            )
        },
    },
    Rows: {
        AddRem: function (props) {
            const { item, meal, dispatch } = props;
    
            let inCache = false;
            meal.ingredients.forEach((ingr, i) => {
                if(item.food._id === ingr.food._id) {
                    inCache = true;
                }
            })
    
            function handleAddRemove() {
                if(!inCache) {
                    dispatch({type: 'meal_food/add', payload:{id: item._id, quantity: item.quantity, food: item.food}});
                } else {
                    dispatch({type: 'meal_food/remove', payload:{food: item.food}});
                }
            }
    
            const Action = inCache? [Buttons.Remove,handleAddRemove] : [Buttons.Add,handleAddRemove];
            const ActionButton = Action[0];
    
            return [
                <td key={0}>{item.quantity}</td>,
                <td key={1}>{item.food.description}</td>,
                <td key={2}>{item.food.labelNutrients.calories}</td>,
                <td key={3}><ActionButton width='col-md-6' callback={Action[1]} /></td>,
            ]
        },
        Editable: function (props) {
            const {item, dispatch} = props;
            const [isEditable,setIsEditable] = useState(item.quantity === 0);
            const toggle = () => setIsEditable(!isEditable);
    
            async function handleUpdate() {
                if(item._id) {
                    await api.pantry.put(item)
                }
                if(Number(item.quantity) <= 0) dispatch({
                    type: 'pantry/remove',
                    payload:{food: item.food}
                })
                toggle();
            }
    
            function handleQuantityUpdate(e) {
                dispatch({
                    type:'pantry/update',
                    payload:{ 
                        id:item.food._id, 
                        key:'quantity', 
                        value:e.target.value }
                })
                // if(Number(item.quantity) <= 0) {
                //     dispatch({
                //         type: 'pantry/remove',
                //         payload:{food: item.food}
                //     })
                // }
            }
    
            const Action = isEditable? [Buttons.Update,handleUpdate] : [Buttons.Edit,toggle];
            const ActionButton = Action[0];
    
            return [
                <td key={0} >
                    <input disabled={!isEditable} type="text"
                        name='count' className="" value={item.quantity} 
                        onChange={(e) => handleQuantityUpdate(e)}/>
                </td>,
                <td key={1} >{item.food.description}</td>,
                <td key={2} >{item.food.labelNutrients.calories}</td>,
                <td key={3} ><ActionButton width='col-md-6' callback={Action[1]} /></td>,
            ]
        },
    },
    Heads: {
        Standard: function (props) {
            return [
                <th key={0} >Quantity</th>,
                <th key={1} >Name</th>,
                <th key={2} >Calories</th>,
                <th key={3} >Action</th>,
            ]
        },
    },
}

export default Pantry