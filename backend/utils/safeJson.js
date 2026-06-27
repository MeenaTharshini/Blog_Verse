const safeArray = (data) => {
  return Array.isArray(data) ? data : [];
};

module.exports = { safeArray };