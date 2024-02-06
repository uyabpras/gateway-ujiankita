const express = require('express');
const taskServiceController = require('../controllers/taskServiceController');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();
router.post('/create', verifyToken, taskServiceController.createTask);
router.get('/', verifyToken, taskServiceController.listTask);
router.get('/:id', verifyToken, taskServiceController.getTask);
router.put('/edit/:id', verifyToken, taskServiceController.editTask);
router.put('/status', verifyToken, taskServiceController.editStatusBulk);
router.delete('/delete', verifyToken, taskServiceController.deleteTask);
router.get('/health', verifyToken, taskServiceController.healthTask);
module.exports = router;