import React from 'react';
import NavigationBar from '../components/navegation_bar';
import MedicalHistoryTable from '../components/Historial_medico/MedicalHistoryTable';

const Historial_medico = () => {
    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar /> 
            </nav>
            <main className="main-content">
                <MedicalHistoryTable />
            </main>
        </div>
    );
};

export default Historial_medico;
