import React, { useState, useEffect } from 'react';
import datosRequisitos from '../About/Requisitos.json';
import styles from './Requisitos.module.css';

function Requisitos() {
    const [requisitos, setRequisitos] = useState({});
  
    useEffect(() => {
      setRequisitos(datosRequisitos);
    }, []);
  
    if (!requisitos.titulo) {
      return <div>Cargando...</div>; // O cualquier otra representación de carga
    }
  
  return (
    <div className={styles.container}>
      <h1>{requisitos.titulo}</h1>
      <p>{requisitos.introduccion}</p>

      <h2>{requisitos.requisitosFuncionales.titulo}</h2>
      <p>{requisitos.requisitosFuncionales.descripcion}</p>
      <ul>
        {requisitos.requisitosFuncionales.items.map((rf) => (
          <li key={rf.id}>{rf.id}: {rf.descripcion}</li>
        ))}
      </ul>

      <h2>{requisitos.requisitosNoFuncionales.titulo}</h2>
      <p>{requisitos.requisitosNoFuncionales.descripcion}</p>
      <ul>
        {requisitos.requisitosNoFuncionales.items.map((rnf) => (
          <li key={rnf.id}>
            <strong>{rnf.id}</strong> - {rnf.subtitulo}: {rnf.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requisitos;
