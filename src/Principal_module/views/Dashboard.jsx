import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/gestion-citas">Gestión de Citas</Link></li>
                    <li><Link to="/historial-clinico">Historial Clínico</Link></li>
                    <li><Link to="/consulta-externa">Consulta Externa</Link></li>
                    <li><Link to="/generacion-reportes">Generación de Reportes</Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h1>Bienvenido al Dashboard</h1>
                <p>Aquí puedes gestionar las funciones del laboratorio.</p>
            </main>
        </div>
    );
};

export default Dashboard;
