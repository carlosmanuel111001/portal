import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Views/Login/Login';
import Welcome from './Views/Bienvenida/Bienvenida';
import Main from './Views/Home/Main';
import Manuales from './Views/Manuales/Manuales';
import ManualUsuario from './Views/Manuales/ManualUsuario';
import ManualBiblioteca from './Views/Manuales/ManualBiblioteca';
import ManualNavegacion from './Views/Manuales/ManualNavegacion';
import ManualNavegacionRapida from './Views/Manuales/ManualNavegacionRapida';
import ManualEvaluacion from './Views/Manuales/ManualEvaluacion';
import ManualAyuda from './Views/Manuales/ManualAyuda';
import Incidentes from './Views/Menu/Incidentes';
import Requisitos from './Views/Menu/Requisitos';
import Rendimiento from './Views/Menu/Rendimiento';
import Cronograma from './Views/Menu/Cronograma';

function App() {
  const [user, setUser] = useState(null);
  const users = {
    admin: {
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    },
    user: {
      username: 'usuario',
      password: 'usuario123',
      role: 'user',
    },
  };

  const handleLogin = (username, password, role) => {
    // resto del código
    setUser({ username, role }); // Establecer el usuario con el rol
  };
  const handleLogout = () => {
    setUser(null);
    // Puedes redirigir al usuario a la página de inicio o login aquí
  };

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            {/* Rutas accesibles después del inicio de sesión */}
            <Route path="/" element={<Welcome onLogout={handleLogout} />} />
            <Route path="/main" element={<Main />} />
            <Route path="/manuales" element={<Manuales />} />
            <Route path="/manuales/usuario" element={<ManualUsuario />} />
            <Route path="/manuales/biblioteca" element={<ManualBiblioteca />} />
            <Route path="/manuales/navegacion" element={<ManualNavegacion />} />
            <Route
              path="/manuales/navegacion-rapida"
              element={<ManualNavegacionRapida />}
            />
            <Route path="/manuales/evaluacion" element={<ManualEvaluacion />} />
            <Route path="/manuales/ayuda" element={<ManualAyuda />} />
            <Route path="/incidentes" element={<Incidentes />} />
            <Route path="/requisitos" element={<Requisitos />} />
            <Route path="/rendimientos" element={<Rendimiento />} />
            <Route path="/cronograma" element={<Cronograma />} />
          </>
        ) : (
          <>
            {/* Ruta de inicio de sesión */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {/* Redirige a inicio de sesión si no se ha iniciado sesión */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
