import React from 'react';
import loandinDog from '../../image/loandindog.png';
import styles from '../../css/Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
    <div className={styles.loadingDog}>
    <img src={loandinDog} alt='landindog' />
    </div>
    <div className={styles.loadingtext}>
        Loading...
    </div>
    </div>
  );
};

export default Loading;