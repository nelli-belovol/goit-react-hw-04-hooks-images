import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.scss';

export default function Button({ onClick }) {
  return (
    <button className={s.Button} onClick={onClick} type="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
