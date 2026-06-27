const { readFile, writeFile } = require("../utils/fileDB");

const getUsers = () => {
  return readFile("users.json");
};

const saveUser = (user) => {
  const users = readFile("users.json");
  users.push(user);
  writeFile("users.json", users);
};

module.exports = {
  getUsers,
  saveUser,
};