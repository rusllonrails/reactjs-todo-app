import React, { Component } from 'react';

import AppHeader from './../app-header';
import SearchPanel from './../search-panel';
import TodoList from './../todo-list';
import ItemStatusFilter from './../item-status-filter';
import AddTodoItem from './../add-todo-item';

import './app.css';

export default class App extends Component {

  maxId = 100;

  constructor() {
    super();
    this.state = {
      todoData: [
        this.createTodoItem('Learn React JS'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ]
    };
  }

  createTodoItem(text) {
    return {
      label: text,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const currentItem = arr[idx];

    const updatedItem = {
      ...currentItem,
      [propName]: !currentItem[propName]
    };

    const newArray = [
      ...arr.slice(0, idx),
      updatedItem,
      ...arr.slice(idx + 1)
    ];

    return newArray;
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return(
        {
          todoData: newArray
        }
      );
    });
  }

  addItem = (text) => {
    this.setState(({todoData}) => {
      const newItem = this.createTodoItem(text);

      const newTodoData = [
        ...todoData,
        newItem
      ]

      return({
        todoData: newTodoData
      });
    });
  }

  markAsDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  markAsImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData}
                  onDeleted={ this.deleteItem }
                  markAsDone={ this.markAsDone }
                  markAsImportant={ this.markAsImportant } />
        <AddTodoItem onItemAdded={ (text) => this.addItem(text) }/>
      </div>
    );
  }
};
