
import React, { useState } from 'react';
import Poblation from '../Poblation/Poblation';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import CreateActivity from '../CreateActivity/CreateActivity';
import ActivityCountry from '../ActivityFilter/ActivityCountry';
import AllFilterCountries from '../AllFilterCountries/AllFiltercountries';

const Navbar = ({ onSearch, onPop, onFilteredCountriesChange }) => {
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const toggleCreateActivity = () => {
    setShowCreateActivity(!showCreateActivity);
  };

  const showActivityCreated = () => {
    setShowActivity(!showActivity);
  };

  return (
    <nav className={styles.containers}>
      <div className={styles.searchBar}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className={styles.poblationButton} >
        <Poblation onPop={onPop} />
      </div>
      <div className={styles.allfilters}>
          <AllFilterCountries onFilteredCountriesChange={onFilteredCountriesChange}/>
        </div>
      <div className={styles.createActivityButton}>
        {showCreateActivity && <CreateActivity />}
        <Link to="/home/activities">
          <button onClick={toggleCreateActivity}>Crear Actividad</button>
        </Link>
      </div>
      <div className={styles.activityButton} >
        {showActivity && <ActivityCountry />}
        <Link to="/home/actifilter">
          <button className={styles.activity} onClick={showActivityCreated}>
            Ir a Actividades
          </button>
        </Link>
       
      </div>
    </nav>
  );
};

export default Navbar;

