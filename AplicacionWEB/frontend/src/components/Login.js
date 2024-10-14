import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [Nombre, setNombre] = useState('');
    const [Contraseña, setContraseña] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/users/login', { Nombre, Contraseña })
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                alert(error.response.data);
            });
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={Contraseña} onChange={(e) => setContraseña(e.target.value)} required />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
