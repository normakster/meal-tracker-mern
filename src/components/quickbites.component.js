import React, { Component } from 'react';

export default class QuickBites extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quickies } = this.props;

    return(
      <div>
        <div>Quick Bites: </div>
        <div>
          {quickies.map(bite => {
            return <QBButton bite={bite} />
          })}
        </div>
      </div>
    )
  }
}

const QBButton = (props) => {

  function handleClick(name) {
    alert('add: ' + name);
  }

  return(
    <button onClick={() => handleClick(props.bite.action)} >{props.bite.name}</button>
  )
}
