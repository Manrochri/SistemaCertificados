export const errorHandler = (err, _req, res, _next) => {
  console.error(err);                 // guarda el stack en consola
  res.status(500).json({ mensaje: 'Error interno del servidor' });
};
