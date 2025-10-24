document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    checkAdminStatus();
    showSection('images');
});

function checkAdminStatus() {
    const token = getAdminToken();
    if (token) {
        adminToken = token;
    }
}

async function authenticateAdmin() {
    const keyInput = document.getElementById('admin-key');
    const key = keyInput.value.trim();

    if (!key) {
        showMessage('Please enter admin key', 'error');
        return;
    }

    try {
        setAdminToken(key);
        await getImages();
        
        showMessage('Admin authenticated successfully', 'success');
        renderNavbar();
        showSection('admin');
        keyInput.value = '';
    } catch (error) {
        clearAdminToken();
        showMessage('Invalid admin key', 'error');
    }
}

function logout() {
    clearAdminToken();
    renderNavbar();
    showMessage('Logged out successfully', 'success');
    showSection('images');
}

async function loadImages() {
    try {
        const imagesGrid = document.getElementById('images-grid');
        imagesGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        const images = await getImages();

        if (images.length === 0) {
            imagesGrid.innerHTML = '<p>No images yet</p>';
            return;
        }

        imagesGrid.innerHTML = images.map(img => createImageCard(img)).join('');
    } catch (error) {
        document.getElementById('images-grid').innerHTML = '<div class="error">Failed to load images</div>';
        console.error(error);
    }
}

async function uploadImageHandler() {
    const file = document.getElementById('image-file').files[0];
    const title = document.getElementById('image-title').value.trim();
    const description = document.getElementById('image-description').value.trim();

    if (!file) {
        showMessage('Please select an image file', 'error');
        return;
    }

    if (!title) {
        showMessage('Please enter image title', 'error');
        return;
    }

    try {
        const btn = event.target;
        btn.disabled = true;
        btn.textContent = 'Uploading...';

        await uploadImage({ file, title, description });

        showMessage('Image uploaded successfully', 'success');
        document.getElementById('image-file').value = '';
        document.getElementById('image-title').value = '';
        document.getElementById('image-description').value = '';
        loadImages();

        btn.disabled = false;
        btn.textContent = 'Upload Image';
    } catch (error) {
        showMessage(error.message, 'error');
        event.target.disabled = false;
        event.target.textContent = 'Upload Image';
    }
}

async function deleteImageHandler(id) {
    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }

    try {
        await deleteImage(id);
        showMessage('Image deleted successfully', 'success');
        loadImages();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function loadVideos() {
    try {
        const videosGrid = document.getElementById('videos-grid');
        videosGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        const videos = await getVideos();

        if (videos.length === 0) {
            videosGrid.innerHTML = '<p>No videos yet</p>';
            return;
        }

        videosGrid.innerHTML = videos.map(vid => createVideoCard(vid)).join('');
    } catch (error) {
        document.getElementById('videos-grid').innerHTML = '<div class="error">Failed to load videos</div>';
        console.error(error);
    }
}

async function uploadVideoHandler() {
    const file = document.getElementById('video-file').files[0];
    const title = document.getElementById('video-title').value.trim();
    const description = document.getElementById('video-description').value.trim();

    if (!file) {
        showMessage('Please select a video file', 'error');
        return;
    }

    if (!title) {
        showMessage('Please enter video title', 'error');
        return;
    }

    try {
        const btn = event.target;
        btn.disabled = true;
        btn.textContent = 'Uploading...';

        await uploadVideo({ file, title, description });

        showMessage('Video uploaded successfully', 'success');
        document.getElementById('video-file').value = '';
        document.getElementById('video-title').value = '';
        document.getElementById('video-description').value = '';
        loadVideos();

        btn.disabled = false;
        btn.textContent = 'Upload Video';
    } catch (error) {
        showMessage(error.message, 'error');
        event.target.disabled = false;
        event.target.textContent = 'Upload Video';
    }
}

async function deleteVideoHandler(id) {
    if (!confirm('Are you sure you want to delete this video?')) {
        return;
    }

    try {
        await deleteVideo(id);
        showMessage('Video deleted successfully', 'success');
        loadVideos();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function loadBlogs() {
    try {
        const blogsContainer = document.getElementById('blogs-container');
        blogsContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        const blogs = await getBlogs();

        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<p>No blog posts yet</p>';
            return;
        }

        blogsContainer.innerHTML = blogs.map(blog => createBlogCard(blog)).join('');
    } catch (error) {
        document.getElementById('blogs-container').innerHTML = '<div class="error">Failed to load blogs</div>';
        console.error(error);
    }
}

async function viewBlog(id) {
    try {
        const blog = await getBlogById(id);
        renderSingleBlog(blog);
        
        document.getElementById('blogs-section').classList.add('hidden');
        document.getElementById('single-blog-section').classList.remove('hidden');
    } catch (error) {
        showMessage('Failed to load blog', 'error');
    }
}

async function createBlogHandler() {
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    const excerpt = document.getElementById('blog-excerpt').value.trim();

    if (!title) {
        showMessage('Please enter blog title', 'error');
        return;
    }

    if (!content) {
        showMessage('Please enter blog content', 'error');
        return;
    }

    try {
        const btn = event.target;
        btn.disabled = true;
        btn.textContent = 'Posting...';

        await createBlog({ title, content, excerpt });

        showMessage('Blog posted successfully', 'success');
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-content').value = '';
        document.getElementById('blog-excerpt').value = '';
        loadBlogs();

        btn.disabled = false;
        btn.textContent = 'Post Blog';
    } catch (error) {
        showMessage(error.message, 'error');
        event.target.disabled = false;
        event.target.textContent = 'Post Blog';
    }
}

async function deleteBlogHandler(id, e) {
    if (e) e.stopPropagation();

    if (!confirm('Are you sure you want to delete this blog?')) {
        return;
    }

    try {
        await deleteBlog(id);
        showMessage('Blog deleted successfully', 'success');
        loadBlogs();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}