import { Router } from 'express';
import { body, param } from 'express-validator';
import * as ctrl from '../controllers/usuarios.js';

const router = Router();

/**
 * @route   GET /api/usuarios
 * @desc    Lista todos los usuarios
 * @access  Public
 */
router.get('/', ctrl.getUsuarios);

/**
 * @route   GET /api/usuarios/:id
 */
router.get('/:id',
  param('id').isInt().toInt(),
  ctrl.getUsuarioById
);

/**
 * @route   POST /api/usuarios
 */
router.post('/',
  body('nombres').notEmpty(),
  body('apellidos').notEmpty(),
  body('dni').notEmpty(),
  body('correo').isEmail(),
  ctrl.createUsuario
);

/**
 * @route   PUT /api/usuarios/:id
 */
router.put('/:id',
  param('id').isInt().toInt(),
  ctrl.updateUsuario
);

/**
 * @route   DELETE /api/usuarios/:id
 */
router.delete('/:id',
  param('id').isInt().toInt(),
  ctrl.deleteUsuario
);

export default router;
