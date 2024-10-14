import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './First_module/views/Inicio';
import Dashboard from './Principal_module/views/Dashboard';
import GestionCitas from './Principal_module/views/Gestion_citas';
import HistorialClinico from './Principal_module/views/Historial_medico';
import ConsultaExterna from './Principal_module/views/Consulta_externa';
import GeneracionReportes from './Principal_module/views/Generacion_reportes';
import GestionUsuarios from './Principal_module/views/Gestion_usuarios';
import Perfil from './User_module/views/Perfil';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Inicio />} />
        
        {/* Módulo Principal */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gestion-citas" element={<GestionCitas />} />
        <Route path="/historial-clinico" element={<HistorialClinico />} />
        <Route path="/consulta-externa" element={<ConsultaExterna />} />
        <Route path="/generacion-reportes" element={<GeneracionReportes />} />
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
        
        {/* Módulo de Usuario */}
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
