import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import api from '../../api'
import { foodsReducer } from './foods-reducer'
import { NewFood } from './food-item';
import SearchInput from '../search-component'

// Business Logic

async function fetchAll(dispatch) {
  api.getAllFoods().then(data => {
    dispatch({type:'FETCH_ALL',foods:data});
  })
}

// Components

const FoodRow = ({ food, inCache, mealDispatch }) => {

  function handleAddRemove() {
    if(!inCache) {
      mealDispatch({type: 'ADD_INGR', food: food});
    } else {
      mealDispatch({type: 'REMOVE_INGR_BYFOOD', food: food});
    }
  }

  return (
    <tr onClick={handleAddRemove} >
      <td>{food.name}</td>
      <td>{food.desc}</td>
      <td>{food.kCal}</td>
      <td>
        <Link to={{pathname: "/Food/",state:{id:food._id}}}
        className='btn btn-info'>Edit</Link>
      </td>
      <td>
        <Button className='warning' onClick={handleAddRemove} >{inCache ? 'X' : 'Add'}</Button>
      </td>
    </tr>
  )
}

const FoodList = ({ meal, mealDispatch }) => {
  const [foods,foodsDispatch] = useReducer(foodsReducer,[]);
  let [newFoodItem, setNewFoodItem] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  let filteredFoods = foods.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);


  useEffect(async () => {
    foodsDispatch({type:'foods/fetchAll',payload:(await api.getAllFoods())})
  },[])

  function resetNewFood() {
    setNewFoodItem(null);
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
            meal.ingredients.forEach((c) => {
                if(food._id === c.food._id) {
                  inCache = true;
                }
            });
            return <FoodRow food={food} inCache={inCache} mealDispatch={mealDispatch} key={'foodRow-'+i}/>
          })}
        </tbody>
      </Table>
      {/*
      <div className='container border border-info'>
        <div className='row'>
          <div className='col'>Name</div>
          <div className='col'>Desc.</div>
          <div className='col'>kCal</div>
          <div className='col'></div>
        </div>
        {
          filteredFoods.map((food,i) => {
            let inCache = false;
            meal.ingredients.forEach((c) => {
              if(food._id === c.food._id) {
                inCache = true;
              }
            });

            return (
              <FoodItem
                foodItem={food}
                foodsDispatch={foodsDispatch}
                ingrDispatch={dispatch}
                inCache={inCache}
                key={food._id}
                />
            )
          })
        }
        {newFoodItem}
      </div>
      */}
      <br />
      <br />
      <div
        onClick={() => setNewFoodItem(<NewFood callback={resetNewFood}/>)}
        className='btn btn-info'
      >Add New</div>
      <br />
      <br />
      <div
        onClick={() => console.log(foods)}
        className='btn btn-light'
      >CHECK_STATE</div>
    </Container>
  )
}

export default FoodList;
