import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Inicio.css';

const Inicio = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

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
            <div className="inicio-left">
                <div className="login-box">
                    <h2>Bienvenidos</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            placeholder="Usuario"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña"
                            required
                        />

                        {error && <p className="error-text">{error}</p>}

                        <div className="button-container">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="inicio-right">
                {/* Coloca aquí el logo o una imagen decorativa */}
                <div className="logo-container">
                    <img src="/ruta-al-logo.png" alt="Logo de la Clínica" className="logo-image" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Inicio;
