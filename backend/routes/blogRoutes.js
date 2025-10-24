const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyAdmin = require('../middleware/verifyAdmin');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Admin routes
router.post('/', verifyAdmin, express.json(), blogController.createBlog);
router.delete('/:id', verifyAdmin, blogController.deleteBlog);

module.exports = router;