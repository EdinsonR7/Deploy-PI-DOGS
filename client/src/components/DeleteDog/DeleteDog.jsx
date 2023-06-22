import React from 'react';
import styles from '../../css/DeleteDog.module.css'
import {deleteDog} from '../../redux/actions'
import {useState } from 'react';
import { useDispatch } from 'react-redux';


const DeleteDog = () => {

    const dispatch = useDispatch();
    const [eliminar, setEliminar] = useState(true);
     
  
  
  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteDog(eliminar))
    
  }

  function handleOnChange(e) {
    setEliminar(eliminar)
  }

  

return (
    <div className={styles.botonBorrar}>
    
    <form onSubmit={e => handleSubmit(e)}>
    <button 
    type='submit'
    onChange={e => handleOnChange(e)}
    value={'x'}
    >x</button>
    </form> 
   
   
    </div>
    );
};

export default DeleteDog;