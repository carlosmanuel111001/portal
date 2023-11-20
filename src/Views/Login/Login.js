import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from "./Login.module.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Obtiene la función de navegación

  // Lista de usuarios (esto puede estar en otro archivo o base de datos)
  const users = [
    { username: "admin", password: "admin123" },
    { username: "usuario", password: "usuario123" },
  ];

  // Función para verificar las credenciales
  function checkCredentials(username, password) {
    const user = users.find((user) => user.username === username && user.password === password);
    return user ? user : null;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = checkCredentials(username, password);
  
    if (user) {
      onLogin(user.username, user.password, user.role); // Pasar también el rol
      navigate('/');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
