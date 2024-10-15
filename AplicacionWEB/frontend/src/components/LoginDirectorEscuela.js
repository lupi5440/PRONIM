import React, { useState } from 'react';
import axios from 'axios';

const LoginDirectorEscuela = () => {
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            Correo: Correo,
            Contraseña: Contraseña
        };

        axios.post('http://localhost:3001/DirectorEscuelaRoutes/LoginDirectorEscuela', loginData)
            .then(response => {
                if (response.data.success) {
                    window.location.href = "/dashboard_director_escuela.html";
                } else {
                    alert("Error: Usuario o contraseña incorrectos.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al iniciar sesión.');
            });
    };

    return (
        <div>
            <h2>Login - Director de Escuela</h2>
            <form onSubmit={handleSubmit}>
                <label>Correo electrónico:</label>
                <input
                    type="email"
                    name="Correo"
                    value={Correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <br />

                <label>Contraseña:</label>
                <input
                    type="password"
                    name="Contraseña"
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

export default LoginDirectorEscuela;
