import React, { useState, useEffect, useReducer } from 'react';

// Initial State

// Business Logic

// Components

const Home = ({ quickies }) => {

  return (
    <div>
      <Dashboard />
      <QuickBites quickies={quickies} />
      <br />
    </div>
  )
}

const Dashboard = (props) => {
  return (
    <div>
      <div>Dashboard </div>
    </div>
  )
}

const QuickBites = ({ quickies }) => {

  return (
    <div>
      <div>Quick Bites: </div>
      <div>
        {quickies.map((bite,i) => {
          return <QBButton bite={bite} key={i} />
        })}
      </div>
    </div>
  )
}

const QBButton = ({ bite }) => {

  function handleClick(name) {
    alert('add: ' + name);
  }

  return(
    <button onClick={() => handleClick(bite.action)} >{bite.name}</button>
  )
}

export {
  Dashboard,
  QuickBites
}

export default Home;