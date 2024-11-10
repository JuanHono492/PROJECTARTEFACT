import React, { useState, useEffect } from 'react';
import './MedicalHistoryTable.css';

const MedicalHistoryTable = () => {
    const [historialData, setHistorialData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    // Función para obtener los datos del historial médico desde la API
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

    // Función para manejar el input del campo de búsqueda
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrar los datos del historial basado en el término de búsqueda
    const filteredData = historialData.filter((entry) => {
        return (
            entry.FechaConsulta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.Diagnostico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.Tratamiento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (entry.Medico && `${entry.Medico.Nombre} ${entry.Medico.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (entry.Paciente && `${entry.Paciente.Nombre} ${entry.Paciente.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="table-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar en el historial médico..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <table className="medical-history-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Paciente</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Doctor</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry.FechaConsulta).toLocaleDateString()}</td>
                                <td>{entry.Paciente ? `${entry.Paciente.Nombre} ${entry.Paciente.Apellido}` : 'N/A'}</td>
                                <td>{entry.Diagnostico}</td>
                                <td>{entry.Tratamiento}</td>
                                <td>{entry.Medico ? `${entry.Medico.Nombre} ${entry.Medico.Apellido}` : 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default MedicalHistoryTable;
