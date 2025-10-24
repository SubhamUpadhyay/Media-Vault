// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const verifyAdmin = require('../middleware/verifyAdmin');
const uploadHandler = require('../middleware/uploadHandler');

// Public routes
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

// Admin routes
router.post('/', verifyAdmin, uploadHandler, videoController.uploadVideo);
router.delete('/:id', verifyAdmin, videoController.deleteVideo);

module.exports = router;