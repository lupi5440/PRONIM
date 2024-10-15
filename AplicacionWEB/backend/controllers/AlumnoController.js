const mysql = require('mysql2');
const connection = require('../configDB');

// Registro de Alumno
exports.registerAlumno = (req, res) => {
    const { Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_Nacimiento, CURP, Sexo, ID_Grupo_actual, ID_Grupo_anterior, ID_Condicion, ID_Nacionalidad, ID_Origen_Etnico } = req.body;

    const query = `
        INSERT INTO Alumno (Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_Nacimiento, CURP, Sexo, ID_Grupo_actual, ID_Grupo_anterior, ID_Condicion, ID_Nacionalidad, ID_Origen_Etnico)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_Nacimiento, CURP, Sexo, ID_Grupo_actual, ID_Grupo_anterior, ID_Condicion, ID_Nacionalidad, ID_Origen_Etnico], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar al alumno');
        }
        res.status(201).send('Alumno registrado con éxito');
    });
};
