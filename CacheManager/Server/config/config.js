var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'usbw',
    database: 'redis_mg',
    port: 3307
});
module.exports = pool;