import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MealHistory from './meal/meal-history'
import { quickies } from '../data/dummy'

// Initial State

// Business Logic

// Components

const Home = ({ }) => {

  return (
    <div>
      <Dashboard />
      <br />
      <QuickBites />
      <br />
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

const QuickBites = ({  }) => {

  return (
    <div>
      <h5>Quick Bites: </h5>
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
  Home
}
