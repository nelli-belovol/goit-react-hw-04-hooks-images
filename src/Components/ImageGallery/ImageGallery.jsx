import React from 'react';
import s from './ImageGallery.module.scss';

export default function ImageGallery({ children }) {
  return <ul className={s.ImageGallery}>{children}</ul>;
}
