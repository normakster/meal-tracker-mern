import { useState, useEffect } from 'react';
import {InputText} from './meal.component';

function IngredientsList({ arr, callback }) {
  return (
    <div>
      <h3>Ingredient List</h3>
      <table className='table table-sm'>
        <thead className='thead-info'>
          <tr>
            <td>Servings</td>
            <td>Ingredients</td>
            <td>kCal</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            arr.map((ing,i) => {
              return (
                <Ingredient key={i} ingredient={ing} callback={callback} />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const Ingredient = ({ key, ingredient, callback }) => {
  const [serv, setServ] = useState(0);
  ingredient.key = key;

  useEffect(() => {
      ingredient.serv = serv;
    },
    [serv],
  );

  return (
    <tr key={ingredient.id}>
      <td>
        <InputText label={'Servings'} name={'servings'} value={serv} callback={(e) => {setServ(e.target.value)}} />
      </td>
      <td>{ingredient.food.name}</td>
      <td>{ingredient.food.kCal}</td>
      <td>
        <button onClick={(e) => callback(ingredient.id)}>X</button>
      </td>
    </tr>
  )
}

export default IngredientsList;
