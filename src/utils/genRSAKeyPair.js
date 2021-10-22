const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const genRSAKeyPair = () => {
    crypto.generateKeyPair('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    }, (err, publicKey, privateKey) => {
        if (err) {
            throw new Error('Unable to create key pair')
        }

        fs.writeFileSync(path.join(__dirname + '/id_rsa_pub.pem'), publicKey)   
        fs.writeFileSync(path.join(__dirname + '/id_rsa_priv.pem'), privateKey)     
    })
}

genRSAKeyPair()