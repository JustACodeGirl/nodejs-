var express = require('express');
var bodyParser = require("body-parser");
var http = require('http');
var querystring = require('querystring');
var pool =  require('./config/config');
var log4js =  require('./routes/errorLog');

var router = require('./routes/index');
var server = require('./routes/servers');
var cache = require('./routes/cache');
var data = require('./routes/datas');
var search = require('./routes/search');
var solr = require('./routes/solr');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));

app.use('/', router);
app.use('/api/servers', server);
app.use('/api/caches', cache);
app.use('/api/datas', data);
app.use('/api/search', search);
app.use('/api/solr', solr);

var servers = app.listen(50080, function () {
//var servers = app.listen(50080, function () {
    var host = servers.address().address
    var port = servers.address().port
    console.log("应用实例，访问地址? http://%s:%s", host, port)
});