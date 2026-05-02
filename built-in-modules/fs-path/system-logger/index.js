const fs = require('node:fs');
const path = require('node:path');
const loggerUtil = require('./logger-util');

const filePath = path.resolve('system.log');

const data = loggerUtil("Hello world");

fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
    console.log("Log successfully appended");
});