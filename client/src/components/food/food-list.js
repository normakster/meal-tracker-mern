import { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import api from '../../api'
import { foodsReducer } from './foods-reducer'
import SearchInput from '../search-component'

// Business Logic

// Components

const FoodRow = ({ food, replaceHistory, inCache, mealDispatch }) => {
  let history = useHistory();

  function handleAddRemove() {
    if(!inCache) {
      mealDispatch({type: 'meal_food/add', payload:{food: food}});
    } else {
      mealDispatch({type: 'meal_food/remove', payload:{food: food}});
    }
  }

  function handleEdit() {
    replaceHistory();
    history.push({pathname: "/Food/",state:{id:food._id}});
  }

  return (
    <tr>
      <td>{food.name}</td>
      <td>{food.desc}</td>
      <td>{food.kCal}</td>
      <td>
      {/*
        <Link to={{pathname: "/Food/",state:{id:food._id}}}
        className='btn btn-info'>Edit</Link>
      */}
        <Button variant='info' onClick={handleEdit} >Edit</Button>
      </td>
      <td>
        <Button variant={inCache?'warning':'success'} onClick={handleAddRemove} >{inCache ? 'X' : 'Add'}</Button>
      </td>
    </tr>
  )
}

const FoodList = ({ meal, mealDispatch, ...props }) => {
  let history = useHistory();
  const [foods,foodsDispatch] = useReducer(foodsReducer,[]);
  const [filterValue, setFilterValue] = useState('');
  let filteredFoods = foods.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

  useEffect(() => {
    async function fetch() {
      foodsDispatch({type:'foods/fetchAll',payload:(await api.getAllFoods())})
    }
    fetch()
  },[])

  function addNew() {
    replaceHistory();
    history.push('/Food');
  }

  function replaceHistory() {
    history.replace({...history.location, state: {...history.location.state, meal:meal}});
  }

  return (
    <Container className='border border-dark'>
      <h5>Food List:</h5>
      <SearchInput filterValue={filterValue} setFilterValue={setFilterValue} />
      <Table bordered hover>
        <thead>
          <tr>
            <td>Name</td>
            <td>Desc.</td>
            <td>kCal</td>
            <td>Edit</td>
            <td>Add</td>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.map((food,i) => {
            let inCache = false;
            if(meal) {
              meal.ingredients.forEach((c) => {
                  if(food._id === c.food._id) {
                    inCache = true;
                  }
              });
            }
            return <FoodRow food={food} replaceHistory={replaceHistory} inCache={inCache} mealDispatch={mealDispatch} key={'foodRow-'+i}/>
          })}
          <tr><td colSpan='5'>
            <Button variant='info' onClick={addNew} >Create</Button>
          </td></tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default FoodList;
