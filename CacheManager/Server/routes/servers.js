var express = require('express');
var server = express();
var pool =  require('./../config/config');
serverList = function(req, res){
  var serverSQL = 'select * from `t_server`';
  pool.getConnection(function (err, connection) {
    if (err) console.log("POOL ==> " + err);
    connection.query(serverSQL, function (err, rows) {
      if (err) console.log(err);
      res.send(rows);
      connection.release();
    })
  });
};
serverAdd = function(req, res){
  var serverAddSql = 'INSERT INTO t_server(server_name,host,port,password,clearCacheApi,rebuildCacheApi) VALUES(?,?,?,?,?,?)';
  var serverAddSql_Params = [req.body.server_name, req.body.host, req.body.port, req.body.password,req.body.clearCacheApi, req.body.rebuildCacheApi,];
  pool.getConnection(function (err, connection) {
    if (err) console.log("POOL ==> " + err);
    connection.query(serverAddSql, serverAddSql_Params, function (err, rows) {
      if (err) console.log(err);
      res.send(rows);
      connection.release();
    })
  });
};
serverEdit = function(req, res){
  var serverEeditSql = 'UPDATE t_server SET host =?,port =?,password =?,server_name =?,clearCacheApi =?,rebuildCacheApi =? WHERE id =?';
  var serverEeditSql_Params = [req.body.host, req.body.port, req.body.password, req.body.server_name, req.body.clearCacheApi, req.body.rebuildCacheApi, req.body.id];
  pool.getConnection(function (err, connection) {
    if (err) console.log("POOL ==> " + err);
    connection.query(serverEeditSql, serverEeditSql_Params, function (err, rows) {
      if (err) console.log(err);
      res.send(rows);
      connection.release();
    })
  })
};
serverDelete = function(req, res){
  var serverDelSql = 'DELETE FROM t_server WHERE id =?';
  var serverDelSql_Params = [req.body.id];
  var cacheDelSql = 'DELETE FROM t_cache WHERE server_id =?';
  var cacheDelSql_Params = [req.body.id];
  pool.getConnection(function (err, connection) {
    if (err) console.log("POOL ==> " + err);
    connection.query(serverDelSql, serverDelSql_Params, function (err, rows) {
      if (err) console.log(err);
      res.send(rows);
      connection.release();
    });
    connection.query(cacheDelSql, cacheDelSql_Params, function (err, rows) {
      if (err) console.log(err);
      //res.send(rows);
      //connection.release();
    })
  })
}
server.get('/list',serverList);
server.post('/add', serverAdd);
server.post('/edit', serverEdit);
server.post('/delete',serverDelete);
module.exports = server;