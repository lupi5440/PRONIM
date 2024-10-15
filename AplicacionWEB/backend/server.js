const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Carga las variables de entorno desde un archivo .env
require('dotenv').config();

//Creacion del servidor express y definicion del puerto 3001
const app = express();
const PORT = process.env.PORT || 3001;

//Se habilita cors para permitir solicitudes de otros dominios y el parseo de JSON en las solicitudes entrantes
app.use(cors());
app.use(bodyParser.json());

// Importa las rutas para los ejercicios y los usuarios (routes)
const DirectorEscuelaRoutes = require('./routes/DirectorEscuelaRoutes');
const DirectorEstatalRoutes = require('./routes/DirectorEstatalRoutes');
const ProfesorRoutes = require('./routes/ProfesorRoutes');
const AlumnoRoutes = require('./routes/AlumnoRoutes');
const TutorRoutes = require('./routes/TutorRoutes');

// Importa las rutas para los usuarios
app.use('/DirectorEscuelaRoutes', DirectorEscuelaRoutes);
app.use('/DirectorEstatalRoutes', DirectorEstatalRoutes);
app.use('/ProfesorRoutes', ProfesorRoutes);
app.use('/AlumnoRoutes', AlumnoRoutes);
app.use('/TutorRoutes', TutorRoutes);

// Inicia el servidor y la base de datos
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    require('./configDB'); // Conexión a la base de datos
});
