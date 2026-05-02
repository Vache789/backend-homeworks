function dataProcessor(obj) {
  let res = {};

  for (const [key, value] of Object.entries(obj)) {
    let arr = key.split("_");
    for (let i = 1; i < arr.length; ++i) {
      arr[i][0].toUpperCase() + arr[i].slice(1);
    }
    let newKey = arr.join("");
    if (typeof value == "object" && value != null) {
      res[newKey] = dataProcessor(value);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

module.exports = dataProcessor;
