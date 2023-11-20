// Importa las bibliotecas necesarias
import React from "react";
import { Link } from 'react-router-dom';
import manualUsuarioIcon from "./manual.png";
import manualBibliotecaIcon from "./manual.png";
import manualNavegacionIcon from "./manual.png";
import manualNavegacionRapidaIcon from "./manual.png";
import manualEvaluacionIcon from "./manual.png";
import manualAyudaIcon from "./manual.png";
import menuIcon from "../Home/menu.png";
import manualesStyles from "./Manuales.module.css"; 

function Manuales() {
  return (
    <div className={manualesStyles.container}>
      <header className={manualesStyles.header}>
        <div className={manualesStyles.menuIconContainer}>
          <img
            src={menuIcon}
            alt="Menú"
            className={manualesStyles.menuIcon}
          />
          Sistema Integrado de Gestión Institucional - SIGI
        </div>
      </header>
      <ul className={manualesStyles.listaManuales}>
        <li>
          <Link to="/manuales/usuario" className={manualesStyles.enlaceManual}>
            <img
              src={manualUsuarioIcon}
              alt="Manual de Usuario"
              className={manualesStyles.enlaceManualIcon}
            />
            <span className={manualesStyles.manualTitle}>Manual de Usuario</span>
          </Link>
        </li>
        <li>
          <Link to="/manuales/biblioteca" className={manualesStyles.enlaceManual}>
            <img
              src={manualBibliotecaIcon}
              alt="Manual Biblioteca"
              className={manualesStyles.enlaceManualIcon}
            />
            <span className={manualesStyles.manualTitle}>Manual Biblioteca</span>
          </Link>
        </li>
        <li>
          <Link to="/manuales/navegacion" className={manualesStyles.enlaceManual}>
            <img
              src={manualNavegacionIcon}
              alt="Manual Navegación"
              className={manualesStyles.enlaceManualIcon}
            />
            <span className={manualesStyles.manualTitle}>Manual Navegación</span>
          </Link>
        </li>
        <li>
          <Link to="/manuales/navegacion-rapida" className={manualesStyles.enlaceManual}>
            <img
              src={manualNavegacionRapidaIcon}
              alt="Manual Navegación Rápida"
              className={manualesStyles.enlaceManualIcon}
            />
            <span className={manualesStyles.manualTitle}>Manual Navegación Rápida</span>
          </Link>
        </li>
        <li>
          <Link to="/manuales/evaluacion" className={manualesStyles.enlaceManual}>
            <img
              src={manualEvaluacionIcon}
              alt="Manual Evaluación"
              className={manualesStyles.enlaceManualIcon}
            />
            <span className={manualesStyles.manualTitle}>Manual Evaluación</span>
          </Link>
        </li>
        <li>
          <Link to="/manuales/ayuda" className={manualesStyles.enlaceManual}>
            <img
              src={manualAyudaIcon}
              alt="Manual de Ayuda"
              className={manualesStyles.enlaceManualIcon}
            />
            <span className={manualesStyles.manualTitle}>Manual de Ayuda</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Manuales;
