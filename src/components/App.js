import React, { Component, Fragment } from 'react';
import shortid from 'shortid';
import Logo from './Logo/logo.js';
import styles from './main.module.css';
import ContactForm from './ContactForm/contactForm.js';
import SearchForm from "./SearchForm/searchForm.js";
import ContactList from "./ContactList/contactList.js";
import DublicateNotification from "./DublicateNotification/dublicateNotification.js";
import { validateAll } from 'indicative/validator';

const rules = {
    name: 'required|alpha',
    number: 'required|number',
};

const messages = {
    alpha: 'Name must contain letters only!!',
    number: 'Phone must contain numeral only!!',
    'name.required': 'this field is required',
    'number.required': 'this field is required',
};

const nameFilter = (filter, contacts) => {
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
};

const nameAlreadyExist = (name, contacts) => {
    return contacts.filter(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
};
const numberAlreadyExist = (number, contacts) => {
    return contacts.filter(
        contact => contact.number.toLowerCase() === number.toLowerCase(),
    );
};

export default class App extends Component {
    state = {
        isLoad: false,
        contacts: [],
        name: "",
        number: '',
        filter: "",
        dublicate: false,
    }
    componentDidMount() {
        this.setState({ isLoad: true })
        const persistedContacts = localStorage.getItem("contacts");

        if (persistedContacts) {
            this.setState({ contacts: JSON.parse(persistedContacts) })
        }
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.dublicate !== this.state.dublicate) {
            setTimeout(() => { this.setState({ dublicate: false }) }, 3000)
        }
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        }
    }

    onChangeInput = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.resetError();
    }

    /*
    Без валидатора и метод concat     
    onContactToAdd = e => {
            e.preventDefault();
            const { name, number, contacts } = this.state;
            const nameExist = nameAlreadyExist(name, contacts);
            const numberExist = numberAlreadyExist(number, contacts);
            if ((nameExist.length !== 0) && (numberExist.length !== 0)) {
                this.setState({ dublicate: true })
                return
            }
            const itemToAdd = {
                name: name,
                number: number,
                id: shortid.generate(),
            };
            this.setState({ contacts: contacts.concat(itemToAdd) })
            this.reset();
        } */

    onContactToAdd = e => {
        e.preventDefault();

        const { name, number, contacts } = this.state;
        const nameExist = nameAlreadyExist(name, contacts);
        const numberExist = numberAlreadyExist(number, contacts);
        if ((nameExist.length !== 0) && (numberExist.length !== 0)) {
            this.setState({ dublicate: true })
            return
        }


        validateAll({ name, number }, rules, messages)
            .then(data => {
                const itemToAdd = {
                    name: this.state.name,
                    number: this.state.number,
                    id: shortid.generate(),
                };

                this.setState(state => ({
                    contacts: [...state.contacts, itemToAdd],
                }));

                this.reset();
            })
            .catch(errors => {
                const formattedErrors = {};

                errors.forEach(error => {
                    formattedErrors[error.field] = error.message;
                });
                this.setState({ errors: formattedErrors });
            })
    };

    handleFilter = e => {
        this.setState({ filter: e.target.value });
    };

    handleDelete = id => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== id),
        }));
    };

    resetError = () => {
        this.setState(state => ({
            errors: null,
        }));
    };

    reset = () => {
        this.setState(state => ({
            name: '',
            number: '',
        }));
    };

    render() {
        const { isLoad, name, number, filter, contacts, dublicate, errors } = this.state;
        const nameFiltered = nameFilter(filter, contacts);

        return (
            <Fragment>
                <div className={styles.wrapper}>
                    <Logo isLoad={isLoad} />
                    <ContactForm
                        name={name}
                        number={number}
                        onChangeInput={this.onChangeInput}
                        onContactToAdd={this.onContactToAdd}
                        onError={errors}
                    />
                    {contacts.length > 1 &&
                        <SearchForm
                            value={filter}
                            onChangeFilter={this.handleFilter}
                        />}
                    <ContactList
                        contacts={nameFiltered}
                        onDeleteContact={this.handleDelete}
                    />

                </div>
                {dublicate &&
                    <DublicateNotification status={dublicate} />}
            </Fragment>
        );
    }
}
