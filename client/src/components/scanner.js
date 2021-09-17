import React, { Fragment, useState, useContext } from 'react';

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
import { searchResult } from '../data/searchResults';

const XsetItem = React.createContext(null);


const Scanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [item, setItem] = useState(null);
  const [cache, setCache] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function search(term,brand) {
    let res = await api.upcSearch.post({query: term, requireAllWords:false});
    console.log(res.foods);
    setSearchResults(res);
  }

  return (
    <XsetItem.Provider value={setItem} >
      <Container fluid>
        {item ? <SelectedItem item={item} cache={cache} setCache={setCache} />
        : <div>
          <hr />
          <Row>
            <SearchInput value={searchTerm} setValue={setSearchTerm} />
          </Row>
          <Row>
            <Button variant='primary' onClick={() => search(searchTerm)}>Search</Button>
            <Button disabled variant='secondary' onClick={null}><strike>Scan</strike></Button>
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
