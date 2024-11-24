import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAppointment.css';

const CreateAppointment = ({ selectedDate, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        PacienteID: '',
        NumeroHistoria: '',
        NombrePaciente: '',
        ApellidoPaciente: '',
        DNI: '',
        DoctorID: '',
        MotivoCita: '',
        DescripcionCita: '',
        FechaCita: selectedDate || '',
        HoraCita: '',
        Estado: 'Pendiente',
    });
    const [doctores, setDoctores] = useState([]);
    const [error, setError] = useState('');

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Cargar la lista de doctores al cargar el componente
    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/doctores`);
                if (response.ok) {
                    const data = await response.json();
                    setDoctores(data);
                } else {
                    setError('Error al obtener el historial médico');
                }
            } catch (err) {
                console.error('Error al obtener datos:', err);
                setError('Error al obtener el historial médico');
            }
        };
    
        fetchDoctores();
    }, [apiBaseUrl]);
    
    

    // Manejar los cambios en los campos
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Buscar datos por DNI
    const handleBuscarPorDNI = async () => {
        const dni = formData.DNI.trim();
        if (!dni) {
            alert('Ingrese un DNI válido.');
            return;
        }

        try {
            const x= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imhvbm9qdWFuOUBnbWFpbC5jb20ifQ.HHyPK1eIvEB9rIjgM6X3OEz9eLpAHALAytvN0aTpMaM"
            const response = await axios.get(
                `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${x}`
            );

            if (response.data) {
                const { nombres, apellidoPaterno, apellidoMaterno } = response.data;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    NombrePaciente: nombres,
                    ApellidoPaciente: `${apellidoPaterno} ${apellidoMaterno}`,
                }));
            } else {
                alert('No se encontraron datos para este DNI.');
            }
        } catch (error) {
            console.error('Error al buscar los datos del DNI:', error);
            alert('Hubo un error al buscar los datos del DNI.');
        }
    };
    // Manejar la creación de la cita
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiBaseUrl}/citas`, {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Indica que los datos son JSON
                },
                body: JSON.stringify(formData), // Convierte los datos en JSON
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Cita creada con éxito:', result);

            alert('Cita creada con éxito');
            onSave(); // Callback para actualizar la vista
        } catch (error) {
            console.error('Error al crear la cita:', error);
            alert('Hubo un error al crear la cita');
        }
    };


    return (
        <div className="appointment-form-container">
            <form onSubmit={handleSubmit} className="appointment-form">
                <h2>Crear Cita</h2>
                <div className="form-group">
                    <label>Nombre del Paciente:</label>
                    <input
                        type="text"
                        name="NombrePaciente"
                        value={formData.NombrePaciente}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Apellido del Paciente:</label>
                    <input
                        type="text"
                        name="ApellidoPaciente"
                        value={formData.ApellidoPaciente}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>DNI:</label>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="text"
                            name="DNI"
                            value={formData.DNI}
                            onChange={handleChange}
                            style={{ marginRight: '8px' }}
                        />
                        <button type="button" onClick={handleBuscarPorDNI}>
                            Buscar
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Nombre del Doctor:</label>
                    <select name="DoctorID" value={formData.DoctorID} onChange={handleChange}>
                        <option value="">Seleccione un doctor</option>
                        {doctores.map((doctor) => (
                            <option key={doctor.UsuarioID} value={doctor.UsuarioID}>
                                {doctor.Nombre} {doctor.Apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Motivo de Cita:</label>
                    <input type="text" name="MotivoCita" value={formData.MotivoCita} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Descripción de la Cita:</label>
                    <textarea name="DescripcionCita" value={formData.DescripcionCita} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Fecha de Cita:</label>
                    <input type="date" name="FechaCita" value={formData.FechaCita} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Hora de Cita:</label>
                    <input type="time" name="HoraCita" value={formData.HoraCita} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Estado:</label>
                    <select name="Estado" value={formData.Estado} onChange={handleChange}>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div className="form-buttons">
                    <button type="submit">Crear Cita</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CreateAppointment;
