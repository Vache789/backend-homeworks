const fs = require("node:fs");
const path = require("node:path");
const generatePath = require("./path-generator.js");

const source = "index.js";
const destinationDir = path.resolve("backup");

const sourcePath = path.resolve(source);
const destinationPath = generatePath(source, destinationDir);

fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) throw err;
});