const { getRank } = require('../getrank');

module.exports = async (req, res) => {
  const rank = await getRank(); // Fetch rank from the hardcoded URL
  res.json({ rank });
};
