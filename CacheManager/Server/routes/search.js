/**
 * Created by nina.zheng on 2016/12/13.
 */
var express = require('express');
var search = express();
var pool =  require('./../config/config');
searchList = function(req, res){
    var searchSQL = 'select * from `t_search`';
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(searchSQL, function (err, rows) {
            if (err) return err;
            res.send(rows);
            connection.release();
        })
    })
};
searchAdd = function(req, res){
    console.log(req.body);
    var searchAddSql = 'INSERT INTO t_search(name,description,solrIndexListApi,solrAdmin) VALUES(?,?,?,?)';
    var searchAddSql_Params = [req.body.name, req.body.description, req.body.solrIndexListApi, req.body.solrAdmin];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(searchAddSql, searchAddSql_Params, function (err, rows) {
            if (err) console.log(err);
            console.log(rows);
            res.send(rows);
            connection.release();
        })
    })
};
searchEdit = function(req, res){
    var searchEeditSql = 'UPDATE t_search SET name =?, description =?, solrIndexListApi =?,solrAdmin=? WHERE id =?';
    var searchEeditSql_Params = [req.body.name, req.body.description, req.body.solrIndexListApi,req.body.solrAdmin, req.body.id];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(searchEeditSql, searchEeditSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
    })
};
searchDelete = function(req, res){
    var searchDelSql = 'DELETE FROM t_search WHERE id =?';
    var searchDelSql_Params = [req.body.id];
    var solrDelSql = 'DELETE FROM t_solr WHERE search_id =?';
    var solrDelSql_Params = [req.body.id];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(searchDelSql, searchDelSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
        connection.query(solrDelSql, solrDelSql_Params, function (err, rows) {
            if (err) console.log(err);
            //res.send(rows);
            //connection.release();
        })
    })
}
search.get('/list', searchList);
search.post('/add', searchAdd);
search.post('/edit', searchEdit);
search.post('/delete',searchDelete);
module.exports = search;