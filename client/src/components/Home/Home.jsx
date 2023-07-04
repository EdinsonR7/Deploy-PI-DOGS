import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getDogByBreed,
  orderAZ,
  orderZA,
  getTemperaments,
  filterTemperament,
  filterWeightMax,
  filterWeightMin,
  filterBreedCreated,
} from "../../redux/actions";

import { Link } from "react-router-dom";
import Search from "../Search/Search";
import DogCards from "../DogCards/DogCards";
import styles from "../../css/Home.module.css";
import AlfabeOrder from "../AlfabeOrder/AlfabeOrder";
import Temperamento from "../Temperamento/Temperamento";
import Loading from "../Loading/Loading";
import Peso from "../Peso/Peso";
import DogsCreated from "../DogsCreated/DogsCreated";

const Home = () => {
  const [order, setOrder] = useState(true);
  const [temp, setTemp] = useState(true);
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments()); // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [order]);

  useEffect(() => {}, [temp]);

  const searchBreed = (breed) => {
    dispatch(getDogByBreed(breed));
  };

  const orderBy = (OrderBy) => {
    if ("a - z" === OrderBy) dispatch(orderAZ());
    if ("z - a" === OrderBy) dispatch(orderZA());
    if (order === true) setOrder(false);
    if (order === false) setOrder(true);
  };

  const filterBy = (FilterBy) => {
    if (FilterBy === "Filter By");
    else if (FilterBy === "max-weight") dispatch(filterWeightMax());
    else if (FilterBy === "min-weight") dispatch(filterWeightMin());
    else if (FilterBy === "check") dispatch(filterBreedCreated());
    else dispatch(filterTemperament(FilterBy));

    if (temp === true) setTemp(false);
    if (temp === false) setTemp(true);
  };

  return (
    <div className={styles.container}>
      {!allDogs[0] ? (
        (console.log(allDogs), (<Loading />))
      ) : (
        <div>
          <div>
            <Search searchBreed={searchBreed} />
          </div>
          <div className={styles.containerFiltros}>
            <AlfabeOrder orderBy={orderBy} />
            <Temperamento filterBy={filterBy} />
            <Peso filterBy={filterBy} />
            <Link
              className={`${styles.button} ${styles["button-white"]}`}
              to={"/home/createDog"}
            >
              Crear Raza
            </Link>
            <DogsCreated filterBy={filterBy} />
          </div>
          <div className={styles.home}>
            <div className={styles.body}>
              <section className={styles.cards}>
                <DogCards />
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
