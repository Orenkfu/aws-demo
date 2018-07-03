// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for terminating workers
    cluster.on('exit', function (worker) {
        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
} else {
    const AWS = require('aws-sdk');
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    require('./startup/config')();
    require('./startup/validation')();
    require('./startup/prod')(app);
    require('./startup/routes')(app);


    app.use(express.static('views'));
    AWS.config.jwtPrivateKey = 'secretKey';
    AWS.config.fixel_db = 'mongodb://fixelAdmin:123456a@ds141368.mlab.com:41368/fixel-demo';
    AWS.config.region = process.env.REGION
    var port = process.env.PORT || 3000;
    const db = require('./startup/dbconnect.js').init();
    console.log('NODE ENVIRONMENT: ', process.env);
    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });

}