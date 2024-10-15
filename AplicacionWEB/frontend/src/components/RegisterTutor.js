import React, { useState } from 'react';
import axios from 'axios';

const RegisterTutor = () => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        fecha_de_nacimiento: '',
        curp: '',
        id_sexo: 'Masculino',
        id_origen_etnico: '',
        id_idiomas: '',
        id_condicion_migratoria: '',
        id_escolaridad: '',
        id_nacionalidad: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/TutorRoutes/RegisterTutor', formData)
            .then(response => {
                if (response.data.success) {
                    alert('Tutor registrado con éxito');
                } else {
                    alert('Error al registrar al Tutor');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al registrar al Tutor');
            });
    };

    return (
        <div>
            <h2>Registrar Tutor</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Nombre">Nombre:</label>
                <input
                    type="text"
                    id="Nombre"
                    name="Nombre"
                    placeholder="Introduce el nombre"
                    title="Introduce el nombre del tutor"
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

                <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    id="fecha_de_nacimiento"
                    name="fecha_de_nacimiento"
                    placeholder="Selecciona la fecha de nacimiento"
                    title="Selecciona la fecha de nacimiento"
                    value={formData.fecha_de_nacimiento}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="curp">CURP:</label>
                <input
                    type="text"
                    id="curp"
                    name="curp"
                    placeholder="Introduce el CURP"
                    title="Introduce el CURP del tutor"
                    value={formData.curp}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="id_sexo">Sexo:</label>
                <select
                    id="id_sexo"
                    name="id_sexo"
                    title="Selecciona el sexo del tutor"
                    value={formData.id_sexo}
                    onChange={handleChange}
                >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otros">Otros</option>
                </select><br />

                <label htmlFor="id_origen_etnico">Origen Étnico:</label>
                <input
                    type="text"
                    id="id_origen_etnico"
                    name="id_origen_etnico"
                    placeholder="Introduce el origen étnico"
                    title="Introduce el origen étnico"
                    value={formData.id_origen_etnico}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="id_idiomas">Idiomas:</label>
                <input
                    type="text"
                    id="id_idiomas"
                    name="id_idiomas"
                    placeholder="Introduce los idiomas"
                    title="Introduce los idiomas que habla el tutor"
                    value={formData.id_idiomas}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="id_condicion_migratoria">Condición Migratoria:</label>
                <input
                    type="text"
                    id="id_condicion_migratoria"
                    name="id_condicion_migratoria"
                    placeholder="Introduce la condición migratoria"
                    title="Introduce la condición migratoria"
                    value={formData.id_condicion_migratoria}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="id_escolaridad">Escolaridad:</label>
                <input
                    type="text"
                    id="id_escolaridad"
                    name="id_escolaridad"
                    placeholder="Introduce el nivel de escolaridad"
                    title="Introduce el nivel de escolaridad"
                    value={formData.id_escolaridad}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="id_nacionalidad">Nacionalidad:</label>
                <input
                    type="text"
                    id="id_nacionalidad"
                    name="id_nacionalidad"
                    placeholder="Introduce la nacionalidad"
                    title="Introduce la nacionalidad"
                    value={formData.id_nacionalidad}
                    onChange={handleChange}
                    required
                /><br />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterTutor;
