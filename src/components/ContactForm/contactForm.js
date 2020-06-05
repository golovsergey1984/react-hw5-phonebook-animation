import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contactForm.module.css';


export default class ContactForm extends Component {

    render() {
        const { name, number, onError, onChangeInput, onContactToAdd } = this.props;
        return (

            <div className={styles['contactForm-box']}>
                <div className={styles['contactForm-wrapper']}>
                    <form onSubmit={onContactToAdd} >
                        <label>
                            <p className={styles['contactForm-input-title']}>Name</p>
                            <input
                                type="text"
                                className={styles['contactForm-input']}
                                name="name"
                                value={name}
                                autoComplete="off"
                                onChange={onChangeInput}
                                placeholder="Type contact name..."
                            />
                            {onError && <span className={styles.error}>{onError.name}</span>}
                        </label>


                        <label>
                            <p className={styles['contactForm-input-title']}>Number</p>
                            <input
                                type="text"
                                className={styles['contactForm-input']}
                                name="number"
                                value={number}
                                autoComplete="off"
                                onChange={onChangeInput}
                                placeholder="Type contact number..."
                            />
                            {onError && <span className={styles.error}>{onError.number}</span>}
                        </label>
                        <div className={styles['contactForm-btn-box']}>
                            <button type="submit" className={styles['contactForm-btn']}>Add contact</button>
                        </div>
                    </form>
                </div>
            </div >


        )
    }
}

ContactForm.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onContactToAdd: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    onError: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }),
};