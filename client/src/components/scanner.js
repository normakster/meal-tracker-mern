import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { PantryTable } from './pantry'
import FdaItems from './FdaItems'
import FoodItems from './foodItems';
import api from './../api'
import { fdaFood, inventory } from '../data/dummy';
const searchResult = {};

const XsetItem = React.createContext(null);


const Scanner = () => {
  let history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [item, setItem] = useState(null);
  const [cache, setCache] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function search(term,brand) {
    let res = await api.upcSearch.post({query: term, requireAllWords:false});
    console.log(res.foods);
    setSearchResults(res);
  }

  const Buttons = {
    Search: ({callback,disabled}) => <Col><Button variant={'primary'} onClick={callback} disabled={disabled} >Search</Button></Col>,
    Scan: ({callback,disabled}) => <Col><Button variant={'secondary'} onClick={callback} disabled={disabled} ><strike>Scan</strike></Button></Col>,
    Done: ({callback,disabled}) => <Col><Button variant={'success'} onClick={callback} disabled={disabled} >Done</Button></Col>,
  }

  return (
    <XsetItem.Provider value={setItem} >
      <Container fluid>
        {item ? <SelectedItem item={item} cache={cache} setCache={setCache} />
        : <div>
          <hr />
          <Row>
            <Col><SearchInput value={searchTerm} setValue={setSearchTerm} /></Col>
            <Buttons.Search callback={() => search(searchTerm)} />
            <Buttons.Scan callback={null} disabled />
            <Buttons.Done callback={() => history.push('/Pantry')} />
          </Row>
          <hr />
            <Details items={searchResults.foods} searchResults={searchResults} />
        </div>}
      </Container>
    </XsetItem.Provider>
  )
}

function SelectedItem({ item, cache, setCache }) {
  return (
    <Row>
      <FoodItems.Selected.Table items={[item]} />,
    </Row>
  )
}

function Details({ items, searchResults }) {
  return (
    <Row>
      <FoodItems.SearchResults.Table items={items} />
      {/*
      <pre>{searchResults && JSON.stringify(searchResults, null, 1)}</pre>
      <pre>{(items)? JSON.stringify(items[0].fdcId, null, 1) : ''}</pre>
      <FdaItems.Basic.Table items={items} />
      */}
    </Row>
  )
}

function SearchInput({ value, setValue }) {
  return (
    <div>
      <input type='text' name='search' className=''
        value={value} onChange={(e) => {setValue(e.target.value)}}
        placeholder='Search UPC or Name' />
      <div className='col-auto btn btn-light' onClick={() => setValue('')}>X</div>
    </div>
  )
}

export {
  XsetItem
}
export default Scanner
