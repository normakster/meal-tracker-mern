import { useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import api from './../api'
import FoodItems, { Meta, Nutrient } from './foodItems';

const FoodPage = () => {
  let history = useHistory();
  let location = useLocation();
  let { id } = useParams();
  if(!id) id = location.state ? location.state.id : undefined;
  const [food,dispatch] = useReducer(FoodItems.itemReducer,FoodItems.empty());
  const [inspect,setInspect] = useState(false);

  const Buttons = {
    Save: ({callback,disabled}) => <Col><Button variant={'primary'} onClick={callback} disabled={disabled} >Save</Button></Col>,
    Cancel: ({callback,disabled}) => <Col><Button variant={'warning'} onClick={callback} disabled={disabled} >Cancel</Button></Col>,
    Remove: ({callback,disabled}) => <Col><Button variant={'danger'} onClick={callback} disabled={disabled} >Remove</Button></Col>,
    Inspect: ({callback,disabled}) => <Col><Button variant={'info'} onClick={() => setInspect(!inspect)} disabled={disabled} >Inspect</Button></Col>, 
  }

  async function handleSave() {
    if(id) {
      let result = await api.upcFoods.put(food);
    } else {
      await api.upcFoods.post(food).then(data => apiSuccess('Created',data.data))
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
      if(id) {
        dispatch({type:'food/init',payload:((await api.upcFoods.get(id)).data)})
      }
    }
    fetch()
  },[id])

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
        <Nutrient item={food.labelNutrients} dispatch={dispatch} />
      </Row>
      <Row>
        <Buttons.Inspect />
      </Row>
      {inspect && <div>id:<pre>{JSON.stringify(id, null, 1)}</pre></div>}
      {inspect && <pre>{JSON.stringify(food, null, 1)}</pre>}
    </div>
  )
}


export default FoodPage
