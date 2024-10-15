import React, { useState } from 'react';
import axios from 'axios';

const RegisterAlumno = () => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        Fecha_de_Nacimiento: '',
        CURP: '',
        Sexo: 'Masculino', // Valor predeterminado
        ID_Grupo_actual: '',
        ID_Grupo_anterior: '',
        ID_Condicion: '',
        ID_Nacionalidad: '',
        ID_Origen_Etnico: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/AlumnoRoutes/RegisterAlumno', formData)
            .then(response => {
                if (response.data.success) {
                    alert('Alumno registrado con éxito');
                } else {
                    alert('Error al registrar al Alumno');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al registrar al alumno.');
            });
    };

    return (
        <div>
            <h2>Registrar Alumno</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Primer Apellido:</label>
                <input
                    type="text"
                    name="Primer_Apellido"
                    value={formData.Primer_Apellido}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Segundo Apellido:</label>
                <input
                    type="text"
                    name="Segundo_Apellido"
                    value={formData.Segundo_Apellido}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Fecha de Nacimiento:</label>
                <input
                    type="date"
                    name="Fecha_de_Nacimiento"
                    value={formData.Fecha_de_Nacimiento}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>CURP:</label>
                <input
                    type="text"
                    name="CURP"
                    value={formData.CURP}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Sexo:</label>
                <select
                    name="Sexo"
                    value={formData.Sexo}
                    onChange={handleChange}
                >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otros">Otros</option>
                </select>
                <br />

                <label>ID Grupo Actual:</label>
                <input
                    type="text"
                    name="ID_Grupo_actual"
                    value={formData.ID_Grupo_actual}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>ID Grupo Anterior:</label>
                <input
                    type="text"
                    name="ID_Grupo_anterior"
                    value={formData.ID_Grupo_anterior}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>ID Condición:</label>
                <input
                    type="text"
                    name="ID_Condicion"
                    value={formData.ID_Condicion}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>ID Nacionalidad:</label>
                <input
                    type="text"
                    name="ID_Nacionalidad"
                    value={formData.ID_Nacionalidad}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>ID Origen Étnico:</label>
                <input
                    type="text"
                    name="ID_Origen_Etnico"
                    value={formData.ID_Origen_Etnico}
                    onChange={handleChange}
                    required
                />
                <br />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterAlumno;
