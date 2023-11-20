import React, { useState, useEffect } from 'react';
import datosIncidentes from '../About/Incidentes.json';
import styles from './Incidentes.module.css'; // Asegúrate de que el nombre del archivo coincida

function Incidentes() {
  const [incidentes, setIncidentes] = useState([]);

  useEffect(() => {
    setIncidentes(datosIncidentes.incidentes);
  }, []);

  return (
    <div className={styles.incidentesContainer}>
      <h1 className={styles.h1}>Incidentes</h1>
      {incidentes.map((incidente) => (
        <div key={incidente.id} className={styles.incidente}>
          <h2 className={styles.incidenteTitulo}>{incidente.titulo}</h2>
          <p className={styles.incidenteDescripcion}>{incidente.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

export default Incidentes;
