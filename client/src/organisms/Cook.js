import Table from '../atoms/Table'
import Formatter from '../atoms/Formatter'
import Date_Picker from '../atoms/DatePicker'
import Buttons from '../atoms/Buttons'
import InputGroup from '../molecules/InputGroup'

const Cook = {
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
    Tables: {
        Standard: (props) => <Table Head={Cook.Heads.Standard} Row={Cook.Rows.Editable} {...props} />,
    },
    Rows: {
        Editable: function (props) {
            const { item, dispatch } = props;

            function handleRemove() {
                dispatch({type: 'meal_food/remove', payload:{food: item.food}});
            }

            function handleUpdate(e) {
                dispatch({type:'meal_ingr/update',payload:{ id:item.id, servings:e.target.value }});
            }

            const Action = [Buttons.Remove,handleRemove];
            const ActionButton = Action[0];

            return [
                <td key={0}>{item.quantity * item.food.servingSize}</td>,
                <td key={1}>
                    <input type='text' name='servings' className=''
                        placeholder='Servings (required)'
                        value={item.servings} onChange={(e) => handleUpdate(e)}
                    />
                </td>,
                <td key={2}>{item.food.description}</td>,
                <td key={3}>{item.food.labelNutrients.calories}</td>,
                <td key={4}><ActionButton callback={Action[1]} /></td>,
            ]
        },
    },
    Heads: {
        Standard: function () {
            return [
                <th key={0}>Available</th>,
                <th key={1}>Servings</th>,
                <th key={2}>Ingredient</th>,
                <th key={3}>Calories</th>,
                <th key={4}>Action</th>,
            ]
        },
    },
}

export default Cook