// src/index.js
import usuariosRoutes from './routes/usuarios.js';
import { errorHandler } from './middlewares/errorHandler.js';

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./docs/swagger-output.json');  // 👈

dotenv.config();


const app  = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

// Logging muy sencillo
app.use((req,res,next) => { console.log(`${req.method} ${req.url}`); next(); });

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Rutas
app.get('/', (_req, res) => res.send('Hola mundo con Node.js + Express + PostgreSQL'));
app.use('/api/usuarios', usuariosRoutes);
// (importa y monta las demás rutas: cursos, modulos, etc.)

// 404 genérico
app.use((_req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));

// Manejo centralizado de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀  Servidor http://localhost:${port}`);
  console.log(`📚  Swagger  http://localhost:${port}/api-docs`);
});
