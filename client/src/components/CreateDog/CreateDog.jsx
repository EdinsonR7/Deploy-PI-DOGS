import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getDogs, createDog } from "../../redux/actions";
import SelectCard from "../SelectCard/SelectCard";
import styles from "../../css/CreateDog.module.css";

const CreateDog = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);
  const allDogs = useSelector((state) => state.allDogs);
  const [input, setInput] = useState({
    image: "",
    breed: "",
    temperaments: [],
    height: "",
    weight: "",
    years: "",
  });
  const [errors, setErrors] = useState({});
  const [maxSelect, setMaxSelect] = useState(false);
  const [sumbit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
    // eslint-disable-next-line
  }, []);

  function Obj(obj) {
    return Object.keys(obj).length === 0;
  }

  const validationForm = (input) => {
    let errors = {};

    if (!input.image) setErrors({});
    else if (
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/.test(
        input.image
      )
    )
      errors.image = "Formato no valido";

    let breed = allDogs?.find(
      (breed) =>
        breed.breed.toLowerCase().replace(/\s+/g, "") ===
        input.breed.toLowerCase().replace(/\s+/g, "")
    );

    if (!input.breed) errors.breed = "Campo Obligatorio";
    else if (!/^.{0,25}$/.test(input.breed))
      errors.breed = "No puede tener mas de 25 caracteres";
    else if (breed) errors.breed = " ";

    if (!input.height) errors.height = "Campo Obligatorio";
    else if (!/^[0-9]{1,2} +(- [0-9]{1,2})$/.test(input.height))
      errors.height = "No cumple con el formato requerido, Ej: 2 - 5";

    if (!input.weight) errors.weight = "Campo Obligatorio";
    else if (!/^[0-9]{1,2} +(- [0-9]{1,2})$/.test(input.weight))
      errors.weight = "No cumple con el formato requerido, ej: 22 - 27";

    if (!input.years) errors.years = "Campo Obligatorio";
    else if (!/^([0-9])*$/.test(input.years)) errors.years = "Solo numeros";
    else if (!/^([0-9]){1,3}$/.test(input.years))
      errors.years = "No puede contener más de 3 números";

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(validationForm({ ...input, [e.target.name]: e.target.value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogs(input));
    dispatch(createDog(input));

    setInput({
      image: "",
      breed: "",
      temperaments: [],
      height: "",
      weight: "",
      years: "",
    });
    // dispatch('/home')

    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 3000);
  }

  const handleSelection = (value) => {
    if (value === "Select") return;
    if (input.temperaments.length > 5) {
      setMaxSelect(true);
      setTimeout(() => {
        setMaxSelect(false);
      }, 2000);
      return;
    }
    setInput({
      ...input,
      temperaments: [...new Set([...input.temperaments, value])],
    });
  };

  const deleteSelection = (e) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((s) => s !== e.target.value),
    });
    setMaxSelect(false);
  };

  const disable = () => {
    if (!input.breed || !input.height || !input.weight || !input.years)
      return true;

    if (!Obj(errors)) return true;

    return false;
  };

  return (
    <div className={styles.container}>
      <h1>Crear Nueva Raza</h1>
      <div className={styles.form}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          autoComplete={"off"}
          className={styles.form}
        >
          <div className={styles.requerido}>Campo requerido *</div>
          <div className={styles.bodyinputs}>
            <div className={styles.columnaform}>
              <label>Image</label>
              <input
                type="text"
                name="image"
                value={input.image}
                onChange={(e) => handleChange(e)}
                className={styles.inputs}
                placeholder=".png"
              ></input>
              <div className={styles.errors}>
                {errors.image ? <span>{errors.image}</span> : null}
              </div>
              <label>Breed*</label>
              <input
                type="text"
                name="breed"
                value={input.breed}
                onChange={(e) => handleChange(e)}
                className={errors.breed ? styles.inputIncorrect : styles.inputs}
                placeholder="Name breed..."
              ></input>
              <div className={styles.errors}>
                {errors.breed ? <span>{errors.breed}</span> : null}
              </div>
              <label>Height*</label>
              <input
                type="text"
                name="height"
                value={input.height}
                onChange={(e) => handleChange(e)}
                className={
                  errors.height ? styles.inputIncorrect : styles.inputs
                }
                placeholder="00 - 00"
              ></input>
              <div className={styles.errors}>
                {errors.height ? <span>{errors.height}</span> : null}
              </div>
              <label>Weight*</label>
              <input
                type="text"
                name="weight"
                value={input.weight}
                onChange={(e) => handleChange(e)}
                className={
                  errors.weight ? styles.inputIncorrect : styles.inputs
                }
                placeholder="00 - 00"
              ></input>
              <div className={styles.errors}>
                {errors.weight ? <span>{errors.weight}</span> : null}
              </div>
              <label>Years of life*</label>
              <input
                type="text"
                name="years"
                value={input.years}
                onChange={(e) => handleChange(e)}
                className={errors.years ? styles.inputIncorrect : styles.inputs}
                placeholder="00"
              ></input>
              <div className={styles.errors}>
                {errors.years ? <span>{errors.years}</span> : null}
              </div>
            </div>
            <div className={`${styles.columnaform} ${styles.columnaform}`}>
              <label>Temperaments</label>
              <select
                name="Temperament Selection"
                onChange={(e) => handleSelection(e.target.value)}
                className={styles.select}
              >
                <option>Select</option>
                {temperaments.map((t) => (
                  <option key={t.id}>{t.name}</option>
                ))}
              </select>
              <div className={styles.selection}>
                {input.temperaments?.map((s) => (
                  <SelectCard
                    key={s}
                    select={s}
                    deleteSelection={deleteSelection}
                  />
                ))}
                {maxSelect ? (
                  <label className={styles.maxselect}>
                    Max select temperaments
                  </label>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.wrap}>
            <button
              type="sumbit"
              className={!disable() ? styles.button : styles.offButton}
              disabled={disable()}
            >
              Submit
            </button>
            {sumbit ? (
              <label className={styles.submit}>Raza Creada</label>
            ) : (
              <label className={styles.submit}></label>
            )}
          </div>
          <Link to={"/home"} className={styles.buttonBack}>
          {"<"}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
