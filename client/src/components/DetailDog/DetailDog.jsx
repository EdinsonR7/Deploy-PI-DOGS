import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBreedDetail } from "../../redux/actions";
import styles from "../../css/DetailDog.module.css";

const DetailDog = () => {
  const dispatch = useDispatch();
  const detailBreed = useSelector((state) => state.detailBreed);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getBreedDetail(id));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.detailbody}>
      <div className={styles.detailcard}>
        <h1> RAZA DETALLADA </h1>
        <div className={styles.cardbody}>
          <div className={styles.detailimg}>
            <img src={detailBreed.image} alt="img" />
          <div className={styles.bodytext}>
            <div>
              <h1>{detailBreed.breed}</h1>
            </div>

            <div className={styles.descriptionbody}>
              <p>•WEIGHT: {detailBreed.weight} lb</p>
              <p>•HEIGHT: {detailBreed.height} ft</p>
              <p>•YEARS OF LIFE: {detailBreed["years of life"]}</p>
              <div className={styles.temptext}>
                <p>•TEMPERAMENTS:</p>
                <p>{detailBreed.temperament || "No tempers"}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className={styles.buttonbody}>
          <Link className={styles.buttonBack} to={"/home"}>
            {"<"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailDog;
