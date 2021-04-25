import React, { Component, useState } from 'react';
import Table from './table.component'
import Modal from "./modal.component";
import FoodList from "./food-list.component";

const InputText = (props) => {
  return(
    <input
      type="text"
      className="form-control"
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default function Meal(props) {
  const [modal, setModal] = useState(false);
  const [meal, setMeal] = useState(props.meals[0]);
  function modalOpen() {
    setModal(true);
  }

  function modalClose() {
    setModal(false);
  }

  function handleChange(key,e) {
    const mealNew = Object.assign({}, meal);
    mealNew[key] = e.target.value;
    setMeal(mealNew);
  }

  function addNew(food) {
    const newMeal = meal;
    newMeal.ingredients.push(food);
    setMeal(newMeal);
  }

  function removeNew(obj) {
    setMeal(meal);
  }

    const { schema, foodSchema, foods } = props;
    return (
      <div><div>{meal.date}</div>
        {
          schema.map(s => {
            return (
              <div>
                <label>{s.title}
                  { ( s.value === 'ingredients' )
                    ? <div>
                        <Table
                          list={meal[s.value]}
                          schema={foodSchema}
                          action={removeNew}
                          actionName={'remove'}
                        />
                        <button onClick={e => modalOpen()} >Add</button>
                        <Modal show={modal} handleClose={e => modalClose()} >
                          <FoodList
                            foods={foods}
                            schema={foodSchema}
                            action={addNew}
                            actionName={'remove'}
                          />
                        </Modal>
                      </div>
                    : <InputText
                        value={meal[s.value]}
                        onChange={handleChange.bind(this,s.value)}
                      />
                  }
                </label>
              </div>
            )
          })
        }
        <button  >Save</button>
      </div>
    )
}

