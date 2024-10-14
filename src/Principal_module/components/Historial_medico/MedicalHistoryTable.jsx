import React, { useState } from 'react';
import './MedicalHistoryTable.css';

const MedicalHistoryTable = () => {
    // Datos simulados para la tabla
    const historialData = [
        {
            fecha: '2024-10-10',
            horaConsulta: '10:30 AM',
            motivoConsulta: 'Dolor de cabeza persistente',
            diagnostico: 'Migraña crónica',
            tratamiento: 'Analgésicos y descanso',
            doctor: 'Dr. Pérez',
            horaAtencion: '10:30 AM - 11:00 AM'
        },
        {
            fecha: '2024-09-15',
            horaConsulta: '01:00 PM',
            motivoConsulta: 'Fractura de brazo',
            diagnostico: 'Fractura en radio distal',
            tratamiento: 'Inmovilización con yeso',
            doctor: 'Dra. García',
            horaAtencion: '01:00 PM - 02:00 PM'
        },
        {
            fecha: '2024-08-05',
            horaConsulta: '03:45 PM',
            motivoConsulta: 'Dolor lumbar',
            diagnostico: 'Hernia discal',
            tratamiento: 'Fisioterapia y medicamentos',
            doctor: 'Dr. Ruiz',
            horaAtencion: '03:45 PM - 04:15 PM'
        }
    ];

    // Estado para almacenar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Función para manejar el input del campo de búsqueda
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrar los datos del historial basado en el término de búsqueda
    const filteredData = historialData.filter((entry) => {
        return (
            entry.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.horaConsulta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.motivoConsulta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.diagnostico.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.tratamiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.horaAtencion.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="table-container">
            {/* Input de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar en el historial médico..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Tabla de historial */}
            <table className="medical-history-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora de Consulta</th>
                        <th>Motivo de Consulta</th>
                        <th>Diagnóstico</th>
                        <th>Tratamiento</th>
                        <th>Doctor</th>
                        <th>Hora de Atención</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.fecha}</td>
                                <td>{entry.horaConsulta}</td>
                                <td>{entry.motivoConsulta}</td>
                                <td>{entry.diagnostico}</td>
                                <td>{entry.tratamiento}</td>
                                <td>{entry.doctor}</td>
                                <td>{entry.horaAtencion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalHistoryTable;
