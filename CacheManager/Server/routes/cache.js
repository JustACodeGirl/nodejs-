/**
 * Created by nina.zheng on 2016/12/13.
 */
var express = require('express');
var cache = express();
var pool =  require('./../config/config');

cacheList = function(req, res){
    var cacheSQL = 'select * from `t_cache` WHERE server_id = ? ';
    var cachSql_Params = [req.body.serverId];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(cacheSQL, cachSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
    })
};
cacheItem = function(req, res){
    var cacheSQL = 'select * from `t_cache` WHERE id = ? ';
    var cachSql_Params = [req.body.cache_id];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(cacheSQL, cachSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
    })
};
cacheAdd = function(req, res){
    var cacheAddSql = 'INSERT INTO t_cache(server_id,cache_name,`desc`,pattern_key,pattern_value,type) VALUES(?,?,?,?,?,?)';
    var cacheAddSql_Params = [req.body.server_id, req.body.cache_name, req.body.desc, req.body.pattern_key, req.body.pattern_value, req.body.type];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(cacheAddSql, cacheAddSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            //connection.release();
        })
    })
};
cacheEdit = function(req, res){
    var cachEeditSql = 'UPDATE t_cache SET server_id =?, cache_name =?,`desc` =?,pattern_key =?,pattern_value =?,type =? WHERE id = ?';
    var cachEeditSql_Params = [req.body.server_id, req.body.cache_name, req.body.desc, req.body.pattern_key, req.body.pattern_value, req.body.type, req.body.id];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(cachEeditSql, cachEeditSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
    })
};
cacheDelete = function(req, res){
    var cacheDelSql = 'DELETE FROM t_cache WHERE id =?';
    var cachDelSql_Params = [req.body.id];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(cacheDelSql, cachDelSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
    })
}
cache.post('/list',cacheList);
cache.post('/item',cacheItem);
cache.post('/add',cacheAdd);
cache.post('/edit',cacheEdit);
cache.post('/delete',cacheDelete);
module.exports = cache;