const crypto = require('crypto')

//key
const SERECT_KEY = '2K3NFFdf49290548523sJIOfdFr455fd'

//md5加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function getPassword(passwd) {
    const str = `password=${passwd}&key=${SERECT_KEY}`
    return md5(str)
}

module.exports = {
    getPassword,
    md5
}