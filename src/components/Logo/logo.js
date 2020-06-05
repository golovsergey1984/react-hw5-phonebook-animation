import React from 'react';
import { CSSTransition } from "react-transition-group"
import styles from './logo.module.css';
import slideTransition from '../../transitions/slide.module.css';
import PropTypes from 'prop-types';


const Logo = (isLoad) =>
    <CSSTransition in={isLoad.isLoad} timeout={1000} classNames={slideTransition} unmountOnExit>

        <h1 className={styles["logo-txt"]}>Phonebook</h1>

    </CSSTransition>

export default Logo;

Logo.propTypes = {
    isLoad: PropTypes.bool.isRequired,
};