const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/AlumnoController');

// Ruta para registrar un Alumno
router.post('/RegisterAlumno', alumnoController.registerAlumno);

module.exports = router;
