import React from 'react';
import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ img, showImage }) {
  return (
    <li onClick={() => showImage(img)} className={s.ImageGalleryItem}>
      <img
        src={img.webformatURL}
        alt={img.tags}
        className={s.ImageGalleryItem__image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  showImage: PropTypes.func,
  img: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
