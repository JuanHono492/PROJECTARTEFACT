import React, { useState } from 'react';
import './AddMedicalHistoryForm.css'; // Importamos el CSS

const AddMedicalHistoryForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        PacienteID: '',
        CitaID: '',
        FechaConsulta: '',
        DoctorID: '',
        Diagnostico: '',
        Tratamiento: '',
        NotasAdicionales: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Historial médico enviado:', formData);
        onClose(); // Cerramos el modal al guardar
    };

    return (
        <div className="modal-overlay">
            <div className="form-container">
                <h2>Agregar Historial Médico</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre del Paciente:</label>
                        <input
                            type="text"
                            name="nombrePaciente"
                            value={formData.nombrePaciente}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Apellido del Paciente:</label>
                        <input
                            type="text"
                            name="apellidoPaciente"
                            value={formData.apellidoPaciente}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>DNI:</label>
                        <input
                            type="text"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Doctor:</label>
                        <select
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un doctor</option>
                            <option value="Dr. Juan Pérez">Dr. Juanito</option>
                        </select>
                    </div>
                    <div>
                        <label>Diagnóstico:</label>
                        <textarea
                            name="diagnostico"
                            value={formData.diagnostico}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Tratamiento:</label>
                        <textarea
                            name="tratamiento"
                            value={formData.tratamiento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Notas Adicionales:</label>
                        <textarea
                            name="notasAdicionales"
                            value={formData.notasAdicionales}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicalHistoryForm;
