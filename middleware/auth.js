const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('X-Auth-JWT');
    if (!token) return res.status(401).send('Access denied. Not authenticated.');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('Access denied. Invalid token.');
    }
}