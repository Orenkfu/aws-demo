const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const dblogger = new (winston.Logger)({
    level: "info",
    transports: [
        new winston.transports.MongoDB({
            db: config.get('db'),
            collection: 'logs',
            storeHost: true
        })
    ]
})

module.exports.log = function (req, res, next) {
    //seems to me like logging GET and OPTIONS into a database is a bad idea, although I might be mistaken..
    //  if (!req.method == 'GET' || !req.method == 'OPTIONS') {
    dblogger.log('Log of all API calls', [{ path: req.path }, { method: req.method }, { remote_address: req.ip }])
    dblogger.info('Log of all API calls', [{ path: req.path }, { method: req.method }, { remote_address: req.ip }])

    //  }
    next();
}

module.exports.mongoDBLogger = dblogger;