/**
 * Created by nina.zheng on 2016/12/13.
 */
var log4js = require('log4js');                 //日志模块
log4js.configure({
    appenders: [
        {type: 'console'}, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'log.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal'
        }
    ]
});
module.exports = log4js;