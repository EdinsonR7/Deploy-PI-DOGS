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
    const [page, setPage] = useState({ prev: 0, next: 8 });
    const [click, setClick] = useState(1);
  
    const paginaAnterior = () => {
      if (page.prev === 0) return;
      let next = page.next - 8;
      setPage({ prev: page.prev - 8, next: page.next - 8 });
      setClick(next / 8);
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
      let next = page.next + 8;
      setPage({ prev: page.prev + 8, next: page.next + 8 });
      setClick(next / 8);
    };
      
  
    const seleccionarPagina = e => {
      let pageNext = e.target.value * 8;
      let pagePrev = pageNext - 8;
      setPage({ prev: pagePrev, next: pageNext });
      setClick(pageNext / 8);
    };
  
    let dogsPagina;
  
    let paginaNum = [];
    const formatoNumPag = typeFilter => {
      for (let i = 1; i <= Math.ceil(typeFilter.length / 8); i++) {
        paginaNum.push(i);
      }
      if (page.next / paginaNum.length > 8 && typeFilter[0]) {
        setPage({ prev: 0, next: 8 });
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