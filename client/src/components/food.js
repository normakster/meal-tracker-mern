import { useEffect, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import api from './../api'
import FoodItems, { Meta, Nutrient } from './foodItems';

const FoodPage = () => {
  let history = useHistory();
  let location = useLocation();
  let id = location.state ? location.state.id : undefined;
  const [food,dispatch] = useReducer(FoodItems.itemReducer,{});

  const Buttons = {
    Save: ({callback,disabled}) => <Col><Button variant={'primary'} onClick={callback} disabled={disabled} >Save</Button></Col>,
    Cancel: ({callback,disabled}) => <Col><Button variant={'warning'} onClick={callback} disabled={disabled} >Cancel</Button></Col>,
    Remove: ({callback,disabled}) => <Col><Button variant={'danger'} onClick={callback} disabled={disabled} >Remove</Button></Col>,
  }

  function handleSave() {
    if(id) {
      api.upcFoods.post(food).then(data => apiSuccess('Updated',data.data))
    } else {
      api.upcFoods.post(food).then(data => apiSuccess('Created',data.data))
    }
  }

  function handleCancel(e) {
    console.log(history.location.state);
    history.goBack();
  }

  function handleRemove(e) {
    // api.upcFoods.delete(food._id).then(data => apiSuccess('Deleted',data))
    alert('Deleted')
  }

  function apiSuccess(type,data) {
    console.log(type + ': ' + JSON.stringify(data._id));
    history.goBack();
  }

  useEffect(() => {
    async function fetch() {
      dispatch({type:'food/init',payload:(FoodItems.empty())})
    }
    fetch()
  },[])

  return (
    <div>
      <Row>
        <Buttons.Save callback={handleSave} />
        <Buttons.Cancel callback={handleCancel} />
        <Buttons.Remove disabled={!food._id} callback={handleRemove} />
      </Row>
      {false && <h5>Food Page:</h5>}
      <Row>
        <Meta item={food} dispatch={dispatch} />
        <Nutrient item={food} dispatch={dispatch} />
      </Row>
      {true && <pre>{(false)? JSON.stringify(food, null, 1) : ''}</pre>}
      {true && <pre>{JSON.stringify(food, null, 1)}</pre>}
    </div>
  )
}


export default FoodPage
