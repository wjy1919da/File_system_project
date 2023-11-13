const logger = require('../utils/logger');
module.exports = function(err,req,res,next){    // err is the error object
    //console.log("Error module is call:",err);
    logger.error(err.message, { metadata: err });
    res.status(500).send("Something failed");
}