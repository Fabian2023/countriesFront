import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCountries } from '../../Redux/actions';

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>
        <select id="continent" value={selectedContinent} onChange={handleSelectContinent}>
          <option value="">Todos los continentes</option>
          <option value="Africa">África</option>
          <option value="South America">América del Sur</option>
          <option value="North America">América del Norte</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>
      </div>
      <div style={{ marginLeft: '30px' }}>
        <select id="ordering" value={selectedOrdering} onChange={handleSelectOrdering}>
          <option value="">Orden</option>
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
      </div>
    </div>
  );
};

export default AllFilterCountries;

