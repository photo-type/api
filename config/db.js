module.exports = {
  "local": {
    "connection_string": process.env.PHOTOTYPE_DB_STRING || "mongodb://localhost:27000/phototype"
  },
  "development": {
    "connection_string": process.env.PHOTOTYPE_DB_STRING || "mongodb://localhost:27000/phototype"
  }
};

