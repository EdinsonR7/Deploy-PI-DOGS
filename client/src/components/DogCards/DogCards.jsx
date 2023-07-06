import React from 'react';
import Paginado from '../Paginado/Paginado.jsx';
import DogCard from '../DogCard/DogCard.jsx';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useState}  from 'react';
import styles from '../../css/DogCards.module.css';
import BuscarRaza from '../BuscarRaza/BuscarRaza'

const DogCards = () => {


    const allDogs = useSelector(state => state.allDogs);
    const filtered = useSelector(
      state => state.filtered
    );

    const ifFilter = useSelector(state => state.ifFilter);
    const [page, setPage] = useState({ prev: 0, next: 10 });
    const [click, setClick] = useState(1);
  
    const paginaAnterior = () => {
      if (page.prev === 0) return;
      let next = page.next - 10;
      setPage({ prev: page.prev - 10, next: page.next - 10 });
      setClick(next / 10);
    };
  
    const paginaSiguiente = () => {
      if (ifFilter) {
        if (
          page.next === filtered.length ||
          page.next > filtered.length
        )
          return;
      }
      if (page.next === allDogs.length || page.next > allDogs.length) return;
      let next = page.next + 10;
      setPage({ prev: page.prev + 10, next: page.next + 10 });
      setClick(next / 10);
    };
      
  
    const seleccionarPagina = e => {
      let pageNext = e.target.value * 10;
      let pagePrev = pageNext - 10;
      setPage({ prev: pagePrev, next: pageNext });
      setClick(pageNext / 10);
    };
  
    let dogsPagina;
  
    let paginaNum = [];
    const formatoNumPag = typeFilter => {
      for (let i = 1; i <= Math.ceil(typeFilter.length / 10); i++) {
        paginaNum.push(i);
      }
      if (page.next / paginaNum.length > 10 && typeFilter[0]) {
        setPage({ prev: 0, next: 10 });
        setClick(1);
      }
    };
    
   
  
    if (ifFilter) {
      formatoNumPag(filtered);
      dogsPagina = filtered.slice(page.prev, page.next);
    } else {
      formatoNumPag(allDogs);
      dogsPagina = allDogs.slice(page.prev, page.next);
    }

    return (
      
        <div className={styles.contenedor}>
         < Paginado
          pagePrev={paginaAnterior}
          pageNext={paginaSiguiente}
          pageSelect={seleccionarPagina}
          pageNum={paginaNum}
          click={click}
         />
        <div>
         {!dogsPagina[0] ? (
          <BuscarRaza />
        ) : (
        <ul className={styles.cards}>
            {dogsPagina.map(dog => (
        <li key={dog.id}>
          {
        <Link to={`home/${dog.id}`}>
         <DogCard
                  breed={dog.breed}
                  image={dog.image}
                  temperament={dog.temperament}
                  weight={dog.weight}
                    />
        </Link>
                }
        </li>
            ))}
        </ul>
        )}
        </div>
        <Paginado
        pagePrev={paginaAnterior}
        pageNext={paginaSiguiente}
        pageSelect={seleccionarPagina}
        pageNum={paginaNum}
        click={click}
        />   
        </div>
    );
};

export default DogCards;