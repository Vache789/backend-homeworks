const path = require("node:path");
const { readDataFromFile, writeDataToFile } = require("../utils/fileHelper");

const fullPath = path.join(__dirname, "../data/users.json");

function getAll() {
  return readDataFromFile(fullPath);
}

function register(userData) {
  const users = readDataFromFile(fullPath);

  const userExists = users.some(
    (u) => u.username === userData.username || u.email === userData.email,
  );

  if (userExists) return { error: "Username or Email already exists" };

  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = {
    id: newId,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role || "customer",
  };

  users.push(newUser);
  const success = writeDataToFile(fullPath, users);

  if (!success) return null;
  return newUser;
}

function login(email, password) {
  const users = readDataFromFile(fullPath);

  const foundUser = users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!foundUser) {
    return { error: "Invalid email or password" };
  }

  return foundUser;
}

function update(id, updateData) {
  const users = readDataFromFile(fullPath);
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) return null;

  Object.assign(users[index], updateData);

  const success = writeDataToFile(fullPath, users);
  if (!success) return null;

  return users[index];
}

function remove(id) {
  const users = readDataFromFile(fullPath);
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) return false;

  users.splice(index, 1);
  return writeDataToFile(fullPath, users);
}

module.exports = {
  getAll,
  register,
  login,
  update,
  remove,
};
