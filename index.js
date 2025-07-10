import express from 'express';
const app = express();
const port = 3000;

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hola mundo. He creado mi primer API con Node.js y Express. Me llamo Christian');
});
