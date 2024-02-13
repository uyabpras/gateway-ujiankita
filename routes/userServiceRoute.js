const express = require('express');
const userServiceController = require('../controllers/userServiceController')

const router = express.Router();
router.post('/register', userServiceController.register);
router.post('/login', userServiceController.login);
router.get('/verify', userServiceController.verify);
router.get('/:id', userServiceController.findUser);
router.put('/update/:id', userServiceController.updateUser);
router.get('/health', userServiceController.healthUser);
router.post('/change-password-request', userServiceController.forgotPasswordSend);
router.post('/change-password', userServiceController.changePassword);

module.exports = router;
