const fs = require("node:fs");

const readDataFromFile = (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    console.error(`Error reading file at ${filePath}:`, err);
    return [];
  }
};

const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing file at ${filePath}:`, err);
    return false;
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
