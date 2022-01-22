import List from '../atoms/List'
import Formatter from '../atoms/Formatter'
import Date_Picker from '../atoms/DatePicker'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../molecules/ButtonGroup'
import InputGroup from '../molecules/InputGroup'
import Date_Picker from '../atoms/DatePicker'
import Formatter from '../atoms/Formatter'
import List from '../atoms/List'

const Cook = {
    Buttons: function ({toggle, handleSave, showPopup}) {
        return (
            <ButtonGroup>
                <Buttons.More_Items callback={showPopup} toggle={toggle} />
                <Buttons.Save callback={handleSave} />
            </ButtonGroup>
        )
    },
    Meta: function ({meal, dispatch, datetime, callback}) {
        return (
            <div>
                <InputGroup>
                    <Date_Picker datetime={datetime} callback={callback} />
                    <Formatter.InputItem title={'Location'} field={'location'} obj={meal} dispatch={dispatch} action={'meal/update'} />
                </InputGroup>
                <InputGroup>
                    <Formatter.InputItem title={'Serving Size'} field={'servingSize'} obj={meal} dispatch={dispatch} action={'meal/update'} />
                    <Formatter.InputItem title={'Total Servings'} field={'units_total'} obj={meal} dispatch={dispatch} action={'meal/update'} />
                </InputGroup>
            </div>
        )
    },
    Table: function ({items, dispatch}) {
        return (
            <div className='row border border-info mt-3'>
                <div className='container-fluid p-2 border border-info'>
                    <List items={items} Head={Cook.Head}>
                        {items.map((item,i) => {
                            return (
                                <tr key={i}>
                                    <Cook.Editable item={item} dispatch={dispatch} />
                                </tr>
                            )
                        })}
                    </List>
                </div>
            </div>
        )
    },
    Editable: function ({item, dispatch}) {
        function remove() {
            dispatch({type: 'meal_food/remove', payload:{food: item.food}});
        }
        return [
            <td key={0}>{item.quantity * item.food.servingSize}</td>,
            <td key={1}>
                <input type='text' name='servings' className=''
                    placeholder='Servings (required)'
                    value={item.servings} onChange={(e) => {
                    dispatch({type:'meal_ingr/update',payload:{ id:item.id, servings:e.target.value }})
                    }}
                />
            </td>,
            <td key={2}>{item.food.description}</td>,
            <td key={3}>{item.food.labelNutrients.calories}</td>,
            <td key={4}><Buttons.Remove callback={remove} /></td>,
        ]
    },
    Head: function () {
        return [
            <td key={0}>Available</td>,
            <td key={1}>Servings</td>,
            <td key={2}>Ingredient</td>,
            <td key={3}>Calories</td>,
            <td key={4}>Action</td>,
        ]
    }
}

export default Cook