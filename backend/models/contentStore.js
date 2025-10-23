const content = {
  images: [],
  videos: [],
  blogs: [],
};

class ContentStore {
    //Image
  addImage(image) {
    content.images.push(image);
    return image;
  }

  getImages() {
    return content.images;
  }

  getImageById(id) {
    return content.images.find((img) => img.id == id);
  }

  deleteImage(id) {
    const index = content.images.findIndex((img) => img.id == id);
    if (index === -1) return null;
    return content.images.splice(index, 1)[0];
  }

  //Videos
  addVideo(video) {
    content.videos.push(video);
    return video;
  }

  getVideo() {
    return content.videos;
  }

  getvideoById(id) {
    return content.videos.find((vid) => vid.id == id);
  }
  deleteVideo(id) {
    const index = content.videos.findIndex((vid) => vid.id == id);
    if (index == -1) return null;
    return content.videos.splice(index, 1)[0];
  }

  //Blogs
  addBlog(blog) {
    content.blogs.push(blog);
    return blog;
  }

  getBlog() {
    return content.blogs;
  }

  getBlogById(id) {
    return content.blogs.find((blog) => blog.id == id);
  }

  deleteBlog(id) {
    const index = content.blogs.findIndex((blog) => blog.id == id);
    if (index == -1) return null;
    return content.blogs.splice(index, 1)[0];
  }
}

module.exports = new ContentStore();
