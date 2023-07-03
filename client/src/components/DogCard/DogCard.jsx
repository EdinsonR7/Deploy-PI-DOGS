import React from "react";
import styles from "../../css/DogCard.module.css";

const DogCard = (props) => {
  return (
    <div className={styles.card}>
      <section className={styles.image}>
        <img src={props.image} alt={""} />
      </section>
      <div className={styles.texts}>
        <section className={styles.name}>
          <h1>{props.breed}</h1>
        </section>
      </div>
    </div>
  );
};

export default DogCard;
