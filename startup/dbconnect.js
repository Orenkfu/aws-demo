const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
function init() {
    mongoose.connect(config.get('db'))
        .then(() => {
            winston.info('Connected to MongoDB..');
            console.log('Connected to MongoDB..')
        })
}
module.exports.init = init;