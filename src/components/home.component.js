import React, { Component } from 'react';
import Dashboard from './dashboard.component'
import QuickBites from './quickbites.component'

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quickies } = this.props;
    return(
      <div>
        <Dashboard />
        <QuickBites quickies={quickies} />
      </div>
    )
  }
}
