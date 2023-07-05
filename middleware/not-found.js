const {NotFoundError} = require('../errors');

const notFound = (req, res) => {throw NotFoundError};

module.exports = notFound;
