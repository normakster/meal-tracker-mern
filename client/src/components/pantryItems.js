import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { PantryTable, PantryDispatch, pantryReducer } from './pantry'
import { XmealDispatch } from './cook'
import api from './../api'
import { Assembled } from '../services/utilities'

const Pantry = {
  reducer: pantryReducer,
  Basic: {
    Head: function () {
      return [
        <td key={0}>Name</td>,
        <td key={1}>Calories</td>
      ]
    },
    Body: function ({ item }) {
      return [
        <td key={0} >{item.description}</td>,
        <td key={1} >{
          item.labelNutrients.calories
        }</td>
      ]
    },
    Table: function ({ items }) {
      function callback(Body) {
        return items.map((item,index) => <tr key={index} >{
          <Body item={item.food} index={index} />
        }</tr>)
      }
      return <Assembled Head={Pantry.Basic.Head} override={callback(Pantry.Basic.Body)} items={items} />
    }
  },
  Standard: {
    Head: function () {
      return [
        <td key={0}>Quantity</td>,
        <Pantry.Basic.Head key={1} />
      ]
    },
    Body: function ({ item }) {
      return [
        <td key={0} >{item.quantity}</td>,
        <Pantry.Basic.Body key={1} item={item.food} />
      ]
    },
    Table: ({ items }) => <Assembled Head={Pantry.Standard.Head} Body={Pantry.Standard.Body} items={items} />,
  },
  Editable: {
    Head: function () {
      return [
        <td key={0}>Quantity</td>,
        <Pantry.Basic.Head key={1} />,
        <td key={2}>Action</td>
      ]
    },
    Body: function ({ item, index }) {
      const dispatch = useContext(PantryDispatch);
      const [isEditable,setIsEditable] = useState(false);

      const toggle = () => setIsEditable(!isEditable);

      function handleUpdate() {
        if(item._id) {
          api.pantry.put(item);
          if(Number(item.quantity) === 0) dispatch({
            type: 'pantry/remove',
            payload:{food: item.food}
          });
        }
        toggle();
      }

      return [
        <td key={0} >
          <input disabled={!isEditable} type="text"
            name='count' className=""
            value={item.quantity} onChange={(e) => dispatch({type:'pantry/update',
              payload:{ id:item.food._id, index:index, key:'quantity', value:e.target.value }})}/>
        </td>,
        <Pantry.Basic.Body key={1} item={item.food} />,
        <td key={2}>
          {isEditable
            ? <Pantry.Editable.Buttons.Update callback={handleUpdate} />
            : <Pantry.Editable.Buttons.Edit callback={toggle} />
          }
        </td>
      ]
    },
    Table: ({ items }) => <Assembled Head={Pantry.Editable.Head} Body={Pantry.Editable.Body} items={items} />,
    Buttons: {
      Edit: ({callback}) => <Button variant={'info'} onClick={callback} >Edit</Button>,
      Update: ({callback}) => <Button variant={'success'} onClick={callback} >Update</Button>
    }
  },
  Meal: {
  },
  List: {
    Table: (props) => {
      const { meal,items } = props;
      return (
        <Table bordered hover>
          <thead>
            <tr>
              <td key={0}>Quantity</td>
              <Pantry.Basic.Head key={1} />
              <td key={2}>Action</td>
            </tr>
          </thead>
          <tbody>
            {items.map((item,i) => {
              let inCache = false;
              if(meal) {
                meal.ingredients.forEach((ingr, i) => {
                  if(item.food._id === ingr.food._id) {
                    inCache = true;
                  }
                });
              }
              return <Pantry.List.Row key={i} item={item} inCache={inCache} />
            })}
          </tbody>
        </Table>
      )
    },
    Row: (props) => {
      const { item,inCache } = props;
      const mealDispatch = useContext(XmealDispatch);
      function handleAddRemove() {
        if(!inCache) {
          mealDispatch({type: 'meal_food/add', payload:{food: item.food}});
        } else {
          mealDispatch({type: 'meal_food/remove', payload:{food: item.food}});
        }
      }

      return (
        <tr>
          <td key={0}>{item.quantity}</td>
          <td key={1}>{item.food.description}</td>
          <td key={2}>{item.food.labelNutrients.calories}</td>
          <td key={3}>
            {inCache
              ? <Pantry.List.Buttons.Remove callback={handleAddRemove} />
              : <Pantry.List.Buttons.Add callback={handleAddRemove} />
            }
          </td>
        </tr>
      )
    },
    Buttons: {
      Add: ({callback}) => <Button variant={'success'} onClick={callback} >Add</Button>,
      Remove: ({callback}) => <Button variant={'warning'} onClick={callback} >X</Button>
    }
  }
};

export default Pantry
