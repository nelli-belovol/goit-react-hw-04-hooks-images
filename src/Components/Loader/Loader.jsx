import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.scss';

// import PropTypes from 'prop-types';

export default class App extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        className={s.Loader}
        type="Hearts"
        color="#3f51b5"
        height={80}
        width={80}
      />
    );
  }
}
