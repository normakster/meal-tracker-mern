import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './main/navbar.component'
import Home from './main/home.component'
import Meal from './meal/meal'
import { NewFood } from './meal/food-item'

import { quickies, meals } from './dumby/data'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact >
        <Home quickies={quickies}/>
      </Route>
      <Route path="/Meal" exact >
        <Meal
          meals={meals}
        />
      </Route>
      <Route path='/Foods' exact >
        <NewFood />
      </Route>
      </div>
    </Router>
  );
}

export default App;

// <Route path="/FoodList" exact >
//   <FoodList foods={foods} schema={foodSchema} />
// </Route>
