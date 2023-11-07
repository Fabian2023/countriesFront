import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCountries } from '../../Redux/actions';
import styles from './AllFiltercountries.module.css'

const AllFilterCountries = ({ onFilteredCountriesChange }) => {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedOrdering, setSelectedOrdering] = useState('');

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(GetCountries());
  }, [dispatch]);

  useEffect(() => {
    let filteredByContinent = countries;
    if (selectedContinent) {
      filteredByContinent = countries.filter((country) => country.continent === selectedContinent);
    }

    let orderingCountries = [...filteredByContinent];
    if (selectedOrdering === 'Asc') {
      orderingCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedOrdering === 'Desc') {
      orderingCountries.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Actualizamos los resultados filtrados utilizando la prop onFilteredCountriesChange
    onFilteredCountriesChange(orderingCountries);
  }, [selectedContinent, selectedOrdering, countries, onFilteredCountriesChange]);

  const handleSelectContinent = (event) => {
    const continent = event.target.value;
    setSelectedContinent(continent);
  };

  const handleSelectOrdering = (event) => {
    const ordering = event.target.value;
    setSelectedOrdering(ordering);
  };

  // Mostramos el valor actual de los filtros utilizando console.log
  console.log('Selected Continent:', selectedContinent);
  console.log('Selected Ordering:', selectedOrdering);

  return (
     
      <div style={{ display: 'flex', alignItems: 'center' }} className={styles['all-filter-container']}>
        <div style={{ fontWeight: 'bold' }} className={styles['filter-select']}>
          <select id="continent" value={selectedContinent} onChange={handleSelectContinent} className={styles['filter-select']}>
            <option value="">continentes</option>
            <option value="Africa">África</option>
            <option value="South America">América del Sur</option>
            <option value="North America">América del Norte</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceanía</option>
          </select>
        </div>
        <div style={{ marginLeft: '30px' }} className={styles['filter-select']}>
          <select id="ordering" value={selectedOrdering} onChange={handleSelectOrdering} className={styles['filter-select']}>
            <option value="">Orden</option>
            <option value="Asc">Ascendente</option>
            <option value="Desc">Descendente</option>
          </select>
        </div>
      </div>
    );
  }
       
export default AllFilterCountries;

