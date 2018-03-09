/**
 * Created by nina.zheng on 2016/12/13.
 */
var log4js = require('log4js');                 //��־ģ��
log4js.configure({
    appenders: [
        {type: 'console'}, //����̨���
        {
            type: 'file', //�ļ����
            filename: 'log.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal'
        }
    ]
});
module.exports = log4js;