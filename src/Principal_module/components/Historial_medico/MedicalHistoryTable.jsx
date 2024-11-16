import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MedicalHistoryTable.css';

const MedicalHistoryTable = () => {
    const [historialData, setHistorialData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Obtener los datos del historial médico desde la API
    useEffect(() => {
        const fetchHistorialData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/historias');
                if (response.ok) {
                    const data = await response.json();
                    setHistorialData(data);
                } else {
                    setError('Error al obtener el historial médico');
                }
            } catch (err) {
                console.error('Error al obtener datos:', err);
                setError('Error al obtener el historial médico');
            }
        };

        fetchHistorialData();
    }, []);

    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    const handleStartDateChange = (event) => setStartDate(event.target.value);

    const handleEndDateChange = (event) => setEndDate(event.target.value);

    const handleGenerateReport = async (entry) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/reportes/generate', // Endpoint del backend
                {
                    template: `
                        <h1>Reporte de Historial Médico</h1>
                        <p><strong>Paciente:</strong> ${entry.Paciente?.Nombre} ${entry.Paciente?.Apellido}</p>
                        <p><strong>DNI:</strong> ${entry.Paciente?.DNI}</p>
                        <p><strong>Género:</strong> ${entry.Paciente?.Genero}</p>
                        <p><strong>Tipo de Sangre:</strong> ${entry.Paciente?.TipoSangre}</p>
                        <p><strong>Doctor:</strong> ${entry.Medico?.Nombre} ${entry.Medico?.Apellido}</p>
                        <p><strong>Fecha de Cita:</strong> ${new Date(entry.FechaCita || entry.FechaConsulta).toLocaleDateString()}</p>
                        <p><strong>Motivo de Cita:</strong> ${entry.MotivoCita || 'N/A'}</p>
                        <p><strong>Estado de Cita:</strong> ${entry.EstadoCita || 'N/A'}</p>
                        <p><strong>Descripción de Cita:</strong> ${entry.DescripcionCita || 'N/A'}</p>
                        <p><strong>Diagnóstico:</strong> ${entry.Diagnostico}</p>
                        <p><strong>Tratamiento:</strong> ${entry.Tratamiento}</p>
                    `,
                    data: entry, // Los datos de la fila actual
                },
                {
                    responseType: 'blob', // Indicar que queremos un archivo binario
                }
            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `Reporte_${entry.Paciente?.Nombre}_${entry.Paciente?.Apellido}.pdf`;
            link.click();
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            alert('Error al generar el reporte');
        }
    };

    const filteredData = historialData.filter((entry) => {
        const entryDate = new Date(entry.FechaConsulta);
        const isInDateRange = (!startDate || entryDate >= new Date(startDate)) &&
                              (!endDate || entryDate <= new Date(endDate));

        return (
            isInDateRange &&
            (entry.FechaConsulta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.Diagnostico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.Tratamiento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.MotivoCita?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.EstadoCita?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.DescripcionCita?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.DNI?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.Paciente?.TipoSangre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (entry.Medico && `${entry.Medico.Nombre} ${entry.Medico.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (entry.Paciente && `${entry.Paciente.Nombre} ${entry.Paciente.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    });

    return (
        <div className="table-container" style={{ width: '100%', maxWidth: '1400px' }}>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar en el historial médico..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <div className="date-filter">
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="date-input"
                        placeholder="Fecha de inicio"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="date-input"
                        placeholder="Fecha de fin"
                    />
                </div>
            </div>

            <table className="medical-history-table">
                <thead>
                    <tr>
                        <th>Fecha de Cita</th>
                        <th>Paciente</th>
                        <th>DNI</th>
                        <th>Género</th>
                        <th>Tipo de Sangre</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Motivo de Cita</th>
                        <th>Estado de Cita</th>
                        <th>Descripción de Cita</th>
                        <th>Doctor</th>
                        <th>Reporte</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry.FechaCita || entry.FechaConsulta).toLocaleDateString()}</td>
                                <td>{entry.Paciente ? `${entry.Paciente.Nombre} ${entry.Paciente.Apellido}` : 'N/A'}</td>
                                <td>{entry.Paciente?.DNI || 'N/A'}</td>
                                <td>{entry.Paciente?.Genero || 'N/A'}</td>
                                <td>{entry.Paciente?.TipoSangre || 'N/A'}</td>
                                <td>{entry.Diagnostico}</td>
                                <td>{entry.Tratamiento}</td>
                                <td>{entry.MotivoCita || 'N/A'}</td>
                                <td>{entry.EstadoCita || 'N/A'}</td>
                                <td>{entry.DescripcionCita || 'N/A'}</td>
                                <td>{entry.Medico ? `Dr. ${entry.Medico.Nombre} ${entry.Medico.Apellido}` : 'N/A'}</td>
                                <td>
                                    <button
                                        onClick={() => handleGenerateReport(entry)}
                                        className="generate-report-button"
                                    >
                                        Generar Reporte
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default MedicalHistoryTable;
