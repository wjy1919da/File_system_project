const jwt = require('jsonwebtoken');
const config = require('config');
function authObj(req, res, next) {
    // 从 Authorization 头中获取令牌
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    // 检查是否为 Bearer 令牌
    if (!authHeader.startsWith('Bearer ')) return res.status(400).send('Invalid token format.');

    // 提取令牌
    const token = authHeader.substring(7); // 去掉 "Bearer " 这7个字符

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = authObj;