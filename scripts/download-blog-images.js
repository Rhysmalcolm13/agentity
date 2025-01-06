const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'getting-started.jpg': 'https://images.unsplash.com/photo-1555099962-4199c345e5dd',
  'launch-announcement.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
  'case-study-1.jpg': 'https://images.unsplash.com/photo-1549637642-90187f64f420',
  'advanced-config.jpg': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'future-work.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  'api-integration.jpg': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  'case-study-2.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  'security.jpg': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb'
};

const downloadImage = (url, filename) => {
  const filepath = path.join(__dirname, '../public/blog', filename);
  const file = fs.createWriteStream(filepath);

  https.get(`${url}?w=1200&q=80`, (response) => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filepath);
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

// Create blog directory if it doesn't exist
const blogDir = path.join(__dirname, '../public/blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Download all images
Object.entries(images).forEach(([filename, url]) => {
  downloadImage(url, filename);
}); 