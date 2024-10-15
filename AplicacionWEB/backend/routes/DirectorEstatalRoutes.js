const express = require('express');
const router = express.Router();
const directorEstatalController = require('../controllers/DirectorEstatalController');

// Ruta para registrar un Director Estatal
router.post('/RegisterDirectorEstatal', directorEstatalController.registerDirectorEstatal);

// Ruta para iniciar sesión como Director Estatal
router.post('/LoginDirectorEstatal', directorEstatalController.loginDirectorEstatal);

module.exports = router;
