import React from 'react';
import { useState } from 'react';
import styles from '../../css/Search.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import image from '../../image/doglanding.png';

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
      <Link to={"/home"} className={styles.logoHome}>
      <img src={image} alt='' />
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
