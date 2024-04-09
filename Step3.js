const fs = require('fs');
const axios = require('axios');

// Define the cat function
function cat(path, outputFileName) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        if (outputFileName) {
            fs.writeFile(outputFileName, data, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log(`Data written to ${outputFileName}`);
            });
        } else {
            console.log(data);
        }
    });
}

// Define the webCat function
async function webCat(url, outputFileName) {
    try {
        const response = await axios.get(url);
        const responseData = response.data;
        if (outputFileName) {
            fs.writeFile(outputFileName, responseData, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log(`Data written to ${outputFileName}`);
            });
        } else {
            console.log(responseData);
        }
    } catch (error) {
        console.error('Error fetching URL:', error.message);
    }
}

// Parse command line arguments
if (process.argv.length < 3 || process.argv.length > 5) {
    console.error('Usage: node step3.js [--out output-filename.txt] readfile-or-url');
    process.exit(1);
}

let outputFileName = null;
let argumentIndex = 2;

if (process.argv[2] === '--out') {
    outputFileName = process.argv[3];
    argumentIndex += 2;
}

const arg = process.argv[argumentIndex];

// Check if the argument is a URL by looking for 'http://' or 'https://'
if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCat(arg, outputFileName);
} else {
    cat(arg, outputFileName);
}
