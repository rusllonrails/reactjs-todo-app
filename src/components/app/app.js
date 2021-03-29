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
      ],
      term: '',
      filter: 'all'
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

  onSearchChanged = (term) => {
    this.setState({term});
  }

  onFilterChange = (filter) => {
    this.setState({filter});
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

  search(arr, term) {
    if (term.length < 1) {
      return arr;
    }

    return (
      arr.filter(
        (el) => el.label.toLowerCase().indexOf(this.state.term.toLowerCase()) > -1
      )
    );
  }

  filter(arr, filter) {
    switch (filter) {
      case 'all':
        return arr;
      case 'active':
        return arr.filter((item) => !item.done);
      case 'done':
        return arr.filter((item) => item.done);
      default:
        return arr;
    }
  }

  render() {
    const allItems = this.state.todoData;
    const doneList = allItems.filter((el) => el.done).length;
    const todoList = allItems.length - doneList;
    const visibleItems = this.filter(
      this.search(allItems, this.state.term), this.state.filter
    );

    return (
      <div className="todo-app">
        <AppHeader toDo={todoList} done={doneList} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChanged={ this.onSearchChanged } />
          <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange} />
        </div>

        <TodoList todos={visibleItems}
                  onDeleted={ this.deleteItem }
                  markAsDone={ this.markAsDone }
                  markAsImportant={ this.markAsImportant } />
        <AddTodoItem onItemAdded={ (text) => this.addItem(text) }/>
      </div>
    );
  }
};
