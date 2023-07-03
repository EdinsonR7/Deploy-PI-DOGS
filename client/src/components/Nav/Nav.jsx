import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Nav.module.css';

const Nav = ({ searchBreed }) => {
  return (
    <div className={styles.container}>
    <div className={styles.nav}>
    <div className={styles.bodybtn}>
    <div className={styles.createdog}>
    <Link className={`${styles.button} ${styles['button-white']}`}
      to={'/home/createDog'}>
      Crear Raza
    </Link>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Nav