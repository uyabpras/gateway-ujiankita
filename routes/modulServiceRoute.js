const express = require('express');
const modulServiceController = require('../controllers/modulServiceController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
router.post('/create', verifyToken, modulServiceController.createModul);
router.get('/list', verifyToken,modulServiceController.listModul);
router.get('/:id', verifyToken, modulServiceController.getModulByID);
router.put('/:id', verifyToken, modulServiceController.editModul);
router.delete('/:id', verifyToken, modulServiceController.deleteModul);

module.exports = router;