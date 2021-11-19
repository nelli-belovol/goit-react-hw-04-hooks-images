import React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleKeyDown}>
        <div className={s.Modal}>
          <img src={image.src} alt={image.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  images: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }),
};
