const fs = require('node:fs');
const path = require('node:path');
const renamer = require('./rename.js');

const dirPath = path.resolve('../condig-loader');

fs.readdir(dirPath, (err, files) => {
    if (err) throw err;

    const rename = renamer(files);

    for (let i = 0; i < rename.length; ++i) {
        const oldPath = path.resolve(path.join(dirPath, files[i]));
        const newPath = path.resolve(path.join(dirPath, rename[i]));

        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;

        });
    }
});