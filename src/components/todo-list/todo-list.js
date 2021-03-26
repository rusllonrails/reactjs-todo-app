import React from 'react';

import TodoListItem from './../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, markAsDone, markAsImportant }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
         {...itemProps }
         onDeleted={ () => onDeleted(id) }
         markAsDone={ () => markAsDone(id) }
         markAsImportant={ () => markAsImportant(id) }
         />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
