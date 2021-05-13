import { useState, useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { foodReducer, initialState } from '../../meal/food-reducer'
import api from '../../api'

const Food = ({ foodItem }) => {
  let { id } = useParams();
  let history = useHistory();
  const [food,dispatch] = useReducer(foodReducer,initialState.food)

  useEffect(() => {
    api.getFood(id).then(data => {
      dispatch({type:'INIT',payload:data})
    })
  },[id])

  useEffect(() => {
    dispatch({type:'KCAL'})
  },[food.fat,food.protien,food.carb])

  function handleSave(updatedFood) {
    if(id) {
      api.putFood(updatedFood).then(data => {apiSuccess('Updated',data)})
    } else {
      api.postFood(updatedFood).then(data => {apiSuccess('Created',data)})
    }
  }

  function handleCancel(e) {
    history.goBack();
  }

  function handleRemove(e) {
    api.deleteFood(food._id).then((data) => {apiSuccess('Deleted',data)})
  }

  function apiSuccess(type,data) {
    // console.log(type + '!');
    console.log(type + ': ' + JSON.stringify(data._id));
    history.goBack();
  }


  const layout = {
    formGroup: 'form-group form-row',
    label: 'col-sm-1 col-form-label',
    inputDiv: 'col-sm-10',
    inputText: 'form-control mb-2',
  }

  return (
    <div className='container'>
      <form onSubmit={(e) => {e.preventDefault()}}>
        {/*displayData(food)*/}
        <div className='border border-info'>
          Details:
          <div className={layout.formGroup} >
            <label className={layout.label} >Name:</label>
            <div className={layout.inputDiv}>
              <input required name='name' type='text' className={layout.inputText}
                  value={food.name} placeholder='Name'
                  onChange={(e)=>dispatch({type:'NAME',payload:e.target.value})} />
              </div>
          </div>
          <div className={layout.formGroup} >
            <label className={layout.label} >Desc:</label>
            <div className={layout.inputDiv}>
              <input required name='desc' type='text' className={layout.inputText}
                  value={food.desc} placeholder='Description'
                  onChange={(e)=>dispatch({type:'DESC',payload:e.target.value})} />
              </div>
          </div>
        </div>
        <div className='border border-info'>
          Stats:
          <div className={layout.formGroup} >
            <label className={layout.label} >kCals:</label>
            <div className={layout.inputDiv}>
              <input required disabled name='kCal' type='text' className={layout.inputText}
                  value={food.kCal} placeholder='Calories'
                  onChange={(e)=>dispatch({type:'KCAL',payload:e.target.value})} />
              </div>
          </div>
        </div>
        <div className='border border-info'>
          Macros:
          <div className={layout.formGroup} >
            <label className={layout.label} >Fat (g):</label>
            <div className={layout.inputDiv} >
              <input required name='fat' type='text' className={layout.inputText}
                  value={food.fat} placeholder='Fat in Grams'
                  onChange={(e)=>dispatch({type:'FAT',payload:e.target.value})} />
              </div>
          </div>
          <div className={layout.formGroup} >
            <label className={layout.label} >Protien (g):</label>
            <div className={layout.inputDiv} >
              <input required name='protien' type='text' className={layout.inputText}
                  value={food.protien} placeholder='Protien in Grams'
                  onChange={(e)=>dispatch({type:'PROTIEN',payload:e.target.value})} />
              </div>
          </div>
          <div className={layout.formGroup} >
            <label className={layout.label} >Carb (g):</label>
            <div className={layout.inputDiv} >
              <input required name='carb' type='text' className={layout.inputText}
                  value={food.carb} placeholder='Carbs in Grams'
                  onChange={(e)=>dispatch({type:'CARB',payload:e.target.value})} />
              </div>
          </div>
        </div>
        <div className='border border-info'></div>
        <input type='submit' value='Save' onClick={() => handleSave(food)}
        className='btn btn-primary col' />
        <div className='btn btn-warning col' onClick={(e) => handleCancel(e)}>Cancel</div>
        <div className='btn btn-danger col' onClick={(e) => handleRemove(e)}>Remove</div>
      </form>
    </div>
  )
}

export default Food
