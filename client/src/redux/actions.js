import axios from "axios";

 export const GET_DOGS="GET_DOGS"; // 
 export const GET_DOGS_BY_BREEDS="GET_DOGS_BY_BREEDS";//
 export const GET_BREED_DETAIL="GET_DOG_DETAIL";//
 export const GET_TEMPERAMENTS="GET_TEMPERAMENTS";//
 export const ORDER_ALPHABETICALLY_AZ="ORDER_ALPHABETICALLY_AZ";//
 export const ORDER_ALPHABETICALLY_ZA="ORDER_ALPHABETICALLY_ZA";//
 export const FILTER_BY_TEMPERAMENT="FILTER_BY_TEMPERAMENT";//
 export const FILTER_BY_MAX_WEIGHT="FILTER_BY_MAX_WEIGHT";//
 export const FILTER_BY_MIN_WEIGHT="FILTER_BY_MIN_WEIGHT";
 export const FILTER_BY_BREED_CREATED="FILTER_BY_BREED_CREATED";


export const getDogs=() => dispatch => {
    return axios.get('/dogs').then(response => {
        dispatch({type:GET_DOGS, payload: response.data})
    })
};

export const getDogByBreed = (breed) => async dispatch => {
    try {
      console.log(breed)
      if (!breed) alert('El campo esta vacio');
      let breedFound = await axios.get(
        `/dogs?name=${breed}`
      );
      return dispatch({ type: GET_DOGS_BY_BREEDS, payload: breedFound.data });
    } catch (error) {
      alert('La raza que buscas no existe');
    }
  };

export const getBreedDetail=  id  => async dispatch => {
     let breedFound = await axios.get(`/dogs/${id}`)
    return dispatch({type: GET_BREED_DETAIL, payload: breedFound.data})
} 

export const getTemperaments= () => dispatch => {
    return axios.get(`/temperaments`)
    .then(response => {
    return dispatch({type: GET_TEMPERAMENTS, payload: response.data})
    })
}

export const orderAZ= () => {
    return {
        type: ORDER_ALPHABETICALLY_AZ,
    }
}

export const orderZA= () => {
    return {
        type: ORDER_ALPHABETICALLY_ZA,
    }
}

export const filterTemperament= (temperament) => {
    return{ 
        type: FILTER_BY_TEMPERAMENT, payload: temperament
    }
}

export const filterWeightMax = () => {
    return { type: FILTER_BY_MAX_WEIGHT,}
}


export const filterWeightMin = () => {
return { 
    type: FILTER_BY_MIN_WEIGHT,
}

}

export const filterBreedCreated = () => {
    return { type: FILTER_BY_BREED_CREATED };
  };


export const createDog =  (info) => async dispatch => {

 return await axios.post('/dogs', info)
.then(response =>  {
 alert(response.data)   
 })
.catch(error => alert(error.message))

};

export const deleteDog = (info) => async dispatch => {

    return await axios.delete('/dogs/:id', info)
    .then(response => {
        alert(response.data)
    })
    .catch(error => alert(error.message))
}




