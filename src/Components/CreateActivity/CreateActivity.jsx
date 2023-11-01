import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CreateActivity.module.css";
import { Link } from "react-router-dom";

const CreateActivity = () => {

  const [serverError, setServerError] = useState("")

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const [nameError, setNameError] = useState("");
  const [countriesError, setCountriesError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const listCountries = async () => {
    try {
      const response = await axios.get("https://countriesback-production-12d6.up.railway.app/countries");
      const countriesData = response.data;
      setCountriesList(countriesData);
    } catch (error) {
      console.error("Error al traer la lista de los países: ", error);
    }
  };

  useEffect(() => {
    listCountries();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;


    if (name === "name") {
      if (value.trim() === "") {
        setNameError("Digita el nombre de tu actividad");
        setName(value); // Actualizamos el estado incluso si el nombre está en blanco
      } else if (/\d/.test(value)) {
        setNameError("El nombre no puede contener números");
      } else if (value.length > 30) {
        setNameError("El nombre no puede tener más de 30 letras");
      } else {
        setNameError("");
        setName(value);
      }

    } else if (name === "duration") {
      setDuration(value);
      console.log("duration:",value);

    } else if (name === "season") {
      setSeason(value);
      console.log("season",value);
    } else if (name === "countries") {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );

      // Limitar la selección a un máximo de tres países
      if (selectedOptions.length > 3) {
        setCountriesError("Selecciona hasta tres países solamente");
      } else {
        setCountriesError("");
        setSelectedCountries(selectedOptions);
      }
    } else if (name === "difficulty") {
      setSelectedDifficulty(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Transformar los nombres de los países seleccionados en sus IDs en mayúscula
    const selectedCountryIds = countriesList
      .filter((country) => selectedCountries.includes(country.name))
      .map((country) => country.id.toUpperCase());

    try {
      const response = await axios.post(
        "https://countriesback-production-12d6.up.railway.app/countries/activities",
        {
          name,
          difficulty: selectedDifficulty,
          duration,
          season,
          countries: selectedCountryIds,
        }
      );

      console.log("Actividad creada:", response.data);

      setName("");
      setSelectedDifficulty("");
      setDuration("");
      setSeason("");
      setSelectedCountries([]);
      setSuccessMessage(response.data.message); // mensaje desde el backend 😎
      setServerError("")
    } catch (error) {
      setServerError(error.response.data.message);// error desde el backend 😎
      console.error("Error al crear la actividad front:", error);
    }
  };

  const checkBox = [1, 2, 3, 4, 5] // array para mapear los checkradio de dificultad

  return (
    <div className={styles.background}>
      <div className={styles.containerform}>
        <h2 className={styles.title}>Crea tus Actividades</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <label>Nombre de Actividad:</label>
            <input type="text" name="name" value={name} onChange={handleInputChange} required />
            {nameError && <p className={styles.error}>{nameError}</p>}
          </div>
          <div className={styles.form}>
            <label>Dificultad:</label>
            <div>
              {checkBox.map((difficulty) => (
                <label key={difficulty}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty}
                    checked={selectedDifficulty === String(difficulty)}
                    onChange={handleInputChange}
                  />
                  {difficulty}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.form}>
            <label>Duración en Horas:</label>
            <select
              name="duration"
              value={duration}
              onChange={handleInputChange}
              required
            >
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
              <option value="3">3 horas</option>
              <option value="4">4 horas</option>
              <option value="5">5 horas</option>

            </select>
          </div>
          <div className={styles.form}>
            <label>Temporada:</label>
            <select name="season" value={season} onChange={handleInputChange} required>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
          </div>
          <div className={styles.form}>
            <label>Países:</label>
            <select
              name="countries"
              value={selectedCountries}
              onChange={handleInputChange}
              required
              multiple
            >
              <option value="" disabled>
                Selecciona hasta tres países
              </option>
              {countriesList.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {countriesError && <p className={styles.error}>{countriesError}</p>}
          </div>
          {serverError && <p className={styles.serverError}>{serverError}</p>}
          <button type="submit">Crear</button>
          <Link to="/home">
            <button className={styles.volver}>Volver</button>
          </Link>
        </form>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default CreateActivity;
