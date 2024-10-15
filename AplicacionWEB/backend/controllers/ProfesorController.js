const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const connection = require('../configDB');

// Registro de Profesor
exports.registerProfesor = (req, res) => {
    const { Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_nacimiento, Contraseña, CURP, Sexo, RFC, Cedula_Profesional, Correo, ID_CT } = req.body;
    const hashedPassword = bcrypt.hashSync(Contraseña, 10);

    const query = `INSERT INTO Usuario_Adulto (Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_nacimiento, Contraseña, CURP, Sexo, RFC, Cedula_Profesional, Correo) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const queryProfesor = `INSERT INTO Profesor (ID, ID_CT) VALUES (?, ?)`;

    connection.query(query, [Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_nacimiento, hashedPassword, CURP, Sexo, RFC, Cedula_Profesional, Correo], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar el profesor');
        }
        const profesorId = results.insertId;
        connection.query(queryProfesor, [profesorId, ID_CT], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al asociar el centro de trabajo con el profesor');
            }
            res.status(201).send('Profesor registrado con éxito');
        });
    });
};

// Inicio de sesión de Profesor
exports.loginProfesor = (req, res) => {
    const { Correo, Contraseña } = req.body;

    const query = `SELECT * FROM Usuario_Adulto WHERE Correo = ?`;
    connection.query(query, [Correo], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al iniciar sesión');
        }
        if (results.length === 0) {
            return res.status(401).send('Correo no encontrado');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(Contraseña, user.Contraseña);
        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }
        res.send('Inicio de sesión exitoso');
    });
};
