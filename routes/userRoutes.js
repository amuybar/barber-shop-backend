const express = require('express');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthController.getCurrentUser);

module.exports = router;
