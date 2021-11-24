const { getLoginData } = require('../helpers/jwt');

async function loginCheck(req, res, next) {
    const bearerToken = req.header('Authorization');

    try{
        const token = bearerToken.replace('Bearer ', '');
        const decoded = getLoginData(token);

        req.users = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            status: 'failed',
            message: 'please login first',
        })
    }
}

module.exports = { loginCheck }