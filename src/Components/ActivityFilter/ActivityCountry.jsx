import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./activity.module.css";
import { Link } from "react-router-dom";

const ActivityCountry = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [selectedActivityInfo, setSelectedActivityInfo] = useState(null);
 

  const { id } = useParams();

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    // Si hay un ID de actividad en la URL, seleccionamos automáticamente la actividad
    if (id) {
      setSelectedActivityId(id);
    }
  }, [id]);

  useEffect(() => {
    console.log('useefect en uso');
    // Actualizar la información de la actividad y el país cuando cambia la selección
    if (selectedActivityId) {
      const selectedActivity = activities.find(
        (activity) => activity.id === selectedActivityId
      );
      setSelectedActivityInfo(selectedActivity);
  
    }
  }, [selectedActivityId, activities]);

 

  const handleActivitySelect =  (event) => {
    const selectedActivityId = event.target.value;
    setSelectedActivityId(selectedActivityId);
    console.log(selectedActivityId);
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get("https://countriesback-production-14f4.up.railway.app/countries/activities");
      setActivities(response.data);
      console.log("Actividades obtenidas:", response.data);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
    }
  };

  return (
    <div className={styles.containerSelect}>
      <div className={styles.selectContainer}>
        <label htmlFor="activitySelect" className={styles.label}>
          Selecciona una actividad:
        </label>
        <select
          value={selectedActivityId}
          onChange={handleActivitySelect}
          className={styles.selectCustom}
        >
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
        <Link to="/home">
          <button className={styles.volveract}>Volver</button>
        </Link>
      </div>
      <div className={styles.cardContainerWrapper}>
        {selectedActivityInfo && (
          <div className={`${styles.cardContainer} show`}>
            <h3>Información de la actividad:</h3>
            <p>Nombre: {selectedActivityInfo.name}</p>
            <p>Dificultad: {selectedActivityInfo.difficulty}</p>
            <p>Duración en Hrs: {selectedActivityInfo.duration}</p>
            <p>Temporada: {selectedActivityInfo.season}</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCountry;
