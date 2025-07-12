import { pool } from '../db/pool.js';
import { validationResult } from 'express-validator';

export const getUsuarios = async (_req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id_usuario');
    res.json(rows);
  } catch (err) { next(err); }
};

export const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    if (!rows.length) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

export const createUsuario = async (req, res, next) => {
  try {
    // Validación con express-validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    const { nombres, apellidos, dni, correo, password_hash, celular, rol } = req.body;
    const query = `
      INSERT INTO usuarios (nombres, apellidos, dni, correo, password_hash, celular, rol)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const values = [nombres, apellidos, dni, correo, password_hash, celular, rol];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

export const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campos = [ 'nombres','apellidos','dni','correo','password_hash','celular','rol' ];
    const sets   = [];
    const values = [];
    campos.forEach((c,i) => {
      if (req.body[c] !== undefined) {
        sets.push(`${c} = $${values.length + 1}`);
        values.push(req.body[c]);
      }
    });
    if (!sets.length) return res.status(400).json({ mensaje: 'Nada que actualizar' });
    values.push(id); // para el WHERE

    const { rows } = await pool.query(
      `UPDATE usuarios SET ${sets.join(', ')} WHERE id_usuario = $${values.length} RETURNING *`,
      values
    );
    if (!rows.length) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
    if (!rowCount) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(204).send();   //  204 = No Content
  } catch (err) { next(err); }
};
