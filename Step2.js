const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching URL:', error.message);
    }
}

const arg = process.argv[2];

// Check if the argument is a URL by looking for 'http://' or 'https://'
if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCat(arg);
} else {
    cat(arg);
}