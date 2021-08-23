import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import Chart from 'chart.js/auto';

import MealHistory from './meal/meal-history'
import { quickies } from '../data/dummy'

// Initial State

// Business Logic

// Components

const Home = () => {

  return (
    <div>
      <MealHistory />
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
