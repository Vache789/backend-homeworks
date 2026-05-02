const fs = require('node:fs');
const path = require('node:path');
const configParser = require('./config-parser.js');

const filePath = path.resolve('./config.env');
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;

    const parser = configParser(data);
    console.log(parser);
});