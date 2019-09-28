const redis = require('redis');

//創建客戶端
const redisCli = redis.createClient(6379, '127.0.0.1');

//錯誤提示
redisCli.on('error', err => {
	console.log(err);
});

//test
redisCli.set('key1', 'iamvalue', redis.print);
redisCli.get('key1', (err, val) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log(val);

	//離開
	redisCli.quit();
});