const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const connection = require('../configDB');

// Registro de Director Estatal
exports.registerDirectorEstatal = (req, res) => {
    const { Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_nacimiento, Contraseña, CURP, Sexo, RFC, Cedula_Profesional, Correo, ID_Estado } = req.body;
    const hashedPassword = bcrypt.hashSync(Contraseña, 10);

    const query = `INSERT INTO Usuario_Adulto (Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_nacimiento, Contraseña, CURP, Sexo, RFC, Cedula_Profesional, Correo) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const queryEstatal = `INSERT INTO Coordinador_Estatal (ID, ID_Estado, Fecha_inicio, Fecha_fin) VALUES (?, ?, CURDATE(), NULL)`;

    connection.query(query, [Nombre, Primer_Apellido, Segundo_Apellido, Fecha_de_nacimiento, hashedPassword, CURP, Sexo, RFC, Cedula_Profesional, Correo], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar el director estatal');
        }
        const usuarioId = results.insertId;
        connection.query(queryEstatal, [usuarioId, ID_Estado], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al asociar el estado con el director estatal');
            }
            res.status(201).send('Director estatal registrado con éxito');
        });
    });
};

// Inicio de sesión de Director Estatal
exports.loginDirectorEstatal = (req, res) => {
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
