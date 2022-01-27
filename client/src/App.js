import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './organisms/navbar'
import About from './pages/about'

import ScannerNew from './pages/scanner'
import PantryPageNew from './pages/pantry'
import CookPageNew from './pages/cook'
import FoodPageNew from './pages/food'
import Profile from './pages/profile'

function App() {
  return (
    <Router basename="/">
      <div className='container'>
        <Navbar />
        <br/>
        <Switch>
          <Route path='/Food/:id' component={FoodPageNew} />
          <Route path='/Food' component={FoodPageNew} />
          <Route path='/Pantry' component={PantryPageNew} />
          <Route path='/Scanner' component={ScannerNew} />
          <Route path='/About' component={About} />
          <Route path='/Cook' component={CookPageNew} />
          <Route exact path='/Profile' component={Profile} />
          <Route exact path='/' component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
