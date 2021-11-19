import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSearchSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            value={value}
            onChange={onChange}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
