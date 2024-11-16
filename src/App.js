import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./First_module/views/Inicio";
import Dashboard from "./Principal_module/views/Dashboard";
import GestionCitas from "./Principal_module/views/CalendarView";
import HistorialMedico from "./Principal_module/views/Historial_medico";
import GeneracionReportes from "./Principal_module/views/Generacion_reportes";
import GestionUsuarios from "./Principal_module/views/Gestion_usuarios";
import Perfil from "./User_module/views/Perfil";
import CrearUsuario from "./User_module/views/CrearUsuario";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Inicio />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/gestion-citas"
          element={
            <PrivateRoute>
              <GestionCitas />
            </PrivateRoute>
          }
        />
        <Route
          path="/historial-clinico"
          element={
            <PrivateRoute>
              <HistorialMedico />
            </PrivateRoute>
          }
        />
        <Route
          path="/generacion-reportes"
          element={
            <PrivateRoute>
              <GeneracionReportes />
            </PrivateRoute>
          }
        />
        <Route
          path="/gestion-usuarios"
          element={
            <PrivateRoute>
              <GestionUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/crear-usuario"
          element={
            <PrivateRoute>
              <CrearUsuario />
            </PrivateRoute>
          }
        />
        
        {/* Módulo de Usuario */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
