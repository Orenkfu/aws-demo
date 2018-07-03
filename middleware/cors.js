module.exports = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', ['Content-Type', 'X-Auth-JWT']);
    res.header('Access-Control-Allow-Methods', "*");
    res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
    next();
};
