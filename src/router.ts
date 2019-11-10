import { Router } from 'express';

import * as UserController from './core/user';
import * as AuthService from './services/auth/AuthService';

const router = Router();

/**
 * Auth Routes
 */

router.post('/auth', AuthService.login);

/**
 * User Routes
 */

router.get(
  '/users',
  AuthService.authenticateRequest,
  AuthService.authorizeRequest,
  UserController.allUsers,
);
router.get(
  '/users/:id',
  AuthService.authenticateRequest,
  AuthService.authorizeRequest,
  UserController.singleUser,
);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.put('/users/:id/archive', UserController.archiveUser);
router.delete('/users/:id', UserController.deleteUser);

export { router };
