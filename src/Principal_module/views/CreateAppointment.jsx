import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAppointment.css';

const CreateAppointment = ({ selectedDate, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        PacienteID: '',        // ID del paciente
        DoctorID: '',          // ID del doctor (solo el DoctorID se enviará)
        FechaCita: selectedDate || '', // Fecha de la cita
        HoraCita: '',          // Hora de la cita
        MotivoCita: '',        // Motivo de la cita
        Estado: 'Pendiente',   // Estado de la cita (Pendiente, Completada, Cancelada)
        DescripcionCita: '',   // Descripción de la cita
    });

    const [doctores, setDoctores] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState('');

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Cargar la lista de doctores
    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/doctores`);
                setDoctores(response.data);
            } catch (err) {
                console.error('Error al obtener los doctores:', err);
                setError('Error al obtener los doctores');
            }
        };

        fetchDoctores();
    }, [apiBaseUrl]);

    // Cargar la lista de pacientes
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/pacientes`);
                setPacientes(response.data);
            } catch (err) {
                console.error('Error al obtener los pacientes:', err);
                setError('Error al obtener los pacientes');
            }
        };

        fetchPacientes();
    }, [apiBaseUrl]);

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar la selección del doctor (solo se guarda el DoctorID, no el nombre)
    const handleDoctorChange = (e) => {
        const selectedDoctorID = e.target.value;  // Tomar solo el DoctorID
        console.log("DoctorID seleccionado:", selectedDoctorID);  // Verificar el DoctorID seleccionado
        setFormData({ ...formData, DoctorID: selectedDoctorID });  // Asignar solo el DoctorID
    };

    // Manejar la creación de la cita
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar los datos que se enviarán
        console.log("Datos a enviar (formData):", formData);

        // Solo enviamos los campos relevantes para la creación de una cita
        const citaData = {
            PacienteID: formData.PacienteID,
            DoctorID: formData.DoctorID,  // Solo el DoctorID (no el nombre)
            FechaCita: formData.FechaCita,
            HoraCita: formData.HoraCita,
            MotivoCita: formData.MotivoCita,
            Estado: formData.Estado,
            DescripcionCita: formData.DescripcionCita,
        };

        console.log("Cita Data a enviar:", citaData);

        try {
            const response = await axios.post(`${apiBaseUrl}/citas`, citaData);
            console.log('Cita creada con éxito:', response.data);
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
                    <label>Paciente:</label>
                    <select name="PacienteID" value={formData.PacienteID} onChange={handleChange}>
                        <option value="">Seleccione un paciente</option>
                        {pacientes.map((paciente) => (
                            <option key={paciente.PacienteID} value={paciente.PacienteID}>
                                {paciente.Nombre} {paciente.Apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Doctor:</label>
                    <select name="DoctorID" value={formData.DoctorID} onChange={handleDoctorChange}>
                        <option value="">Seleccione un doctor</option>
                        {doctores.map((doctor) => (
                            <option key={doctor.DoctorID} value={doctor.DoctorID}>
                                {doctor.Nombre} {doctor.Apellido} {/* Mostramos el nombre del doctor */}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Motivo de Cita:</label>
                    <input
                        type="text"
                        name="MotivoCita"
                        value={formData.MotivoCita}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Descripción de la Cita:</label>
                    <textarea
                        name="DescripcionCita"
                        value={formData.DescripcionCita}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha de Cita:</label>
                    <input
                        type="date"
                        name="FechaCita"
                        value={formData.FechaCita}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Hora de Cita:</label>
                    <input
                        type="time"
                        name="HoraCita"
                        value={formData.HoraCita}
                        onChange={handleChange}
                    />
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
