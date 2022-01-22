import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

// import Chart from 'chart.js/auto';

import api from './../api'
import MealHistory from './meal/meal-history';
import Meal from './meal';
import About from './about';
import FoodItems from './foodItems';

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

const NewFoods = () => {
  const [foods, dispatch] = useReducer(FoodItems.Reducer,[{}]);

  useEffect(() => {
    async function fetch() {
      dispatch({type:'foods/init',payload:((await api.upcFoods.getAll()).data)})
    }
    fetch()
  },[])

  return (
    <div>
    </div>
  )
}

const Dashboard = ({ rawData,title }) => {
  const chartRef = React.createRef();
  let data = rawData();

  const dboardConfig = {
    type: 'line',
    data: {
      // labels: labels,
      datasets: [{
        label: title,
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        // parsing: {
        //     yAxisKey: 'kCal'
        // }
      }]
    },
    options: {}
  }

  // let chart = new Chart(chartRef.current,dboardConfig);

  useEffect(() => {
    // console.log(data);
    // console.log(dboardConfig.data.datasets[0].data);
    // chart.update();
  },[data])

  return (
    <div className='border rounded d-none' >
      <h5>Dashboard </h5>
      <canvas ref={chartRef} />
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
