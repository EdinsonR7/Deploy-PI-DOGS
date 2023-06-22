import React from 'react';
import { useState } from 'react';
import styles from '../../css/Search.module.css';

const Search = ({ searchBreed }) => {
  const [search, setSearch] = useState('');

  const handlerChange = (e) => {
    setSearch(e.target.value);
    searchBreed(e.target.value);
  };

  const handlerOnClick = (e) => {
    searchBreed(search);
    setSearch('');

  };

  return (
    <div className={styles.serach}>
    <input
        type='text'
        onChange={e => handlerChange(e)}
        placeholder='Buscar...'
        value={search}
    />
    <button
        className={`${styles.btn} ${styles['btn-5']}`}
        onClick={e => handlerOnClick(e)}
    >
        Search
    </button>
    </div>
  );
};

export default Search;
