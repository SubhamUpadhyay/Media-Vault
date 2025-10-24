const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const verifyAdmin = require('../middleware/verifyAdmin');
const uploadHandler = require('../middleware/uploadHandler');

// Public routes
router.get('/', imageController.getAllImages);
router.get('/:id', imageController.getImageById);

// Admin routes
router.post('/', verifyAdmin, uploadHandler, imageController.uploadImage);
router.delete('/:id', verifyAdmin, imageController.deleteImage);

module.exports = router;