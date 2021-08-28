import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar'
import { Home, Dashboard } from './components/home'
import About from './components/about'
import Pantry from './components/pantry/pantry'
import Scanner from './components/scanner'
import Cook from './components/cook/cook'
import Meal from './components/meal/create-meal'
import FoodList from './components/food/food-list';
import Food from './components/food/food'
import Profile from './components/profile/profile'

function App() {
  return (
    <Router basename="/">
      <div className='container'>
        <Route path='/Pantry' component={Pantry} />
        <Route path='/Cook' component={Cook} />
        <Navbar />
        <br/>
        <Switch>
          <Route exact path='/Meal' component={Meal} />
          <Route exact path='/Profile' component={Profile} />
          <Route path='/Foods/' component={FoodList} />
          <Route path='/Food/:id' component={Food} />
          <Route path='/Food/' component={Food} />
          <Route path='/About' component={About} />
          <Route path='/Scanner' component={Scanner} />
          <Route exact path='/Home' component={Home} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
