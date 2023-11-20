import React, { useState, useEffect } from 'react';
import data from '../About/Manuales.json';
import styles from './ManualUsuario.module.css';

function ManualUsuario() {
  const [manual, setManual] = useState(null);

  useEffect(() => {
    const manualUsuario = data.manuales.find((m) => m.id === 'usuario');
    setManual(manualUsuario);
  }, []);

  if (!manual) return <div>Cargando...</div>;

  return (
    <div className={styles.manualContainer}>
      <h2 className={styles.manualTitulo}>{manual.titulo}</h2>
      {manual.secciones.map((seccion, index) => {
        if (seccion.tipo === 'texto') {
          // Si el contenido es un subtítulo, renderiza un elemento diferente
          if (seccion.tipo === 'encabezado') {
            // Aplica una clase específica para los encabezados
            return (
              <h3 key={index} className={`${styles.manualSubtitulo} ${styles.encabezado}`}>
                {seccion.contenido.replace('Subtítulo:', '')}
              </h3>
            );
          } else {
            return (
              <p key={index} className={styles.manualTexto}>
                {seccion.contenido}
              </p>
            );
          }
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
          // Si el tipo es "lista", renderiza las opciones de menú
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

export default ManualUsuario;
