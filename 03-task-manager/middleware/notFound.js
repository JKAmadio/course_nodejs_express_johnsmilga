// middleware to set a notFound response

const notFound = (req, res) => res.status(404).send("Route does not exist");

module.exports = notFound;
