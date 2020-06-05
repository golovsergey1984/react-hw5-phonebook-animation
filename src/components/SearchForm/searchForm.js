import React from 'react';
import styles from './searchForm.module.css';
import PropTypes from 'prop-types';

const SearchForm = ({ value, onChangeFilter }) => (
    <div className={styles['searchForm-box']}>
        <div className={styles['searchForm-wrapper']}>
            <p className={styles['searchForm-input-title']}>Find contacts by name</p>
            <input
                type="text"
                className={styles['searchForm-input']}
                placeholder="Type to filter names..."
                value={value}
                onChange={onChangeFilter}
            ></input>
        </div>
    </div>
);

export default SearchForm;

SearchForm.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
};