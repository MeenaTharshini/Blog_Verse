const fs = require("fs");
const path = require("path");

const DATA_DIR = path.resolve(__dirname, "../data");

const getPath = (fileName) => path.join(DATA_DIR, fileName);

// SAFE READ
const readFile = (fileName) => {
  try {
    const filePath = getPath(fileName);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
      return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");

    if (!data) return [];

    return JSON.parse(data);
  } catch (err) {
    console.error(`❌ Error reading ${fileName}:`, err.message);
    return [];
  }
};

// SAFE WRITE
const writeFile = (fileName, data) => {
  try {
    const filePath = getPath(fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`❌ Error writing ${fileName}:`, err.message);
  }
};

module.exports = {
  readFile,
  writeFile,
};