import React from 'react';
import { useState } from 'react';
import styles from '../../css/Search.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
    <div className={styles.containerHeader}>
      <Link to={"/"} className={styles.logoHome}>
      <img src='/src/image/doglanding.png' alt='Imagen Perro' />
      </Link>
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
    </div>
  );
};

export default Search;
