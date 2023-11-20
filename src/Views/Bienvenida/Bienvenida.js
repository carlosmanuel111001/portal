import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpeg'; // Asegúrate de tener la ruta correcta a tu imagen de logo
import styles from './Bienvenida.module.css';

function Bienvenida() {
  return (
    <div className={styles.contenedor}>
      <header className={styles.encabezado}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo de InfoEstudia" className={styles.logo} />
          <div className={styles.tituloContainer}>
            <h1 className={styles.titulo}>Bienvenido a InfoStudia</h1>
            <p className={styles.subtitulo}>Tu plataforma educativa favorita</p>
          </div>
        </div>
      </header>
      <main className={styles.cuerpo}>
        <p className={styles.textoPrincipal}>
          ¡Bienvenido a nuestro sitio web! Estamos encantados de tenerte aquí.
          En esta plataforma, encontrarás información valiosa y emocionante sobre diversos temas.
        </p>
        <Link to="/main" className={styles.botonPrincipal}>
          Entrar
        </Link>
      </main>
    </div>
  );
}

export default Bienvenida;
