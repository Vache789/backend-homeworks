const path = require('node:path');

function pathGenerator(fileName, filePath) {
    const ext = path.extname(fileName); 

    const name = path.basename(fileName, ext);
    
    const newFileName = `${name}_backup${ext}`;
    
    return path.join(filePath, newFileName);
}

module.exports = pathGenerator;