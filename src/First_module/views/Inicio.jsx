import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BasicTextFields from '../components/TextField'; // Importa el componente para los campos de texto
import ButtonUsage from '../components/Button'; // Importa el componente de botón
import './Inicio.css';

const Inicio = () => {
    const navigate = useNavigate(); // Hook para redirigir después de iniciar sesión
    const [credentials, setCredentials] = useState({ username: '', password: '' }); // Estado para almacenar las credenciales
    const [error, setError] = useState(''); // Estado para mostrar errores

    // Función para manejar los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value, // Actualiza dinámicamente el username o password
        });
    };

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        const validUsername = 'medico';
        const validPassword = '1234';

        // Verifica si las credenciales son correctas
        if (credentials.username === validUsername && credentials.password === validPassword) {
            navigate('/dashboard'); // Redirige al dashboard si las credenciales son correctas
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="inicio-container">
            <Header />
            <main className="main-content">
                <h2>Bienvenido a Hernández Lab</h2>
                <p>Inicio de sesión:</p>
                
                <form>
                    {/* Campo de texto para el usuario */}
                    <BasicTextFields
                        label="Usuario"
                        value={credentials.username}
                        onChange={handleInputChange}
                        name="username"
                        type="text"
                    />

                    {/* Campo de texto para la contraseña */}
                    <BasicTextFields
                        label="Contraseña"
                        value={credentials.password}
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}

                    {/* Botón de inicio de sesión que ejecuta handleLogin al hacer clic */}
                    <ButtonUsage onClick={handleLogin} /> 
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Inicio;
