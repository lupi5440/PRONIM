const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/TutorController');

// Ruta para registrar un Tutor
router.post('/RegisterTutor', tutorController.registerTutor);

module.exports = router;
