const users = require('../data/users');

function authMiddleware(req, res, next) {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

        return res.status(401).json({ message : "Unauthorized: Missing credentials" });
    }

    const base64Credentials = authHeader.split(' ')[1];

    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    const validUser = users.find((c) => c.username === username && c.password === password);

    if (!validUser) {
        res.set("WWW-Authenticate", 'Basic realm="Secure Area"');
        return res.status(401).json({ message: "Unauthorized: Invalid" });
    }

    req.user = validUser;
    return next();
}

module.exports = authMiddleware;