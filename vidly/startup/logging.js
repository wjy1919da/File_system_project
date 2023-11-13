require('winston-mongodb');
const logger = require('../utils/logger');
module.exports = function(){
    process.on('uncaughtException', (ex) => {
        logger.error('WE GOT AN UNCAUGHT EXCEPTION: ' + ex.message, ex);
        // 在此处添加必要的清理逻辑
        //process.exit(1); // 非零状态码表示异常退出
    });

    process.on('unhandledRejection', (ex) => {
        logger.error('WE GOT AN UNHANDLED REJECTION: ' + ex.message, ex);
        // 可以考虑在这里添加退出逻辑或其他处理逻辑
        // process.exit(1); // 依情况决定是否在此退出
    });
}

