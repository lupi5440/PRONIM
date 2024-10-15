import React, { useState } from 'react';
import axios from 'axios';

const LoginProfesor = () => {
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/ProfesorRoutes/LoginProfesor', { Correo, Contraseña })
            .then(response => {
                if (response.data.success) {
                    window.location.href = "/dashboard_profesor.html";
                } else {
                    alert("Error: Usuario o contraseña incorrectos.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error en la solicitud.");
            });
    };

    return (
        <div>
            <h2>Login - Profesor</h2>
            <form onSubmit={handleSubmit}>
                <label>Correo electrónico:</label>
                <input
                    type="email"
                    placeholder="Correo"
                    value={Correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <br />
                <label>Contraseña:</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={Contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <br /><br />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default LoginProfesor;
