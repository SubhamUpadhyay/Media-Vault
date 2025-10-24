const API_BASE_URL = 'http://localhost:3000/api';
let adminToken = null;

async function fetchAPI(endpoint, method = 'GET', body = null, isFormData = false) {
    try {
        const options = {
            method,
            headers: {}
        };

        if (adminToken) {
            options.headers['x-admin-key'] = adminToken;
        }

        if (body) {
            if (isFormData) {
                options.body = body;
            } else {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

function setAdminToken(token) {
    adminToken = token;
    localStorage.setItem('adminToken', token);
}

function getAdminToken() {
    return localStorage.getItem('adminToken');
}

function clearAdminToken() {
    adminToken = null;
    localStorage.removeItem('adminToken');
}

async function getImages() {
    return await fetchAPI('/images');
}

async function getImageById(id) {
    return await fetchAPI(`/images/${id}`);
}

async function uploadImage(data) {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    
    return await fetchAPI('/images', 'POST', formData, true);
}

async function deleteImage(id) {
    return await fetchAPI(`/images/${id}`, 'DELETE');
}

async function getVideos() {
    return await fetchAPI('/videos');
}

async function getVideoById(id) {
    return await fetchAPI(`/videos/${id}`);
}

async function uploadVideo(data) {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    
    return await fetchAPI('/videos', 'POST', formData, true);
}

async function deleteVideo(id) {
    return await fetchAPI(`/videos/${id}`, 'DELETE');
}

async function getBlogs() {
    return await fetchAPI('/blogs');
}

async function getBlogById(id) {
    return await fetchAPI(`/blogs/${id}`);
}

async function createBlog(data) {
    return await fetchAPI('/blogs', 'POST', data, false);
}

async function deleteBlog(id) {
    return await fetchAPI(`/blogs/${id}`, 'DELETE');
}