import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Meal from "./components/meal.component";
import FoodList from "./components/food-list.component";

import { foods, foodSchema, quickies, mealSchema, meals } from './dumby/data'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
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
          schema={mealSchema}
          foodSchema={foodSchema}
          foods={foods}
        />
      </Route>
      <Route path="/FoodList" exact >
        <FoodList foods={foods} schema={foodSchema} />
      </Route>
      </div>
    </Router>
  );
}

export default App;
