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

    this.setState({
      label: ''
    })
  }

  render() {
  	return(
      <form className='add-todo-form' onSubmit={ this.onSubmit }>
        <input type='text'
               placeholder='what need todo'
               onChange={ this.onChange }
               value={ this.state.label } />
        <button className='btn btn-outline-secondary'>Add</button>
      </form>
  	);
  }
}
