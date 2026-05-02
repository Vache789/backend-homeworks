const fs = require('node:fs');
const path = require('node:path');
const rawData = require('./data.js');

const outputPath = path.resolve('./output.json');

fs.stat(outputPath, (err, stats) => {
    if (err) throw err;

    if (stats.size < 1024) {
        const data = JSON.stringify(rawData, null, 2);

        fs.writeFile(outputPath, data, (err) => {
            if (err) throw err;

            console.log("File updated (size < 1KB)");
        });
    } else {
        console.log("File is already large enough, no write needed");
    }
});