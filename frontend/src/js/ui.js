function createNavbar() {
    const isAuthenticated = getAdminToken();
    
    return `
        <div class="nav-title">ContentHub</div>
        <div class="nav-buttons">
            <button class="nav-btn" onclick="showSection('images')">Images</button>
            <button class="nav-btn" onclick="showSection('videos')">Videos</button>
            <button class="nav-btn" onclick="showSection('blogs')">Blogs</button>
            ${isAuthenticated ? `<button class="nav-btn" onclick="showSection('admin')">Admin</button>` : ''}
            ${!isAuthenticated ? `<button class="nav-btn" onclick="showSection('admin')">Login</button>` : ''}
        </div>
    `;
}

function renderNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = createNavbar();
}

function showSection(section) {
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('images-section').classList.add('hidden');
    document.getElementById('videos-section').classList.add('hidden');
    document.getElementById('blogs-section').classList.add('hidden');
    document.getElementById('single-blog-section').classList.add('hidden');

    if (section === 'admin') {
        document.getElementById('admin-panel').classList.remove('hidden');
        if (getAdminToken()) {
            document.getElementById('admin-auth').classList.add('hidden');
            document.getElementById('admin-forms').classList.remove('hidden');
        } else {
            document.getElementById('admin-auth').classList.remove('hidden');
            document.getElementById('admin-forms').classList.add('hidden');
        }
    } else if (section === 'images') {
        document.getElementById('images-section').classList.remove('hidden');
        loadImages();
    } else if (section === 'videos') {
        document.getElementById('videos-section').classList.remove('hidden');
        loadVideos();
    } else if (section === 'blogs') {
        document.getElementById('blogs-section').classList.remove('hidden');
        loadBlogs();
    }
}

function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.minWidth = '300px';

    document.body.appendChild(messageDiv);

    setTimeout(() => messageDiv.remove(), 3000);
}

function createImageCard(image) {
    const date = new Date(image.createdAt).toLocaleDateString();
    
    return `
        <div class="card">
            <img src="${image.url}" alt="${image.title}" class="card-image">
            <div class="card-content">
                <div class="card-title">${image.title}</div>
                <div class="card-description">${image.description}</div>
                <div class="card-date">${date}</div>
                ${getAdminToken() ? `
                    <div class="card-actions">
                        <button class="delete-btn" onclick="deleteImageHandler(${image.id})">Delete</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createVideoCard(video) {
    const date = new Date(video.createdAt).toLocaleDateString();
    
    return `
        <div class="card">
            <video class="card-image" controls>
                <source src="${video.url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="card-content">
                <div class="card-title">${video.title}</div>
                <div class="card-description">${video.description}</div>
                <div class="card-date">${date}</div>
                ${getAdminToken() ? `
                    <div class="card-actions">
                        <button class="delete-btn" onclick="deleteVideoHandler(${video.id})">Delete</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function createBlogCard(blog) {
    const date = new Date(blog.createdAt).toLocaleDateString();
    
    return `
        <div class="blog-card" onclick="viewBlog(${blog.id})">
            <h3>${blog.title}</h3>
            <p class="excerpt">${blog.excerpt}</p>
            <p class="date">${date}</p>
            ${getAdminToken() ? `
                <div class="actions">
                    <button class="delete-btn" onclick="deleteBlogHandler(${blog.id}, event)" style="width: 100%;">Delete</button>
                </div>
            ` : ''}
        </div>
    `;
}

function renderSingleBlog(blog) {
    const date = new Date(blog.createdAt).toLocaleDateString();
    
    const content = `
        <h1>${blog.title}</h1>
        <div class="blog-meta">Published on ${date}</div>
        <p>${blog.content.replace(/\n/g, '</p><p>')}</p>
        ${getAdminToken() ? `
            <button class="delete-btn" onclick="deleteBlogHandler(${blog.id})">Delete</button>
        ` : ''}
        <button class="back-btn" onclick="showSection('blogs')">← Back to Blogs</button>
    `;
    
    document.getElementById('single-blog-content').innerHTML = content;
}