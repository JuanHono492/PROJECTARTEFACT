import React, { useState } from 'react';
import NavigationBar from '../components/navegation_bar';
import MedicalHistoryTable from '../components/Historial_medico/MedicalHistoryTable';
import AddMedicalHistoryForm from './AddMedicalHistoryForm';
import './HistorialMedico.css'; // Archivo CSS actualizado

const Historial_medico = () => {
    const [showModal, setShowModal] = useState(false); // Estado para manejar la visibilidad del modal

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="historial-medico-wrapper">
            <NavigationBar />
            <div className="main-content">
                <MedicalHistoryTable />
                <button
                    className="floating-create-button"
                    onClick={handleOpenModal}
                >
                    + Agregar Historial
                </button>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <AddMedicalHistoryForm onClose={handleCloseModal} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Historial_medico;