/**
 * Created by nina.zheng on 2016/12/13.
 */

var express = require('express');
var data = express();
var pool =  require('./../config/config');
dataList = function(req, res){
    var serverSQL = 'select * from `t_server` WHERE id = ? ';
    var serverSql_Params = [req.body.serverId];
    console.log(req.body);
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(serverSQL, serverSql_Params, function (err, rows) {
            if (err) console.log(err);
            console.log(rows[0]);
            var redis = require('redis'),          //配置redis模块
                RDS_PORT = rows[0].port,        //端口号?
                RDS_HOST = rows[0].host,    //服务器IP
                RDS_PWD = rows[0].password,
                RDS_OPTS = {auth_pass: RDS_PWD},
                client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
            if (req.body.type == 'map') {
                client.hgetall(req.body.key, function (err, rows) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.dir(rows);
                    res.send(rows);
                    client.quit();
                });
            } else if (req.body.type == 'list') {
                client.lrange(req.body.key, 0, -1, function (err, rows) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.dir(rows);
                    res.send(rows);
                    client.quit();
                });

            } else if (req.body.type == 'set') {
                client.smembers(req.body.key, function (err, rows) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.dir(rows);
                    res.send(rows);
                    client.quit();
                });
            } else if (req.body.type == 'zset') {
                if(req.body.isdownItem =="true"){
                    client.zrevrange(req.body.key, 0, -1, 'withscores', function (err, rows) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.dir(rows);
                        res.send(rows);
                        client.quit();
                    });
                }else{
                    client.zrange(req.body.key, 0, -1, 'withscores', function (err, rows) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.dir(rows);
                        res.send(rows);
                        client.quit();
                    });
                }


            } else {
                client.get(req.body.key, function (err, rows) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.dir(rows);
                    res.send(rows);
                    client.quit();
                });
            }
            connection.release();
        })
    })
}
dataEdit = function(req, res){
    var serverSQL = 'select * from `t_server` WHERE id = ? ';
    var serverSql_Params = [req.body.serverId];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(serverSQL, serverSql_Params, function (err, rows) {
            if (err) console.log(err);
            var redis = require('redis'),
                RDS_PORT = rows[0].port,
                RDS_HOST = rows[0].host,
                RDS_PWD = rows[0].password,
                RDS_OPTS = {auth_pass: RDS_PWD},
                client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
            if (req.body.type == 'map') {
                client.hmset(req.body.key, req.body.value, function (err, rows) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.dir(rows);
                    res.send(rows);
                    client.quit();
                });
            } else if (req.body.type == 'set') {
                client.del(req.body.key);
                for (var i = 0; i < req.body.value.length; i++) {
                    client.sadd(req.body.key, req.body.value[i], function (err, status) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.dir(rows);
                        res.send(rows);
                        client.quit();
                    });
                }

            } else if (req.body.type == 'zset') {
                client.del(req.body.key);
                for (var i = 0; i < req.body.value.length; i++) {
                    client.zadd(req.body.key, i + 1, req.body.value[i], function (err, status) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.dir(rows);
                        res.send(rows);
                        client.quit();
                    });
                }
            } else if (req.body.type == 'value') {
                client.set(req.body.key, req.body.value, function (err, rows) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.dir(rows);
                    res.send(rows);
                    client.quit();
                });
            }
            connection.release();
        })
    })
}
dataDelete = function(req, res){
    var serverSQL = 'select * from `t_server` WHERE id = ? ';
    var serverSql_Params = [req.body.serverId];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(serverSQL, serverSql_Params, function (err, rows) {
            if (err) console.log(err);
            var redis = require('redis'),
                RDS_PORT = rows[0].port,
                RDS_HOST = rows[0].host,
                RDS_PWD = rows[0].password,
                RDS_OPTS = {auth_pass: RDS_PWD},
                client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
            client.del(req.body.key, function (err, response) {
                res.send('success');
                client.quit();
            });
            connection.release();
        })
    })
}
data.post('/list',dataList);
data.post('/edit', dataEdit);
data.post('/delete', dataDelete);
module.exports = data;