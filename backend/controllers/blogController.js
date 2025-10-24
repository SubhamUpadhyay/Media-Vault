const contentStore = require('../models/contentStore');

exports.createBlog = (req, res) => {
  const { title, content, excerpt } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    });
  }
  
  const blog = {
    id: Date.now(),
    title,
    content,
    excerpt: excerpt || content.substring(0, 150) + '...',
    createdAt: new Date()
  };
  
  contentStore.addBlog(blog);
  res.status(201).json({
    message: 'Blog posted successfully',
    blog
  });
};

exports.getAllBlogs = (req, res) => {
  const blogs = contentStore.getBlogs();
  res.json(blogs);
};

exports.getBlogById = (req, res) => {
  const blog = contentStore.getBlogById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  
  res.json(blog);
};

exports.deleteBlog = (req, res) => {
  const deleted = contentStore.deleteBlog(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  
  res.json({
    message: 'Blog deleted successfully',
    deleted
  });
};