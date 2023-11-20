import React, { useState, useEffect } from 'react';
import datosRendimiento from '../About/Rendimiento.json'; // Asegúrate de que la ruta es correcta
import styles from './Rendimiento.module.css'; // Puedes usar estilos similares

function Rendimiento() {
    const [rendimientos, setRendimientos] = useState({});  // Cambiado de [] a {}
  
    useEffect(() => {
      // Simula la carga de datos asíncrona
      setTimeout(() => {
        setRendimientos(datosRendimiento.rendimientoYOptimizacion);  // Asegúrate de ajustar esto
      }, 1000);
    }, []);
  
    // Verificar que rendimientos.detalles exista antes de intentar mapear sobre él
    if (!rendimientos.detalles) {
      return <div>Cargando...</div>; // Mostrar algún tipo de indicador de carga
    }
  return (
    <div className={styles.container}>
      <h1>{rendimientos.titulo}</h1>
      <p>{rendimientos.descripcion}</p>
      {rendimientos.detalles.map((detalle) => (
        <div key={detalle.categoria}>
          <h2>{detalle.categoria}</h2>
          {detalle.descripcion && <p>{detalle.descripcion}</p>}
          {detalle.items && (
            <ul>
              {detalle.items.map((item) => (
                <li key={item.id}>
                  {item.nombre && <strong>{item.nombre}: </strong>}
                  {item.descripcion}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Rendimiento;
