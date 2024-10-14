import React, { useState } from 'react';
import NavigationBar from '../components/navegation_bar';
import InputField from '../components/Gestion_usuarios/InputField';
import SelectField from '../components/Gestion_usuarios/SelectField';
import AddressSection from '../components/Gestion_usuarios/AddressSection';
import ContactSection from '../components/Gestion_usuarios/ContactSection';
import './Gestion_usuarios.css'; // Importar los nuevos estilos

const GestionUsuarios = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        segundoNombre: '',
        apellido: '',
        codigoEmpleado: '',
        posicion: '',
        departamento: '',
        sucursal: '',
        telefonoOficina: '',
        extension: '',
        movil: '',
        email: '',
        direccion: {
            calle: '',
            ciudad: '',
            estado: '',
            codigoPostal: ''
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            direccion: {
                ...formData.direccion,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    const posiciones = [
        { value: 'Administrativo', label: 'Administrativo' },
        { value: 'Almacen', label: 'Almacén' },
        { value: 'Gerente', label: 'Gerente' },
        { value: 'Ventas', label: 'Ventas' },
        { value: 'Seguridad', label: 'Seguridad' }
    ];

    const departamentos = [
        { value: 'Administración', label: 'Administración' },
        { value: 'Finanzas', label: 'Finanzas' },
        { value: 'IT', label: 'IT' }
    ];

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar /> 
            </nav>
            <main className="main-content">
                <div className="card">
                    <h1>Registro de Usuario</h1>
                    <form onSubmit={handleSubmit} className="user-form">
                        <div className="form-section">
                            <InputField 
                                label="Nombre" 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleInputChange} 
                            />
                            <InputField 
                                label="Segundo Nombre" 
                                type="text" 
                                name="segundoNombre" 
                                value={formData.segundoNombre} 
                                onChange={handleInputChange} 
                            />
                            <InputField 
                                label="Apellido" 
                                type="text" 
                                name="apellido" 
                                value={formData.apellido} 
                                onChange={handleInputChange} 
                            />
                            <InputField 
                                label="Código de Empleado" 
                                type="text" 
                                name="codigoEmpleado" 
                                value={formData.codigoEmpleado} 
                                onChange={handleInputChange} 
                            />
                        </div>

                        <div className="form-section">
                            <SelectField 
                                label="Posición" 
                                name="posicion" 
                                value={formData.posicion} 
                                onChange={handleInputChange} 
                                options={posiciones} 
                            />
                            <SelectField 
                                label="Departamento" 
                                name="departamento" 
                                value={formData.departamento} 
                                onChange={handleInputChange} 
                                options={departamentos} 
                            />
                            <InputField 
                                label="Sucursal" 
                                type="text" 
                                name="sucursal" 
                                value={formData.sucursal} 
                                onChange={handleInputChange} 
                            />
                        </div>

                        <ContactSection formData={formData} handleInputChange={handleInputChange} />
                        <AddressSection direccion={formData.direccion} handleAddressChange={handleAddressChange} />

                        <button type="submit" className="submit-button">Guardar Usuario</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default GestionUsuarios;
