
const contentStore = require('../models/contentStore');

exports.uploadVideo = (req, res) => {
  const { title, description } = req.body;
  
  const video = {
    id: Date.now(),
    title: title || 'Untitled',
    description: description || '',
    url: `/uploads/${req.file.filename}`,
    createdAt: new Date()
  };
  
  contentStore.addVideo(video);
  res.status(201).json({
    message: 'Video uploaded successfully',
    video
  });
};

exports.getAllVideos = (req, res) => {
  const videos = contentStore.getVideos();
  res.json(videos);
};

exports.getVideoById = (req, res) => {
  const video = contentStore.getVideoById(req.params.id);
  
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  res.json(video);
};

exports.deleteVideo = (req, res) => {
  const deleted = contentStore.deleteVideo(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  res.json({
    message: 'Video deleted successfully',
    deleted
  });
};