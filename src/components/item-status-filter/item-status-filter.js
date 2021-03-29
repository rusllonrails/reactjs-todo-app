import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ]

  render() {
    const { filter, onFilterChange } = this.props;

    const items = this.buttons.map(({name, label}) => {
      const isActive = name === filter;
      const custom_class = isActive ? 'btn-info' : 'btn-outline-secondary';
      const clazz = `btn ${custom_class}`

      return (
        <button type="button" key={name} className={clazz} onClick={ () => onFilterChange(name) }>{label}</button>
      );
    });

    return (
      <div className="btn-group">
        {items}
      </div>
    );
  }
};
