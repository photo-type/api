module.exports = {
  "secret": process.env.PHOTOTYPE_JWT_SECRET || "darkistheykey111",
  "duration": process.env.PHOTOTYPE_JWT_DURATION || '2 days'
};
