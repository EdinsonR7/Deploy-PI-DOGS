import React from 'react';
import image from '../../image/doglanding.png';
import styles from '../../css/LandingPage.module.css';
import {Link} from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className={styles.container}>
         <img src={image} alt="" /> 
          <div className={styles.containerHome}>
          <Link to={'/home'}>HOME</Link>
          <h1>BIENVENIDOS AL MUNDO DOGS</h1>
         </div>
         </div>
    );
};

export default LandingPage;