import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BasicTextFields from '../components/TextField'; // Importa el componente para los campos de texto
import ButtonUsage from '../components/Button'; // Importa el componente de botón
import './Inicio.css';

const Inicio = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado para manejar el loading

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Muestra el estado de carga mientras se espera la respuesta

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                navigate('/dashboard');
            } else {
                setError(data.error || 'Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error de red o del servidor.');
            setLoading(false);
        }
    };

    return (
        <div className="inicio-container">
            <Header />
            <main className="main-content">
                <div className="login-box">
                    <h2>Bienvenido a Hernández Lab</h2>
                    <p className="login-description">Por favor, ingrese sus credenciales para continuar</p>
                    
                    <form onSubmit={handleLogin}>
                        <BasicTextFields
                            label="Usuario"
                            value={credentials.username}
                            onChange={handleInputChange}
                            name="username"
                            type="text"
                            placeholder="Ingrese su usuario"
                        />

                        <BasicTextFields
                            label="Contraseña"
                            value={credentials.password}
                            onChange={handleInputChange}
                            name="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />

                        {error && <p className="error-text">{error}</p>}

                        {/* Botón de inicio de sesión */}
                        <div className="button-container">
                            <ButtonUsage onClick={handleLogin} disabled={loading}>
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </ButtonUsage>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Inicio;
