import React from 'react';
import styles from '../../css/DogsCreated.module.css';

const DogsCreated = ({filterBy}) => {
  const handlerChange = e => {
    filterBy('check');
    setTimeout(() => {
        e.target.checkd= false;

    }, 1500)
  }

    return (
        <div className={styles.bodyDogsCreated}>
        <label className={styles.textorder}>Razas Creadas</label>
        <input type="checkbox" onChange={e => handlerChange(e)} />
        </div>
    );
};

export default DogsCreated;