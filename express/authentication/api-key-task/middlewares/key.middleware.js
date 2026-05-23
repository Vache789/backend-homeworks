const clients = require("../data/clients.js");

function keyMiddleware(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key is missing" });
  }

  const client = clients.find((c) => c.apiKey === apiKey);

  if (!client) {
    return res.status(401).json({ messgae: "Invalid api key" });
  }

  req.client = client;
  next();
}

module.exports = keyMiddleware;