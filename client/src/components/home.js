import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

// import Chart from 'chart.js/auto';

import MealHistory from './meal/meal-history';
import About from './about';

// Initial State
import { quickies } from '../data/dummy';

// Business Logic

// Components

const Home = () => {

  return (
    <div>
      <About />
      <br />
    </div>
  )
}

const Dashboard = ({  }) => {
  return (
    <div className='border rounded d-none' >
      <h5>Dashboard </h5>
    </div>
  )
}

const QuickBites = () => {

  return (
    <div>
      <h5>Favories: </h5>
      <div>
        {quickies.map((bite,i) => {
          return (
            <Link to={{ pathname: "/Meal/", state: {id:bite._id}}}
              className='btn btn-info' key={i} >
              {bite.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export {
  Dashboard,
  QuickBites,
  Home
}
