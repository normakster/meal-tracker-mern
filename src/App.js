import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Meal from "./components/meal.component";

import { foods, quickies, meals } from './dumby/data'

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
          foods={foods}
        />
      </Route>
      </div>
    </Router>
  );
}

export default App;

// <Route path="/FoodList" exact >
//   <FoodList foods={foods} schema={foodSchema} />
// </Route>
