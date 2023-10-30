import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { GetCountryId } from "../../Redux/actions";
import styles from "../Detail/Detail.module.css";

const DetailCountries = () => {
  const { idPais } = useParams();
  const dispatch = useDispatch();
  const countryId = useSelector((state) => state.countryId);
  const country = countryId.find((country) => country.id === idPais);
  console.log("country: ", country);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetCountryId(idPais)); // Pasar el valor de idPais a la acción GetCountryId
  }, [dispatch, idPais]);

  const handleClick = () => {
    navigate(-1);
  };

  if (!country) {
    return <div>Cargando Detalles</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <>
          <img
            className={styles.flag}
            src={country.flag}
            alt={`Bandera de ${country.name}`}
          />
          <div className={styles.details}>
            <h2>ID: {country.id}</h2>
            <h2>{country.name}</h2>
            <br />
            <p>Capital: {country.capital}</p>
            <p>Población: {country.population}</p>
            {country.subregion && <p>Subregión: {country.subregion}</p>}
            {country.area && <p>Área: {country.area}</p>}
            <p>Continente: {country.continent}</p>
            <hr />
            <h3>Actividades:</h3>

            {country.Activities.length === 0 ? (
              <p>No hay actividades disponibles para este país.</p>
            ) : (
              <div>
                {country.Activities.map((activity) => (
                  <div key={activity.id}>
                    <p>Nombre: {activity.name}</p>
                    <p>Dificultad: {activity.difficulty}</p>
                    <p>Duración en Hrs: {activity.duration}</p>
                    <p>Temporada: {activity.season}</p>
                    <br />
                  </div>
                ))}
              </div>
            )}

            <div className={styles.buttonContainer}>
              <br />
              <button onClick={handleClick} className={styles.volver}>
                Volver
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default DetailCountries;





