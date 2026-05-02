const fs = require("node:fs");
const path = require("node:path");
const filter = require("./filter.js");

const dirPath = path.resolve("../json-data-transformer");

fs.readdir(dirPath, (err, files) => {
  if (err) throw err;

  const result = filter(files, "js");
  let arr = [];

  for (let i = 0; i < result.length; ++i) {
    arr.push(path.resolve(path.join(dirPath, result[i])));
  }

  console.log(arr);
});