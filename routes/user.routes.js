const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, authorize('Admin'), userController.deleteUser);
router.patch('/:id/disable', authenticate, authorize('Admin'), userController.disabledUser);
router.get('/', authenticate, authorize('Admin'), userController.listUsers);

module.exports = router;
