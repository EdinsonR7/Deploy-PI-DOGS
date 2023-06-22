import React from 'react';
import styles from '../../css/AlfabeOrder.module.css';

const AlfabeOrder = ({ orderBy }) => {
    return (
        <div className={styles.alfabeOrder}>
          <label className={styles.bodyOrder}>Orden Alfabetico</label> 
          <select className={styles.ordenar} name='Orden Alfabetico' onChange={e => orderBy(e.target.value)}>
          <option>Ordenar</option>
          <option>a - z</option>
          <option>z - a</option>
          </select>
            
        </div>
    );
};

export default AlfabeOrder;