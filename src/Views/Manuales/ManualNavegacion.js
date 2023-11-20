// ManualNavegacion.js
import React, { useState, useEffect } from 'react';
import data from '../About/ManualNavegacion.json'; // Asegúrate de tener la ruta correcta al archivo JSON
import styles from './ManualNavegacion.module.css';

function ManualNavegacion() {
  const [manual, setManual] = useState(null);

  useEffect(() => {
    console.log(data.manuales); // Agrega esta línea para verificar el contenido
    const manualNavegacion = data.manuales.find((m) => m.id === 'navegacion');
    setManual(manualNavegacion);
  }, []);

  if (!manual) return <div>Cargando...</div>;

  return (
    <div className={styles.manualContainer}>
      <h2 className={styles.manualTitulo}>{manual.titulo}</h2>
      {manual.secciones.map((seccion, index) => {
        if (seccion.tipo === 'texto') {
          return (
            <p key={index} className={styles.manualTexto}>
              {seccion.contenido}
            </p>
          );
        } else if (seccion.tipo === 'imagen') {
          return (
            <img
              key={index}
              src={process.env.PUBLIC_URL + seccion.src}
              alt={`Imagen sección ${index}`}
              className={styles.manualImagen}
            />
          );
        } else if (seccion.tipo === 'lista') {
          return (
            <ul key={index} className={styles.manualLista}>
              {seccion.contenido.map((opcion, i) => (
                <li key={i} className={styles.manualListaItem}>
                  {opcion}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export default ManualNavegacion;
