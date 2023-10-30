import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCountries } from "../../Redux/actions";
import styles from './Poblation.module.css'

const Poblation = ({ onPop }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [population, setPopulation] = useState("");

  useEffect(() => {
    dispatch(GetCountries());
  }, [dispatch]);

  useEffect(() => {
    if (population) {
      let populationCountries = [...countries];

      if (population === "Asc") {
        populationCountries.sort(
          (a, b) => parseInt(a.population) - parseInt(b.population)
        );
      } else if (population === "Desc") {
        populationCountries.sort(
          (a, b) => parseInt(b.population) - parseInt(a.population)
        );
      }

      onPop(populationCountries);
      setPopulation("");
    }
  }, [population, countries, onPop]);

  const handlePopulationChange = (event) => {
    const populationOption = event.target.value;
    setPopulation(populationOption);
  };

  return (
    <div>
      <select
        className={styles["select-container"]} // Aplicar la clase del select
        onChange={handlePopulationChange}
      >
        <option className={styles["custom-option"]} value="">
          Población
        </option>
        <option className={styles["custom-option"]} value="Asc">
          Descendente
        </option>
        <option className={styles["custom-option"]} value="Desc">
          Ascendente
        </option>
      </select>
    </div>
  );
};

export default Poblation;

