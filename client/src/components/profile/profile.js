import { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

let initial = {
  nutriRatios: {
    protien: .4,
    carb: .4,
    fat: .2
  },
  allergies: [
    'dairy'
  ],
  targets: {
    daily_cal: 2000,
    diet_cal: -500,
    exercise_cal: 0,
    current_weight: 214,
    weight: 185,
  }
}

function profileReducer(state, action) {
  switch (action.type) {
    case 'profile_targets/updated':
      let prevState = JSON.parse(JSON.stringify(state));
      return {...prevState, targets: {...action.payload}}
    default:
      return state;
  }
}


const Profile = () => {
  const [profile,dispatch] = useReducer(profileReducer,initial);

  return (
    <Container fluid>
      <Col>
        <Row>
          <Form.Group>
            <Form.Label>Daily Calorie Target</Form.Label>
            <Form.Control type='text' placeholder='Daily Calorie Target' name='daily_cal' value={profile.targets.daily_cal}
              onChange={(e) => dispatch({type:'profile_targets/updated',payload:{...profile.targets, daily_cal:e.target.value}})} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Diet Calories</Form.Label>
            <Form.Control type='text' placeholder='Diet Calories' name='diet_cal' value={profile.targets.diet_cal}
              onChange={(e) => dispatch({type:'profile_targets/updated',payload:{...profile.targets, diet_cal:e.target.value}})} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Target Weight</Form.Label>
            <Form.Control type='text' placeholder='Target Weight' name='weight' value={profile.targets.weight}
              onChange={(e) => dispatch({type:'profile_targets/updated',payload:{...profile.targets, weight:e.target.value}})} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Current Weight</Form.Label>
            <Form.Control type='text' placeholder='Current Weight' name='current_weight' value={profile.targets.current_weight}
              onChange={(e) => dispatch({type:'profile_targets/updated',payload:{...profile.targets, current_weight:e.target.value}})} />
          </Form.Group>
        </Row>
        <InspectionBox profile={profile} />
      </Col>
    </Container>
  )
}

const InspectionBox = ({profile}) => {
  let history = useHistory();
  const [inspect,setInspect] = useState(false);
  const Buttons = {
    Inspect: ({callback,disabled}) => <Col><Button variant={'info'} onClick={() => setInspect(!inspect)} disabled={disabled} >Inspect</Button></Col>, 
  }
  return (
    <Row>
      <div id='transactional_data'>
        <Buttons.Inspect />
        {inspect && true && <pre>{JSON.stringify(profile, null, 1)}</pre>}
      </div>
    </Row>
  )
}

export default Profile
