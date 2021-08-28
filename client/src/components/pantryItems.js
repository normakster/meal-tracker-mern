import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button'

import { PantryTable, PantryDispatch } from './pantry'
import api from './../api'

const PantryItems = {
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
        <td key={1} >{item.labelNutrients.calories.value}</td>
      ]
    },

    Table: function ({ items }) {
      function callback(Body) {
        return items.map((item,index) => <tr key={index} >{
          Body({ item:item.food, index })
        }</tr>)
      }
      return <PantryTable Head={PantryItems.Basic.Head} override={callback(PantryItems.Basic.Body)} items={items} />
    }
  },

  Standard: {
    Head: function () {
      return [
        <td key={0}>Quantity</td>,
        <PantryItems.Basic.Head key={1} />
      ]
    },

    Body: function ({ item }) {
      return [
        <td key={0} >{item.quantity}</td>,
        <PantryItems.Basic.Body key={1} item={item.food} />
      ]
    },

    Table: ({ items }) => <PantryTable Head={PantryItems.Standard.Head} Body={PantryItems.Standard.Body} items={items} />,
  },

  Editable: {
    Head: function () {
      return [
        <td key={0}>Quantity</td>,
        <PantryItems.Basic.Head key={1} />,
        <td key={2}>Action</td>
      ]
    },

    Body: function ({ item, index}) {
      const dispatch = useContext(PantryDispatch);
      const [isEditable, setIsEditable] = useState(false);

      function toggleEditable() {
        setIsEditable(prev => !prev);
      }

      function handleUpdate() {
        if(item._id) {
          api.pantry.put(item);
          if(Number(item.quantity) === 0) dispatch({type: 'pantry/remove', payload:{food: item.food}});
        }
        toggleEditable();
      }

      return [
        <td key={0} >
          <input disabled={!isEditable} type="text"
            name='count' className=""
            value={item.quantity} onChange={(e) => dispatch({type:'pantry/update',
              payload:{ index:index, key:'quantity', value:e.target.value }})}/>
        </td>,
        <PantryItems.Basic.Body key={1} item={item.food} />,
        <td key={2}>
          {isEditable
            ? PantryItems.Editable.Buttons.Update(handleUpdate)
            : PantryItems.Editable.Buttons.Edit(toggleEditable)
          }
        </td>
      ]
    },

    Table: ({ items }) => <PantryTable Head={PantryItems.Editable.Head} Body={PantryItems.Editable.Body} items={items} />,

    Buttons: {
      Edit: (callback) => <Button variant={'warning'} onClick={callback} >Edit</Button>,
      Update: (callback) => <Button variant={'success'} onClick={callback} >Update</Button>
    }
  }
};

export default PantryItems
