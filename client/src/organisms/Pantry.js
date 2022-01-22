import { useState, useEffect } from 'react';

import api from '../api'
import List from '../atoms/List'
import Formatter from '../atoms/Formatter'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../molecules/ButtonGroup'
import InputGroup from '../molecules/InputGroup'
import Buttons from '../atoms/Buttons'
import Formatter from '../atoms/Formatter'
import List from '../atoms/List'
import api from '../api'

const Pantry = {
    Buttons: function ({handleAdd}) {
        return (
            <ButtonGroup>
                <Buttons.Add callback={handleAdd} />
            </ButtonGroup>
        )
    },
    Popup: function ({ meal, inventory, mealDispatch }) {
        return (
            <List Head={Pantry.Head}>
                {inventory.map((item,i) => {
                    let inCache = false;
                    if(meal) {
                        meal.ingredients.forEach((ingr, i) => {
                            if(item.food._id === ingr.food._id) {
                                inCache = true;
                            }
                        })
                    }

                    function handleAddRemove() {
                        if(!inCache) {
                            mealDispatch({type: 'meal_food/add', payload:{id: item._id, quantity: item.quantity, food: item.food}});
                        } else {
                            mealDispatch({type: 'meal_food/remove', payload:{food: item.food}});
                        }
                    }
                    
                    return (
                        <tr key={i}>
                            <td key={0}>{item.quantity}</td>
                            <td key={1}>{item.food.description}</td>
                            <td key={2}>{item.food.labelNutrients.calories}</td>
                            <td key={3}>
                                {inCache
                                    ? <Buttons.Remove callback={handleAddRemove} />
                                    : <Buttons.Add callback={handleAddRemove} />
                                }
                            </td>
                        </tr>
                    )
                })}
            </List>
        )
    },
    Table: function ({items, dispatch, children}) {
        
        function handleUpdate(toUpdate, toggle) {
            if(toUpdate._id) {
                api.pantry.put(toUpdate)
            }
            if(Number(toUpdate.quantity) <= 0) dispatch({
                type: 'pantry/remove',
                payload:{food: toUpdate.food}
            })
            toggle();
        }

        function handleQuantityUpdate(e,toUpdate) {
            dispatch({
                type:'pantry/update',
                payload:{ 
                    id:toUpdate.food._id, 
                    key:'quantity', 
                    value:e.target.value }
            })
        }

        return (
            <div className='row border border-info mt-3'>
                <div className='container-fluid p-2 border border-info'>
                    <List Head={Pantry.Head} >
                        {children}
                        {items.map((item,i) => {
                            return (
                                <tr key={i}>
                                    <Pantry.Editable item={item} handleUpdate={handleUpdate} handleQuantityUpdate={handleQuantityUpdate} />
                                </tr>
                            )
                        })}
                    </List>
                </div> 
            </div>
        )
    },
    Editable: function ({item, handleUpdate, handleQuantityUpdate}) {
        const [isEditable,setIsEditable] = useState(item.quantity === 0);
        const toggleEditable = () => setIsEditable(!isEditable);

        return [
            <td key={0} >
                <input disabled={!isEditable} type="text"
                    name='count' className="" value={item.quantity} 
                    onChange={(e,toUpdate) => handleQuantityUpdate(e,item)}/>
            </td>,
            <td key={1} >{item.food.description}</td>,
            <td key={2} >{item.food.labelNutrients.calories}</td>,
            <td key={3} >
                { isEditable ? 
                    <Buttons.Update callback={(toUpdate, toggle) => handleUpdate(item,toggleEditable)} /> : 
                    <Buttons.Edit callback={toggleEditable} /> }
            </td>,
        ]
    },
    Head: function ({}) {
        return [
            <td key={0} >Quantity</td>,
            <td key={1} >Name</td>,
            <td key={2} >Calories</td>,
            <td key={3} >Action</td>,
        ]
    },
}

export default Pantry