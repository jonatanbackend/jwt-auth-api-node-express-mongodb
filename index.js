const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger'); // ✅ Esta es la buena

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());

// Rutas Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 👈 Aquí agregás Swagger UI

// Rutas de la app
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware); // Siempre debe ir al final

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV}`);
});
