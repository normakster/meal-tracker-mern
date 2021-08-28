import React, { Fragment, useState, useReducer, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import api from './../api'
import { updateObject, updateItemInArray }  from './../services/utilities'

import PantryItems from './pantryItems'
import SearchInput from './food/search-component'

function pantryReducer(state, action) {
  switch (action.type) {
    case 'pantry/update':
      return state.map((item,i) => {
        if( i !== action.payload.index ) {
          return item
        }
        return updateObject({...item, [(action.payload.key)]: action.payload.value} );
      })
    case 'pantry/add':
      return [...state , { quantity: action.payload.quantity || 0, food: {...action.payload.food} }]
    case 'pantry/remove':
      return state.filter((item, index) => item.food._id !== action.payload.food._id)
    case 'pantry/fetch':
      if(action.payload) {
        return [...(action.payload)]
      }
      return state
    default:
      return state
  }
}

const PantryDispatch = React.createContext(null);

const PantryPage = () => {
  const [items, dispatch] = useReducer(pantryReducer,[]);
  const [filterValue, setFilterValue] = useState('');
  let filtered = items.filter(({ food }) => food.description.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  return (
    <PantryDispatch.Provider value={dispatch}>
      <SearchInput key={0} label='Search: ' search={filterValue} setSearch={setFilterValue} />
      <Pantry key={1} items={filtered} />
    </PantryDispatch.Provider>
  )
}

const Pantry = ({ items, children }) => {
  const dispatch = useContext(PantryDispatch);

  useEffect(() => {
    async function fetch() {
      dispatch({type:'pantry/fetch',payload:(await api.pantry.getAll())})
    }
    fetch()
  },[])

  return (
      <PantryItems.Editable.Table items={items} />
  )
};

function PantryTable({ Head, Body, override, items }) {
  function callback(Body) {
    return items.map((item,index) => <tr key={index} >{
      Body({ item, index })
    }</tr>)
  }
  return (
    <Table bordered hover>
      <thead><tr><Head /></tr></thead>
      <tbody>
        {override || callback(Body)}
      </tbody>
    </Table>
  )
}

export default PantryPage;

export {
  pantryReducer, PantryDispatch, Pantry, PantryTable
}
