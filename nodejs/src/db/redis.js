const { REDIS_CONF } = require('../config/db');
const redis = require('redis');

//創建客戶端
const redisCli = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
//錯誤提示
redisCli.on('error', err => {
	console.log(err);
});


function set(key, val) {
	if(typeof val === 'object') {
		val = JSON.stringify(val);
	}

	redisCli.set(key, val, redis.print);
}

function get(key) {
	const promise = new Promise((resolve, reject) => {
		redisCli.get(key, (err, val) => {
			if(err) {
				reject(err);
				return;
			}

			if(val === null) {
				resolve(null);
				return;
			}

			try {
				resolve(
					JSON.parse(val)
				);
			} catch(ex) {
				resolve(val);
			}
		});
	});
	return promise;
}



module.exports = {
	set,
	get
}

