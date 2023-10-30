import React, { useState, useEffect, useCallback } from 'react';
import Cards from '../Cards/Cards';
import Navbar from '../Navbar/NavBar';
import styles from './Card.module.css';

const Card = () => {
  const [originalData, setOriginalData] = useState([]); // Datos originales sin filtrar
  const [filteredResults, setFilteredResults] = useState([]); // Resultados filtrados

  // Esta función se ejecutará cuando se actualicen los datos originales
  useEffect(() => {
    setFilteredResults(originalData); // Actualizamos los resultados filtrados con los datos originales sin filtrar
  }, [originalData]);

  const handleSearchBar = (results) => {
    setFilteredResults(results); // Filtramos los resultados sin modificar los datos originales
  };

  const handlePopulationChange = (populationCountries) => {
    setFilteredResults(populationCountries); // Filtramos los resultados sin modificar los datos originales
  };

  //  utilizamos useCallback para mantener estable la función handleFilteredCountriesChange y evitar el bucle
  const handleFilteredCountriesChange = useCallback((filteredCountries) => {
    setFilteredResults(filteredCountries); // Filtramos los resultados sin modificar los datos originales
  }, []);

  return (
    <div className={styles.container}>
      {/* Pasamos las funciones para actualizar los datos originales */}
      <Navbar
        onSearch={handleSearchBar}
        onPop={handlePopulationChange}
        onDataUpdate={setOriginalData}
        onFilteredCountriesChange={handleFilteredCountriesChange}
      />
      <br />
      <Cards data={filteredResults} />
    </div>
  );
};

export default Card;
