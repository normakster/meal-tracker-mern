import { Fragment, useState, useReducer, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const initState = {
  items: [
    {
      name: 'one',
      count: 0,
      brand: 'original',
      class: 'bread'
    },
    {
      name: 'two',
      count: 1,
      brand: 'big box',
      class: 'pasta'
    }
  ],
}

function pantryReducer(state, action) {
  switch (action.type) {
    case 'pantry/init':
      return state
    case 'pantry/fetch':
      return state
    default:
      return state
  }
}

const Pantry = () => {
  const [items, dispatch] = useReducer(pantryReducer,initState.items);
  const [filterValue, setFilterValue] = useState('');
  let filteredItems = items.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  useEffect(() => {
    async function fetch() {
      dispatch({type:'pantry/fetch',payload:(
        // await api.getMeal(id)
        null
      )})
    }
    fetch()
  },[])

  return (
    <Container fluid>
      <input
        type='text'
        name='filter'
        className=''
        value={filterValue}
        onChange={(e) => {setFilterValue(e.target.value)}}
        placeholder='Search Pantry'
      />
      <hr />
      {filteredItems.map(item => {
        return (
          <ItemCard item={item} />
        )
      })}
    </Container>
  )
}

const ItemCard = ({ item }) => {
  const style = {margin: '10px'};
  return (
    <Row>
        <div style={style}>{item.count}</div>
        <div style={style}>{item.name}</div>
        <div style={style}>{item.brand}</div>
        <div style={style}>{item.class}</div>
    </Row>
  )
}

const ItemRecommendation = () => {
  // TODO: Suggest items that have 0 count, high use frequency, final partts of a recipe, or currently deficient in.

  return (
    <Fragment />
  )
}

export default Pantry;
