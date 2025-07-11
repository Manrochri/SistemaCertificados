import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocumentation = require('./swagger-output.json');


const app = express();
const port = 3000;

// Middleware para leer JSON en el body
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// Datos de ejemplo
const profesores = [
  { id: 1, nombre: 'Christian', apellido: 'Manrique' },
  { id: 2, nombre: 'Juan', apellido: 'Perez' },
  { id: 3, nombre: 'Ana', apellido: 'Gomez' }
];

const estudiantes = [
  { id: 1, nombre: 'Maria', apellido: 'Lopez' },
  { id: 2, nombre: 'Luis', apellido: 'Martinez' },
  { id: 3, nombre: 'Pedro', apellido: 'Gonzalez' }
];

// Rutas GET
app.get('/', (req, res) => {
  res.send('Hola mundo. He creado mi primer API con Node.js y Express.');
});

app.get('/profesores', (req, res) => {
  res.json(profesores);
});

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

// Ruta POST
app.post('/profesores', (req, res) => {
  const nuevoProfesor = req.body;
  profesores.push(nuevoProfesor);
  res.status(201).json(nuevoProfesor);
});

// Ruta 404
app.use((req, res) => {
  res.status(404).send('Error 404. Página no encontrada.');
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
  console.log(`Documentación Swagger en http://localhost:${port}/api-docs`);
});
