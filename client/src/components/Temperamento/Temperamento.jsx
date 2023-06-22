import React from 'react';
import { useSelector } from 'react-redux'
import styles from '../../css/Temperamento.module.css';

const Temperamento = ({filterBy}) => {
    const temperaments = useSelector(state => state.allTemperaments);

    return (
        <div className={styles.container}>
         <label className={styles.texto}>Temperamento</label> 
         <select 
         className={styles.select}
         name="Tempearamento"
         onChange={e => filterBy(e.target.value)}
         >
         <option>Filtrados</option> 
          {temperaments.map(t => (
            <option key={t.id}>{t.name}</option>
          ))}
         </select> 
            
        </div>
    );
};

export default Temperamento;