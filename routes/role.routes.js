const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.post('/', authenticate, authorize('Admin'), roleController.createRole);
router.post('/assign', authenticate, authorize('Admin'), roleController.assignRoleToUser);
module.exports = router;
