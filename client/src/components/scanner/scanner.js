import { Fragment, useState } from 'react';

import Button from 'react-bootstrap/Button'

const Search = ({ cache }) => {
  const [quantity, setQuantity] = useState('');

  function handleAccept(newFood) {
    cache.push(newFood);
    // history.goBack();
  }

  return (
    <div>
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <hr />
      <Scanner />
      <hr />
      <Button variant='primary' onClick={null}>Scan</Button>
      <hr />
      <Details />
    </div>
  )
}

const FoundItem = () => {
  return (
    <Fragment />
  )
}

const Scanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Fragment>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Button variant='primary' onClick={null}>-></Button>
    </Fragment>
  )
}

const Details = () => {
  return (
    <div><h3>Details:</h3></div>
  )
}

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type='text'
      name='search'
      className=''
      value={searchTerm}
      onChange={(e) => {setSearchTerm(e.target.value)}}
      placeholder='Search UPC or Name'
    />
  )
}

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <input
      type='text'
      name='quantity'
      className=''
      value={quantity}
      onChange={(e) => {setQuantity(e.target.value)}}
      placeholder='Units'
    />
  )
}

export default Search;
