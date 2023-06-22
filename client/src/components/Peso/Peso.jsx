import React from 'react';
import styles from '../../css/Peso.module.css'

const Peso = ({ filterBy }) => {
    return (
      <div className={styles.container}>
      <label className={styles.text}>Peso</label>
      <div className={styles.boton}>
      <button value='max-weight' onClick={e => filterBy(e.target.value)}>
      &#10133; Max
      </button>
      <button value='min-weight' onClick={e => filterBy(e.target.value)}>
      &#10134; Min
      </button>
      </div>
      </div>
    );
};

export default Peso;