import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar'
import { Home, Dashboard } from './components/home'
import About from './components/about'
import Scanner from './components/scanner'
import PantryPage from './components/pantry'
import CookPage from './components/cook'
import Meal from './components/meal/create-meal'
import MealHistory from './components/meal/meal-history'
import FoodPage from './components/food';
import FoodList from './components/food/food-list';
import Food from './components/food/food'
import Profile from './components/profile/profile'

function App() {
  return (
    <Router basename="/">
      <div className='container'>
        <Navbar />
        <br/>
        <Switch>
          <Route exact path='/Meal/:id' component={Meal} />
          <Route exact path='/Meal' component={Meal} />
          <Route exact path='/MealHistory' component={MealHistory} />
          <Route exact path='/Profile' component={Profile} />
          <Route path='/NewFood/' component={FoodPage} />
          <Route path='/Foods/' component={FoodList} />
          <Route path='/Food/:id' component={Food} />
          <Route path='/Food/' component={Food} />
          <Route path='/About' component={About} />
          <Route path='/Scanner' component={Scanner} />
          <Route path='/Pantry' component={PantryPage} />
          <Route path='/Cook' component={CookPage} />
          <Route exact path='/Home' component={Home} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
