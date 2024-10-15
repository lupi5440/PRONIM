const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/ProfesorController');

// Ruta para registrar un Profesor
router.post('/RegisterProfesor', profesorController.registerProfesor);

// Ruta para iniciar sesión como Profesor
router.post('/LoginProfesor', profesorController.loginProfesor);

module.exports = router;
