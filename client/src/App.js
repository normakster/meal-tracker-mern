import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar.component'
import Home from './components/home.component'
import About from './components/about'
import Meal from './components/meal/create-meal'
import Food from './components/food/food'

import { quickies, meals } from './data/dummy'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Switch>
        <Route exact path="/" >
          <Home quickies={quickies}/>
        </Route>
        <Route exact path="/Meal" >
          <Meal
            meals={meals}
          />
        </Route>
        <Route path="/Food/:id" >
          <Food
            foodItem={{_id:0}}
          />
        </Route>
        <Route path="/About">
          <About />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
