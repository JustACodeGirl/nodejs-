/**
 * Created by nina.zheng on 2016/12/13.
 */
var express = require('express');
var http = require('http');
var solr = express();
var pool = require('./../config/config');

solrCore = function (req, res) {
    var solrSQL = 'select * from `t_solr` WHERE search_id = ? ';
    var solrSql_Params = [req.body.solrId];
    var searchSQL = 'select * from `t_search` WHERE id = ? ';
    var searchSql_Params = [req.body.solrId];
    var solrList = [];
    var solrDBList = [];
    var solrDBListItem = [];
    var solrSearchList = [];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(solrSQL, solrSql_Params, function (err, rows) {
            if (err) console.log(err);
            solrDBList = rows;
            connection.release();
        })
        connection.query(searchSQL, searchSql_Params, function (err, rows) {
            if (err) console.log(err);
            var response = {};
            http.get(rows[0].solrIndexListApi, function (resp) {
                var resData = "";
                resp.on("data", function (data) {
                    resData += data;
                });
                resp.on("end", function () {
                    response = JSON.parse(resData);
                    solrSearchList = response;
                    if (solrDBList.length > 0) {
                        for (var k = 0; k < solrDBList.length; k++) {
                            solrDBListItem.push(solrDBList[k].name);
                        }
                        for (var i = 0; i < solrSearchList.data.length; i++) {
                            for (var j = 0; j < solrDBList.length; j++) {
                                if (solrSearchList.data[i] == solrDBList[j].name) {
                                    solrList.push(solrDBList[j]);
                                }
                                else if (solrSearchList.data.indexOf(solrDBList[j].name) < 0) {
                                    var cacheDelSql = 'DELETE FROM t_solr WHERE id =?';
                                    var cachDelSql_Params = [solrDBList[j].id];
                                    if (err) console.log("POOL ==> " + err);
                                    connection.query(cacheDelSql, cachDelSql_Params, function (err, rows) {
                                        if (err) console.log(err);
                                        //connection.release();
                                    })
                                }
                            }
                        }
                        for (var m = 0; m < solrDBList.length; m++) {
                            if (solrDBListItem.indexOf(solrSearchList.data[m]) < 0) {
                                var solrAddSql = 'INSERT INTO t_solr(search_id,name,clear_api,rebuild_api) VALUES(?,?,?,?)';
                                var solrAddSql_Params = [solrDBList[0].search_id, solrSearchList.data[m], '', ''];
                                if (err) console.log("POOL ==> " + err);
                                connection.query(solrAddSql, solrAddSql_Params, function (err, rows) {
                                    if (err) console.log(err);
                                    //connection.release();
                                })
                            }
                        }
                    } else if (solrDBList.length == 0) {
                        for (var i = 0; i < solrSearchList.data.length; i++) {
                            var solrAddSql = 'INSERT INTO t_solr(search_id,name,clear_api,rebuild_api) VALUES(?,?,?,?)';
                            var solrAddSql_Params = [req.body.solrId, solrSearchList.data[i], '', ''];
                            if (err) console.log("POOL ==> " + err);
                            connection.query(solrAddSql, solrAddSql_Params, function (err, rows) {
                                if (err) console.log(err);
                                //connection.release();
                            })
                        }
                    }
                })

            });
        }).on("error", function (e) {
            console.log(e.message);
            connection.release();

        });
        connection.query(solrSQL, solrSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            //connection.release();
        })
    })
};
solrEdit = function (req, res) {
    var solrEeditSql = 'UPDATE t_solr SET name =?,clear_api =?,rebuild_api =?,update_api =?,delete_api =?,search_id =? WHERE id =?';
    var solrEeditSql_Params = [req.body.name, req.body.clear_api, req.body.rebuild_api,req.body.update_api,req.body.delete_api, req.body.search_id, req.body.id];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(solrEeditSql, solrEeditSql_Params, function (err, rows) {
            if (err) console.log(err);
            res.send(rows);
            connection.release();
        })
    })
};
solrUpdata = function (req, res) {
    var solrSQL = 'select * from `t_solr` WHERE id = ? ';
    var solrSql_Params = [req.body.solrId];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(solrSQL, solrSql_Params, function (err, rows) {
            if (err) console.log(err);
            http.get(rows[0].update_api + req.body.ids, function (resp) {
                var resData = "";
                resp.on("data", function (data) {
                    resData += data;
                });
                resp.on("end", function () {
                    res.send(JSON.parse(resData));
                });
            }).on("error", function (e) {
                console.log(e.message);
            });
            connection.release();
        })
    })
}
solrDelete = function (req, res) {
    var solrSQL = 'select * from `t_solr` WHERE id = ? ';
    var solrSql_Params = [req.body.solrId];
    pool.getConnection(function (err, connection) {
        if (err) console.log("POOL ==> " + err);
        connection.query(solrSQL, solrSql_Params, function (err, rows) {
            if (err) console.log(err);
            http.get(rows[0].detele_api + req.body.ids, function (resp) {
                var resData = "";
                resp.on("data", function (data) {
                    resData += data;
                });
                resp.on("end", function () {
                    res.send(JSON.parse(resData));
                });
            }).on("error", function (e) {
                console.log(e.message);
            });
            connection.release();
        })
    })
}
solr.post('/index/cores', solrCore);
solr.post('/index/edit', solrEdit);
solr.post('/index/update', solrUpdata);
solr.post('/index/delete', solrDelete);
module.exports = solr;