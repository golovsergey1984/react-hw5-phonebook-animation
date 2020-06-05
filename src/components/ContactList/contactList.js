import React from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import slideTransition from '../../transitions/slide.module.css';
import styles from './contactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts = [], onDeleteContact }) => (
    <div>
        <TransitionGroup component="ul" className={styles['contactList-ul']}>

            {contacts.map(item => (
                <CSSTransition key={item.id} timeout={1000} classNames={slideTransition} unmountOnExit>
                    <li className={styles['contactList-item-box']}>
                        <div className={styles['contactList-item-wrapper']}>
                            <div className={styles['contactList-item-name']}>{item.name}</div>
                            <div className={styles['contactList-item-number']}>{item.number}</div>
                            <div className={styles['contactList-item-btn']}>
                                <button
                                    type="button"
                                    name="delte"
                                    onClick={() => onDeleteContact(item.id)}
                                    className={styles['contactList-btn-delete']}
                                >
                                    X
            </button>
                            </div>



                        </div>
                    </li>
                </CSSTransition>
            ))}

        </TransitionGroup>
    </div>
);

export default ContactList;

ContactList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
};