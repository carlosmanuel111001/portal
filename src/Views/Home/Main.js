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

    const marginLeft = 20; // Margen izquierdo
    const marginRight = 20; // Margen derecho
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginLeft - marginRight;

    // Añade una sección de título con control de espacio y color
    const addSectionTitle = (title) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      if (typeof title !== 'string') {
        console.error('El título proporcionado no es una cadena de texto:', title);
        return;
      }
    
      doc.setFontSize(14);
      doc.setTextColor(100, 0, 0); // Color rojo para el título
      doc.setFont("helvetica", "bold");
      doc.text(title, marginLeft, y); // Inicia el texto desde el margen izquierdo
      doc.setTextColor(0, 0, 0); // Volver al color negro para el texto normal
      y += 6;
    };

    // Añade un párrafo de texto con control de espacio
    const addParagraph = (text) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, contentWidth); 
      lines.forEach((line) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        // Asegurar que el texto se ajusta al ancho de contenido y no sobrepasa el margen derecho
        doc.text(line, marginLeft, y, { maxWidth: contentWidth, align: 'justify' }); 
        y += 6;
      });
      y += 5;
    };
    
    

    // Añade una lista con viñetas con control de espacio
    const addBulletedList = (items) => {
      items.forEach((item) => {
        if (y + 10 > 280) {
          doc.addPage();
          y = 10;
        }
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const bulletOffset = 5; // Espacio para la viñeta
    
        // Divide el texto de cada ítem para que se ajuste dentro del ancho del contenido
        const itemLines = doc.splitTextToSize(item, contentWidth - bulletOffset); 
        itemLines.forEach((line, index) => {
          // Solo añade la viñeta en la primera línea de cada ítem
          const text = index === 0 ? `- ${line}` : line;
          doc.text(text, marginLeft + bulletOffset, y);
          y += 5;
        });
      });
      y += 5;
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
