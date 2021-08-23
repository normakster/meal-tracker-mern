import { useState, useEffect, useReducer } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
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
    exercise_cal: 0
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
        <Form.Group>
          <Form.Label>Daily Calorie Target</Form.Label>
          <Form.Control type='text' placeholder='Daily Calorie Target' name='daily_cal' value={profile.targets.daily_cal}
            onChange={(e) => dispatch({type:'profile_targets/updated',payload:{...profile.targets, daily_cal:e.target.value}})} />
        </Form.Group>
      </Col>
    </Container>
  )
}

export default Profile
