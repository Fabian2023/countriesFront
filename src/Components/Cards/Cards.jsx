import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCountries } from "../../Redux/actions";
import { Link } from 'react-router-dom';
import styles from "../Cards/Cards.module.css";

const Cards = ({ data, continentFilter }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);

  

  useEffect(() => {
    dispatch(GetCountries());
  }, [dispatch]);

  let countriesToDisplay = [];

  if (data.length > 0 && countries.length > 0) {
    countriesToDisplay = data;
  } else {
    countriesToDisplay = countries;
  }

 

  // Paso 1: Calcular el total de páginas
  const cardsPerPage = 10;
  const totalPages = Math.ceil(countriesToDisplay.length / cardsPerPage);

  // Paso 2: Generar los números de página a mostrar (rango de 5  páginas centrado en la página actual)
  const getPageNumbersToShow = (totalPages, currentPage) => {
    const pageNumbersToShow = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    // Ajustar el rango para que siempre haya 5 páginas cuando se navega atreves de la paginacion// 
    if (endPage - startPage < 5) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToShow.push(i);
    }
    return pageNumbersToShow;
  };

  const pageNumbersToView = getPageNumbersToShow(totalPages, currentPage);

  const currentCards = countriesToDisplay.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Paso 4: Marcar la página actual con la clase styles.active
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={styles.container}>
      {continentFilter}
      {currentCards.map((country) => (
        <div key={country.id} className={styles.card}>
          <Link to={`/home/detail/${country.id}`}>
            <img src={country.flag} alt={`Bandera de ${country.name}`} />
          </Link>
          <h3>{country.name}</h3>
          <p>{country.continent}</p>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={isFirstPage}>
          Pág anterior
        </button>
        {pageNumbersToView.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${styles.pageButton} ${
              currentPage === pageNumber ? styles.active : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={isLastPage}>
          Pág siguiente
        </button>
      </div>
    </div>
  );
};

export default Cards;
