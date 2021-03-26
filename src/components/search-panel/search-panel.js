import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  onSearchChanged = (e) => {
    this.props.onSearchChanged(e.target.value);
  }

  render () {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={this.onSearchChanged} />
    );
  }
};
