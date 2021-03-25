import React, { Component } from 'react';

import './add-todo-item.css';

export default class AddTodoItem extends Component {

  render() {
    const { onItemAdded } = this.props;

  	return(
      <div className='add-todo-item'>
        <button className='btn btn-outline-secondary' onClick={ () => onItemAdded('HEllo world') }>Add</button>
      </div>
  	);
  }
}