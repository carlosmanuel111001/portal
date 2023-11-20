import React from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import styles from './Main.module.css';
import manualTecnico from '../About/Manual.json';
import requisitosEspecificaciones from '../About/Requisitos.json';
import incidentes from '../About/Incidentes.json';
import rendimientoOptimizacion from '../About/Rendimiento.json';



function Main() {
  const generatePDF = () => {
    if (!window.confirm("¿Estás seguro de que deseas descargar el Reporte Técnico?")) {
      return; // Si el usuario selecciona 'Cancelar', no se hace nada
    }

    const doc = new jsPDF();
    let y = 10; // La posición inicial en el eje Y para el texto
    // Añade una sección de título con control de espacio
    const addSectionTitle = (title) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
;
    if (typeof title !== 'string') {
      console.error('El título proporcionado no es una cadena de texto:', title);
      return; // Salir de la función si el título no es válido
    }
  
    doc.text(title, 10, y);
    y += 6;
  };

    // Añade un párrafo de texto con control de espacio
    const addParagraph = (text) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      // Asegúrate de que el ancho del texto sea menor que el ancho de la página menos los márgenes
      const lines = doc.splitTextToSize(text, 180); // Ajusta esto según el tamaño de tu página y los márgenes deseados
      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += 5;
      });
      y += 5; // Espacio adicional después de un párrafo
    };

    // Añade una lista con viñetas con control de espacio
    const addBulletedList = (items) => {
      items.forEach((item) => {
        // Verifica si el texto se cortará al agregarlo y, si es así, agrega una nueva página
        if (y + 10 > 280) { // Ajusta el valor 10 según sea necesario para el espacio entre elementos de la lista
          doc.addPage();
          y = 10;
        }
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        // Añade el elemento de la lista
        doc.text(`- ${item}`, 15, y);
        y += 5; // Espacio entre elementos de la lista
      });
      y += 5; // Espacio adicional después de la lista
    };
    // Añade el título principal
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Reporte Técnico", 105, y, { align: 'center' });
    y += 10;

    // Manual Técnico
    addSectionTitle(manualTecnico["Manual Técnico"].titulo);
    addParagraph(manualTecnico["Manual Técnico"]["Introducción"]);

    // Requisitos y Especificaciones
    addSectionTitle(requisitosEspecificaciones.titulo);
    addParagraph(requisitosEspecificaciones.introduccion);

    // Requisitos Funcionales
    addSectionTitle(requisitosEspecificaciones.requisitosFuncionales.titulo);
    addParagraph(requisitosEspecificaciones.requisitosFuncionales.descripcion);
    const rfItems = requisitosEspecificaciones.requisitosFuncionales.items.map(item => `${item.id}: ${item.descripcion}`);
    addBulletedList(rfItems);

    // Requisitos No Funcionales
    addSectionTitle(requisitosEspecificaciones.requisitosNoFuncionales.titulo);
    addParagraph(requisitosEspecificaciones.requisitosNoFuncionales.descripcion);
    const rnfItems = requisitosEspecificaciones.requisitosNoFuncionales.items.map(item => `${item.id}: ${item.subtitulo} - ${item.descripcion}`);
    addBulletedList(rnfItems);

    // Rendimiento y Optimización
    addSectionTitle(rendimientoOptimizacion.rendimientoYOptimizacion.titulo);
    addParagraph(rendimientoOptimizacion.rendimientoYOptimizacion.descripcion);

    // Detalles del rendimiento y optimización
    rendimientoOptimizacion.rendimientoYOptimizacion.detalles.forEach(detalle => {
      // Añade una sección para cada detalle
      addSectionTitle(detalle.categoria);
    
      if (detalle.items) {
        const detalleItems = detalle.items.map(item => `${item.nombre}: ${item.descripcion}`);
        // Añade los elementos como una lista con viñetas
        addBulletedList(detalleItems);
      } else {
        // Si no hay elementos, agrega el texto como un párrafo
        addParagraph(detalle.descripcion);
      }
    });

    // Incidentes
    addSectionTitle("Incidentes y Problemas");
    incidentes.incidentes.forEach(inc => {
      addParagraph(`${inc.titulo}: ${inc.descripcion}`);
    });

    // Descargar el PDF
    doc.save('ReporteTecnico.pdf');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Sistema Integrado de Gestión Institucional - SIGI
      </header>

      <nav className={styles.topMenu}>
        <Link to="/incidentes" className={styles.menuItem}>Incidentes</Link>
        <Link to="/requisitos" className={styles.menuItem}>Requisitos</Link>
        <Link to="/rendimientos" className={styles.menuItem}>Rendimientos</Link>
        <Link to="/cronograma" className={styles.menuItem}>Cronograma</Link>
      </nav>

      <div className={styles.content}>
        <div className={styles.description}>
          <h2>Descripción del Portal Estudiantil</h2>
          <p>
            Bienvenido al portal estudiantil, tu fuente de información y
            recursos académicos. Aquí encontrarás manuales, descargas y más para
            facilitar tu experiencia estudiantil.
          </p>
        </div>
        <div className={styles.buttons}>
          <Link to="/manuales" className={styles.button}>Manuales</Link>
          <button onClick={generatePDF} className={styles.button}>
          Descargar Reporte Técnico
        </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
