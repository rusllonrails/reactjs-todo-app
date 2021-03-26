import React, { Component } from 'react';

import './add-todo-item.css';

export default class AddTodoItem extends Component {

  state = {
    label: ''
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { onItemAdded } = this.props;
    onItemAdded(this.state.label);
    document.querySelector("input.js-add-item-input").value = '';
  }

  render() {
  	return(
      <form className='add-todo-form' onSubmit={ this.onSubmit }>
        <input type='text'
               placeholder='what need todo'
               onChange={ this.onChange }
               className='js-add-item-input' />
        <button className='btn btn-outline-secondary'>Add</button>
      </form>
  	);
  }
}
