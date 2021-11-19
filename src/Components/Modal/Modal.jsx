import React, { useEffect } from 'react';

import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ image, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleKeyDown}>
      <div className={s.Modal}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  images: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }),
};
