const contentStore = require('../models/contentStore');

exports.uploadImage = (req, res) => {
  const { title, description } = req.body;
  
  const image = {
    id: Date.now(),
    title: title || 'Untitled',
    description: description || '',
    url: `/uploads/${req.file.filename}`,
    createdAt: new Date()
  };
  
  contentStore.addImage(image);
  res.status(201).json({
    message: 'Image uploaded successfully',
    image
  });
};

exports.getAllImages = (req, res) => {
  const images = contentStore.getImages();
  res.json(images);
};

exports.getImageById = (req, res) => {
  const image = contentStore.getImageById(req.params.id);
  
  if (!image) {
    return res.status(404).json({ error: 'Image not found' });
  }
  
  res.json(image);
};

exports.deleteImage = (req, res) => {
  const deleted = contentStore.deleteImage(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Image not found' });
  }
  
  res.json({
    message: 'Image deleted successfully',
    deleted
  });
};