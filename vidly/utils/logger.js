const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

const logger =   winston.createLogger({
    level: 'info', // 你可以根据需要设置日志级别
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.MongoDB({
        db: 'mongodb://localhost/vidly', // 你的 MongoDB URI
        options: { useUnifiedTopology: true },
        collection: 'log', // 日志存储的集合名
        level: 'error', // 只记录错误级别的日志
        handleExceptions: true, // 处理未捕获的异常
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' }) // 为未捕获的异常创建一个专门的文件
    ]
});
module.exports = logger;