import React, { useState } from 'react';
import axios from 'axios';

const RegisterProfesor = () => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Fecha_de_Nacimiento: '',
        CURP: '',
        Sexo: 'Masculino',
        RFC: '',
        Cedula_Profesional: '',
        ID_CT: '',
        Correo: '',
        Contraseña: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/ProfesorRoutes/RegisterProfesor', formData)
            .then(response => {
                if (response.data.success) {
                    alert('Profesor registrado con éxito');
                } else {
                    alert('Error al registrar al Profesor');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al registrar al Profesor');
            });
    };

    return (
        <div>
            <h2>Registrar Profesor</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Nombre">Nombre:</label>
                <input
                    type="text"
                    id="Nombre"
                    name="Nombre"
                    placeholder="Introduce el nombre"
                    title="Introduce el nombre del profesor"
                    value={formData.Nombre}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Primer_Apellido">Primer Apellido:</label>
                <input
                    type="text"
                    id="Primer_Apellido"
                    name="Primer_Apellido"
                    placeholder="Introduce el primer apellido"
                    title="Introduce el primer apellido"
                    value={formData.Primer_Apellido}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Segundo_Apellido">Segundo Apellido:</label>
                <input
                    type="text"
                    id="Segundo_Apellido"
                    name="Segundo_Apellido"
                    placeholder="Introduce el segundo apellido"
                    title="Introduce el segundo apellido"
                    value={formData.Segundo_Apellido}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Fecha_de_Nacimiento">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    id="Fecha_de_Nacimiento"
                    name="Fecha_de_Nacimiento"
                    placeholder="Selecciona la fecha de nacimiento"
                    title="Selecciona la fecha de nacimiento"
                    value={formData.Fecha_de_Nacimiento}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="CURP">CURP:</label>
                <input
                    type="text"
                    id="CURP"
                    name="CURP"
                    placeholder="Introduce el CURP"
                    title="Introduce el CURP del profesor"
                    value={formData.CURP}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Sexo">Sexo:</label>
                <select
                    id="Sexo"
                    name="Sexo"
                    title="Selecciona el sexo del profesor"
                    value={formData.Sexo}
                    onChange={handleChange}
                >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otros">Otros</option>
                </select><br />

                <label htmlFor="RFC">RFC:</label>
                <input
                    type="text"
                    id="RFC"
                    name="RFC"
                    placeholder="Introduce el RFC"
                    title="Introduce el RFC del profesor"
                    value={formData.RFC}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Cedula_Profesional">Cédula Profesional:</label>
                <input
                    type="text"
                    id="Cedula_Profesional"
                    name="Cedula_Profesional"
                    placeholder="Introduce la cédula profesional"
                    title="Introduce la cédula profesional"
                    value={formData.Cedula_Profesional}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="ID_CT">ID_CT:</label>
                <input
                    type="text"
                    id="ID_CT"
                    name="ID_CT"
                    placeholder="Introduce el ID del centro de trabajo"
                    title="Introduce el ID del centro de trabajo"
                    value={formData.ID_CT}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Correo">Correo:</label>
                <input
                    type="email"
                    id="Correo"
                    name="Correo"
                    placeholder="Introduce el correo electrónico"
                    title="Introduce el correo electrónico"
                    value={formData.Correo}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="Contraseña">Contraseña:</label>
                <input
                    type="password"
                    id="Contraseña"
                    name="Contraseña"
                    placeholder="Introduce la contraseña"
                    title="Introduce la contraseña"
                    value={formData.Contraseña}
                    onChange={handleChange}
                    required
                /><br />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterProfesor;
