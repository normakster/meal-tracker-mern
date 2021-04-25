import React, { Component } from 'react';
import Table from './table.component'
import SearchInput from './search-input.component'

function filterItemsBy(arr, query, by) {
  return arr.filter(el => el[by].toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

export default class FoodList extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      newValue: '',
      filterValue: '',
    };
  }

  componentDidMount() {
    // console.log(this.props.foods);
  }

  handleInputChange(newValue) {
    this.setState({filterValue: newValue});
  }

  render() {
    const { filterValue } = this.state;
    const { foods, schema, action, actionName } = this.props;
    return(
      <div>
        <h3>Food List</h3>
        <SearchInput
          label={'Search Foods: '}
          value={filterValue}
          handleInputChange={this.handleInputChange}
        />
        <Table
          list={filterItemsBy(foods,filterValue,'name')}
          schema={schema}
          action={action}
          actionName={'add'}
        />
      </div>
    );
  }
}

