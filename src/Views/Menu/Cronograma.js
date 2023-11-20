import React, { useState, useEffect } from 'react';
import datosCronograma from '../About/Cronograma.json'; // Asegúrate de que la ruta es correcta
import styles from './Cronograma.module.css'; // Asegúrate de que la ruta es correcta

function Cronograma() {
  const [cronograma, setCronograma] = useState(null); // Inicializa como null

  useEffect(() => {
    // Simular una carga asincrónica de datos
    // En un caso real, podrías estar haciendo una petición a una API aquí
    setTimeout(() => {
      setCronograma(datosCronograma); // Suponiendo que datosCronograma es el objeto completo del JSON
    }, 1000);
  }, []);

  // Comprueba si cronograma es null antes de intentar mapear
  if (!cronograma) {
    return <div>Cargando...</div>; // O un componente de carga/spinner
  }

  return (
    <div className={styles.container}>
      <h1>Cronograma de Actividades</h1>
      <table className={styles.cronogramaTable}>
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Responsable</th>
            <th>Fecha Inicial</th>
            <th>Fecha Final</th>
            <th>Avance del proceso</th>
          </tr>
        </thead>
        <tbody>
          {cronograma.actividades.map((actividad) => ( // Asegúrate de que cronograma.actividades es un array
            <tr key={actividad.actividad}>
              <td>{actividad.actividad}</td>
              <td>{actividad.responsables.join(", ")}</td>
              <td>{actividad.fechaInicial}</td>
              <td>{actividad.fechaFinal}</td>
              <td>{actividad.avance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cronograma;
