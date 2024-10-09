const express = require('express');
const certificateController = require('../controllers/certificateController');

const router = express.Router();

// Ruta para generar certificado
router.post('/generate', certificateController.generateCertificate);

module.exports = router;
