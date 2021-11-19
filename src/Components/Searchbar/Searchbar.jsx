import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={this.handleSearchSubmit}>
            <button type="submit" className={s.SearchForm__button}>
              <span className={s.SearchForm__buttonLabel}>Search</span>
            </button>

            <input
              value={this.state.value}
              onChange={this.onChange}
              className={s.SearchForm__input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
