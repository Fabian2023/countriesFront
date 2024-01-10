import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../SearchBar/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFound, setCountryFound] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setCountryFound(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      
      alert('Por favor, ingresa el país que deseas buscar.');
      return;
    }

    try {
      const response = await axios.get('https://countriesback-production-14f4.up.railway.app/countries', {
        params: {
          name: searchTerm,
        },
      });

      if (response.data.length > 0) {
        setCountryFound(true);
        onSearch(response.data);
      } else {
        setCountryFound(false);
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda de países:', error);
    }
  };

  const handleGoBack = () => {
    handleReset();
    navigate('/home');
  };

  const handleReset = () => {
    setSearchTerm('');
    setCountryFound(false);
    onSearch([]);
  };

  return (
    <div className={styles.containerSearch}>
      <div className={styles.inputContainer}>
        <button onClick={handleSearch} className={styles.buscar}>
          Buscar
        </button>
        <input
          type="text"
          placeholder="Busca tu país..."
          value={searchTerm}
          onChange={handleInputChange}
          className={styles.busqueda}
        />
      </div>
      {countryFound && (
        <button onClick={handleGoBack} className={styles.volver}>
          Volver
        </button>
      )}
    </div>
  );
};

export default SearchBar;

