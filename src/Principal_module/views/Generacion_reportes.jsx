import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/navegation_bar';

const GeneracionReportes = () => {
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        // Recupera los datos del reporte desde localStorage
        const data = localStorage.getItem('reportData');
        if (data) {
            setReportData(JSON.parse(data));
        }
    }, []);

    const handlePrint = () => {
        window.print(); // Abre el diálogo de impresión
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar />
            </nav>
            <main className="main-content" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Generación de Reportes</h1>

                {reportData ? (
                    <div style={{
                        border: '1px solid #000',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>Reporte Médico</h2>
                        <p><strong>Paciente:</strong> {reportData.Paciente}</p>
                        <p><strong>DNI:</strong> {reportData.DNI}</p>
                        <p><strong>Sexo:</strong> {reportData.Genero}</p>
                        <p><strong>Edad:</strong> {reportData.Edad || 'N/A'}</p>
                        <p><strong>Médico:</strong> {reportData.Medico}</p>
                        <p><strong>Fecha de la Cita:</strong> {reportData.FechaCita}</p>
                        <p><strong>Motivo de la Cita:</strong> {reportData.MotivoCita}</p>
                        <p><strong>Estado de la Cita:</strong> {reportData.EstadoCita}</p>
                        <p><strong>Descripción:</strong> {reportData.DescripcionCita}</p>
                        <p><strong>Diagnóstico:</strong> {reportData.Diagnostico}</p>
                        <p><strong>Tratamiento:</strong> {reportData.Tratamiento}</p>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button 
                                onClick={handlePrint} 
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Imprimir Reporte
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>No se encontraron datos del reporte.</p>
                )}
            </main>
        </div>
    );
};

export default GeneracionReportes;
