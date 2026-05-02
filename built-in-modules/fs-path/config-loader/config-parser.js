function configPatser(config) {
  const required = ["PORT", "DB_HOST", "DB_USER", "DB_PASS"];
  const arr = config.split("\n");
  let res = {};

  for (let i = 0; i < arr.length; ++i) {
    const entries = arr[i].split("=");

    const key = entries[0];
    const value = Number(entries[1]) ? Number(entries[1]) : entries[1];

    res[key] = value;
  }
  for (let val of required) {
    if (!(val in res)) {
      throw new Error(`${val} is required filed`);
    }
  }
  return res;
}

module.exports = configPatser;
