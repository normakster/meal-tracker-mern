import React, { Fragment, useState, useReducer, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import api from './../api'
import { updateObject, updateItemInArray }  from './../services/utilities'

import Pantry from './pantryItems'
import SearchInput from './food/search-component'

function pantryReducer(state, action) {
  switch (action.type) {
    case 'pantry/update':
      return state.map((item,i) => {
        if( item.food._id !== action.payload.id ) {
          return item
        }
        return updateObject({...item, [(action.payload.key)]: action.payload.value} );
      })
    case 'pantry/add':
      return [...state , { quantity: action.payload.quantity || 0, food: {...action.payload.food} }]
    case 'pantry/remove':
      return state.filter((item, index) => item.food._id !== action.payload.food._id)
    case 'pantry/fetch':
      if(action.payload !== undefined && action.payload) {
        return [...(action.payload)]
      }
      return state
    default:
      return state
  }
}

const PantryDispatch = React.createContext(null);

const PantryPage = () => {
  let history = useHistory();
  const [items, dispatch] = useReducer(pantryReducer,[]);
  const [filterValue, setFilterValue] = useState('');
  let filtered = items.filter(({ food }) => food.description.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  const Buttons = {
    Add: ({callback,disabled}) => <Col><Button variant={'success'} onClick={callback} disabled={disabled} >Add</Button></Col>,
  }

  useEffect(() => {
    async function fetch() {
      dispatch({type:'pantry/fetch',payload:(await api.pantry.getAll())})
    }
    fetch()
  },[])

  return (
    <PantryDispatch.Provider value={dispatch}>
      <Row>
        <Col>
      <SearchInput key={0} label='Search: ' search={filterValue} setSearch={setFilterValue} />
        </Col>
        <Buttons.Add callback={() => history.push('/Scanner')} />
      </Row>
      <br />
      <Row>
      <Pantry.Editable.Table items={filtered} />
      </Row>
    </PantryDispatch.Provider>
  )
}

export default PantryPage;

export {
  pantryReducer, PantryDispatch, Pantry,
}
