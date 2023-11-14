const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

const transports = [];

if (process.env.NODE_ENV !== 'test') {
  transports.push(
    new winston.transports.MongoDB({
        // MongoDB 配置
        db: 'mongodb://localhost/vidly', // 你的 MongoDB URI
        options: { useUnifiedTopology: true },
        collection: 'log', // 日志存储的集合名
        level: 'error', // 只记录错误级别的日志
        handleExceptions: true, // 处理未捕获的异常
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    })
  );
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: transports,
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});
module.exports = logger;