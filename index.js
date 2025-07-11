import express from 'express';
import swagger from 'swagger-ui-express';
const app = express(); //app significa server. No aplicación 
const port = 3000;

app.use("/api-docs",swaggerUI.serve, swaggerUI.setup());
app.listen(3000, () => {
  console.log(`El servidor funciona en http://localhost:${port}`);
});


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

//endpoints get
app.get('/profesores', (req, res) => {
  res.json(profesores);
});

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
}); 

app.get('/', (req, res) => {
  res.send('Hola mundo. He creado mi primer API con Node.js y Express.');
});

//endpoints post
app.post('/profesores', (req, res) => {
    const nuevoProfesor = req.body;
    profesores.push(nuevoProfesor);
    res.status(201).json(nuevoProfesor);
});


// Para error 404
app.use((req, res) => {
  res.status(404).send('Error 404. Página no encontrada.');
});x