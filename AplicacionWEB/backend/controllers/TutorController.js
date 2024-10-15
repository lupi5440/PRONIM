const mysql = require('mysql2');
const connection = require('../configDB');

// Registro de Tutor
exports.registerTutor = (req, res) => {
    const { Nombre, Primer_Apellido, Segundo_Apellido, fecha_de_nacimiento, curp, id_sexo, id_origen_etnico, id_idiomas, id_condicion_migratoria, id_escolaridad, id_nacionalidad } = req.body;

    const query = `
        INSERT INTO Tutor (Nombre, Primer_Apellido, Segundo_Apellido, fecha_de_nacimiento, curp, id_sexo, id_origen_etnico, id_idiomas, id_condicion_migratoria, id_escolaridad, id_nacionalidad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [Nombre, Primer_Apellido, Segundo_Apellido, fecha_de_nacimiento, curp, id_sexo, id_origen_etnico, id_idiomas, id_condicion_migratoria, id_escolaridad, id_nacionalidad], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar el tutor');
        }
        res.status(201).send('Tutor registrado con éxito');
    });
};
