import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../../redux/actions';

import DogCards from '../DogCards/DogCards';
import Nav from '../Nav/Nav.jsx';
import styles from '../../css/Home.module.css';
import AlfabeOrder from '../AlfabeOrder/AlfabeOrder';
import Temperamento from '../Temperamento/Temperamento';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import Peso from '../Peso/Peso';
import DogsCreated from '../DogsCreated/DogsCreated';
import image from '../../image/logohome.jpg'

const Home = () => {
  const [order, setOrder] = useState(true);
  const [temp, setTemp] = useState(true);
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.allDogs);

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
    if ('a - z' === OrderBy) dispatch(orderAZ());
    if ('z - a' === OrderBy) dispatch(orderZA());
    if (order === true) setOrder(false);
    if (order === false) setOrder(true);
};

const filterBy = (FilterBy) => {
    if (FilterBy === 'Filter By');
    else if (FilterBy === 'max-weight') dispatch(filterWeightMax());
    else if (FilterBy === 'min-weight') dispatch(filterWeightMin());
    else if (FilterBy === 'check') dispatch(filterBreedCreated());
    else dispatch(filterTemperament(FilterBy));

    if (temp === true) setTemp(false);
    if (temp === false) setTemp(true);
  };



  return (
    <div className={styles.container}>
      {!allDogs[0] ? (
        console.log(allDogs),
        <Loading />
        
      ) : (
        <div>
        <div className={styles.home}>
        <nav className={styles.nav}>
        <Link to={'/'}>
        <div className={styles.textohome}>
        <h1>DOGS TU MEJOR AMIGO</h1>
        </div>
        </Link>

        <div className={styles.logo}>
        <img src={image} alt=''  />
        </div>

        <section className={styles.menu}>
        <Nav searchBreed={searchBreed} />
        </section>
        </nav>

        <div className={styles.body}>
        <section className={styles.cards}>
        <DogCards />
        </section>

        <section className={styles.select}>
        <AlfabeOrder orderBy={orderBy} />
        <Temperamento filterBy={filterBy} />
        <Peso filterBy={filterBy} />
        <DogsCreated filterBy={filterBy} />
        </section>

        </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;


