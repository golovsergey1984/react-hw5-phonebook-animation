import React from 'react';
import { CSSTransition } from "react-transition-group"
import fadeTransition from '../../transitions/fade.module.css';
import styles from './dublicate.module.css';
import PropTypes from 'prop-types';

const DublicateNotification = (status) => (

    < CSSTransition in={status.status} timeout={1000} classNames={fadeTransition} unmountOnExit>
        <div className={styles['dublicate-box']}><p className={styles['dublicate-txt']}>Contact already exist!</p></div>
    </CSSTransition >

);

export default DublicateNotification;

DublicateNotification.propTypes = {
    status: PropTypes.bool.isRequired,
};