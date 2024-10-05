// src/components/Inicio.js

import React, { useState } from 'react';
import './Inicio.css'; // Opcional: si deseas agregar estilos específicos

const Inicio = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica (puedes expandirla según tus necesidades)
    if (email.trim() === '' || password.trim() === '') {
      setError('Por favor ingresa un correo y contraseña válidos.');
      return;
    }
    
    // Autenticación ficticia para el ejemplo
    if (email === 'admin@reactapp.com' && password === '12345') {
      setError('');
      onLogin({ email });
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Inicio;
