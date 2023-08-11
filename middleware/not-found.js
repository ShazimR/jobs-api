const {NotFoundError} = require('../errors');

const notFound = (req, res) => {throw NotFoundError("Route does not exist");};

module.exports = notFound;
