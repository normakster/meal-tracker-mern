import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar'
import { Home, Dashboard } from './components/home'
import About from './components/about'
import Meal from './components/meal/create-meal'
import Food from './components/food/food'


function App() {
  return (
    <Router>
      <div className='container'>
      <Navbar />
      <br/>
      <Switch>
        <Route exact path='/Meal' component={Meal} />
        <Route path='/Food/:id' component={Food} />
        <Route path='/Food/' component={Food} />
        <Route path='/About' component={About} />
        <Route exact path='/Home' component={Home} />
        <Route exact path='/' component={Home} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
