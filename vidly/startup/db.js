const mongoose = require('mongoose');
const Fawn = require('fawn');
module.exports = async function(){
    try{
        mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log('Connected to MongoDB...');
            Fawn.init(mongoose);  // 确保在数据库连接成功后初始化 Fawn
          })
          .catch(err => console.error('Could not connect to MongoDB...', err));
        
          console.log('Connected to MongoDB...');
    }catch(err){
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    }
}

