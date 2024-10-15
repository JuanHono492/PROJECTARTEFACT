import React from 'react';
import NavigationBar from '../components/navegation_bar'; // Ajusta esta ruta según la ubicación del archivo
import './Consulta_externa.css'; // Asegúrate de que esta ruta sea correcta

const ConsultaExterna = () => {
    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar /> {/* Utiliza el componente de navegación aquí */}
            </nav>
            <main className="main-content">
                <h1>Consulta Externa</h1>
                <p>En proceso...</p>
            </main>
        </div>
    );
};

export default ConsultaExterna;
