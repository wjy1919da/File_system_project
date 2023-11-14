const mongoose = require('mongoose');
const Fawn = require('fawn');
const config = require('config');
const logger = require('../utils/logger');
module.exports = async function(){
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to ${db}...`);
        Fawn.init(mongoose);  // 确保在数据库连接成功后初始化 Fawn
    })
    .catch(err => logger.error('Could not connect to MongoDB...', err));
}

