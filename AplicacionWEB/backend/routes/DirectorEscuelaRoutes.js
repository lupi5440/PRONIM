const express = require('express');
const router = express.Router();
const directorEscuelaController = require('../controllers/DirectorEscuelaController');

// Ruta para registrar un Director de Escuela
router.post('/RegisterDirectorEscuela', directorEscuelaController.registerDirectorEscuela);

// Ruta para iniciar sesión de un Director de Escuela
router.post('/LoginDirectorEscuela', directorEscuelaController.loginDirectorEscuela);

module.exports = router;
