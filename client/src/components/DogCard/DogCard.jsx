import React from 'react';
import styles from '../../css/DogCard.module.css';
import DeleteDog from '../DeleteDog/DeleteDog';




const DogCard = (props) => {



  return (

    <div className={styles.card}>
      <section className={styles.image}>
        <img src={props.image} alt={''} />
      </section>
      <div className={styles.texts}>
        <section className={styles.name}>
          <h1>{props.breed}</h1>
        </section>
        <section className={styles.temp}>
          <h4>Temperaments</h4>
          <p>{props.temperament || 'No Tempers'}</p>
        </section>
        <section className={styles.weight}>
          <h4>Weight</h4>
          <p>{props.weight} lb</p>
        </section>
        <DeleteDog />
      </div>
    </div>
  );
};

export default DogCard;

