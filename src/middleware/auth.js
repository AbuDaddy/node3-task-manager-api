const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const publicKey = fs.readFileSync(path.join(__dirname, '../utils/id_rsa_pub.pem'), 'utf-8').toString()
        const decoded = jwt.verify(token, publicKey, { algorithms: 'RS256'})
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

module.exports = auth