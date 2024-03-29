# Nodejs

## 前言

### Nodejs 的真正用途
* Nodejs，一個JS的執行環境
* 執行在Server => Web server
* 執行在本地 => 打包、構件工具

### Nodejs 困惑
* 執行於Server端，非瀏覽器環境
* 開發思維與前端完全不一樣

## Nodejs 介紹

### 下載&安裝

* 一般安裝

> https://nodejs.org/en/ ，下載並安裝
> 打開終端機，執行node -v和npm -v

* NVM安裝

> NVM，nodejs版本管理工具，可切換多個nodejs版本
> MacOS，使用brew install nvm
> Windows，github搜尋nvm-windows，https://github.com/coreybutler/nvm-windows 下載

* 使用NVM

> nvm list 查看目前所有node版本
> nvm install v10.13.0 安裝指定版本
> nvm use --delete-prefix 10.13.0 切換版本


* 總結

> 如果使用多版本的node，建議用NVM
> 無論如何安裝，版本要>=8.0

### nodejs和前端JS區別
* ECMAScript(ES)

> 定義了語法，寫js和nodejs須遵守
> 變數定義、循環、判斷、函數
> 原型和原型鏈、作用域和閉包、異步\
> 可參考http://es6.ruanyifeng.com/
> 不能操作DOM、監聽click事件、ajax請求
> 不能處理http請求、操作文件


* javascript

> 使用ECMAScript(ES)，外加Web API，缺一不可
> DOM、BOM、事件綁定、Ajax...等
> 兩者結合，即可完成瀏覽器操作

* nodejs

> 使用ECMAScript(ES)，外加Web API，缺一不可
> 處理http請求、處理文件，可參考https://nodejs.org/dist/latest-v10.x/docs/api/
> 兩者結合，即可完成Server端操作

* 總結

> ECMAScript(ES)是語法規範
> nodejs = ECMAScript(ES) + nodejs API

* 補充ˇ

> commonjs 模塊化
	> require & exports
	> ex. a.js => module.exports = { add, mul }
	> ex. b.js => const { add, mul } = require('./a')
> nodejs debugger
	> JsDebuggr(sublime)的Ctrl+F10可以設定斷點，並在瀏覽器執行

### Server開發和前端開發區別

* 服務穩定性

> Server端可能遭受各種惡意攻擊和錯誤操作
> 單個Client端可以惡意掛掉，但Server端不行
> PM2進程守護

* 考慮記憶體和CPU(優化、擴充)

> Client 獨佔一個瀏覽器，記憶體和CPU不是問題
> Server端要承載很多請求，CPU和記憶體都是稀缺資源
> 使用stream寫日誌，redis存session

* 日誌紀錄

> 前端也有日誌紀錄，但只是日誌的發起方，不關心後續
> Server端要記錄日至、存儲日誌、分析日誌

* 安全

> Server端要隨時準備接收各種惡意攻擊，前端多則少很多
> 例如:越權操作、SQL Injection...

* 集群和服務拆分

> 產品開發效率快，流量可能會迅速增加
> 透過擴展機器和服務拆分來承載大流量

* 總結

> 列出前後端區別
> 將如何在nodejs中解決

### 總結

* nodejs 下載安裝
* nodejs和前端js的區別、commonjs和debugger
* Server開發和前端開發區別，重點在於切換思路

## 案例分析和設計

### 目標

* 開發一個Blog，具有Blog基本功能
* 只開發Server端，不關心前端

### 需求

* 首頁、作者主頁、詳細頁
* 登入頁
* 管理中心、新建頁、編輯頁

### 總結
* 需求一定要明確，需求指導開發
* 不要糾結於簡單的頁面樣式，並不影響Server端的複雜度

## API和資料存儲

### 資料如何存儲

* 貼文

| id | title | content | created_at | author |
| -- | -- | -- | -- | -- |
| 1 | title1 | content1 | 123 | Bob |
| 2 | title2 | content1 | 123 | Bob |

* 用戶

| id | name | password | created_at |
| -- | -- | -- | -- |
| 1 | Bob | qqq | 123 |
| 2 | Dick | qqq | 123 |

### 如何與前端對接，即API設計

* 接口設計

| 描述 | 接口 | 方法 | url參數 | 備註 |
| -- | -- | -- | -- | -- |
| 獲取貼文列表 | /api/blog/list | get | author, keyword | 參數為空，則不進行查詢過濾 |
| 獲取一篇貼文的內容 | /api/blog/detail | get | id |  |
| 新增一篇貼文 | /api/blog/new | post | 123 | post中有新增的訊息 |
| 更新一篇貼文 | /api/blog/update | post | id | postData中有更新的內容 |
| 刪除一篇貼文 | /api/blog/del | post | id |  |
| 登入 | /api/blog/login | post | 123 | postData中有name和password |

### 登入

* 有統一解決方案，一般不用重新設計
* 實現起來比較複雜

### 總結

* 細節不懂可以不用深究
* 只要明白存儲和API的概念的用途

## 開發API(不使用任何框架)

### nodejs 處理http請求

#### http請求概述

* 範例在tag v0.1之中
* DNS解析，建立TCP連線，發送http請求
* Server接受http請求，處理並返回
* Client端接受到返回數據，處理數據(頁面渲染、js執行)
* 簡單範例

`nodejs\example\http.js`
```gherkin=
const http = require('http');

const server = http.createServer((req, res) => {
	res.end('Hello World!');
});

server.listen(8000);
```

#### nodejs 處理get請求

* get請求，即Client要項Server端獲取數據，如查詢貼文列表
* 通過querystring來傳遞數據，如a.html?a=100&b=200
* 瀏覽器直接訪問，就發送get請求
* 簡單範例

`nodejs\example\get.js`
```gherkin=
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	//GET
	console.log('Method: ', req.method);
	//獲取完整URL
	const url = req.url;
	console.log('Url: ', url);
	//解析querystring
	req.query = querystring.parse(url.split('?')[1]);
	console.log('Query: ', req.query);
	//querystring返回
	res.end(JSON.stringify(req.query));

});

server.listen(8000);
console.log('Listening on port 8000');
```

#### nodejs 處理post請求

* post請求，即Client要項Server端傳遞數據，如新增貼文
* 通過post data來傳遞數據
* 瀏覽器無法直接訪問，需要寫JS或是使用postman
* 簡單範例
`nodejs\example\post.js`
```gherkin=
const http = require('http');

const server = http.createServer((req, res) => {

	//POST
	if(req.method == 'POST') {
		//數據格式
		console.log('Content-type: ', req.headers['content-type']);
		//接收數據
		let postData = "";
		req.on('data', chunk =>{
			postData += chunk.toString();
		});
		req.on('end', () => {
			console.log(postData);
			res.end('Hello World!');
		});
	}
});

server.listen(8000);
console.log('Listening on port 8000');
```

#### nodejs 處理路由

* 簡單範例
`nodejs\example\url.js`
```gherkin=
const http = require('http');

const server = http.createServer((req, res) => {
	//獲取完整URL
	const url = req.url;
	const path = url.split('?')[0];
	//返回路由
	res.end(path);
});

server.listen(8000);
console.log('Listening on port 8000');
```

#### nodejs 綜合範例

* 簡單範例
`nodejs\example\index.js`
```gherkin=
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	//獲取完整URL
	const method = req.method;
	const url = req.url;
	const path = url.split('?')[0];
	const query = querystring.parse(url.split('?')[1]);

	//設定返回格式為JSON
	res.setHeader('Content-type', 'application/json');
	const resData = {
		method,
		url,
		path,
		query
	};

	//POST
	if(method === 'GET') {
		res.end(JSON.stringify(resData));
	}

	if(method === 'POST') {
		//接收數據
		let postData = "";
		req.on('data', chunk => {
			postData += chunk.toString();
		});
		req.on('end', () => {
			resData.postData = postData;
			res.end(JSON.stringify(resData));
		});
	}
});

server.listen(8000);
console.log('Listening on port 8000');
```

### 搭建開發環境

* 範例在tag v0.2之中
* 從0開始，不使用任何框架
* 使用nodemon監測文件變化，自動重啟node
* 使用cross-env設置環境變量，兼容mac、linux和windows
* 在terminal 輸入，初始化並安裝
```gherkin=
npm init
npm install nodemon cross-env --save-dev
```
* 並配置運行模式
`nodejs\package.json`
```gherkin=
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
    "prd": "cross-env NODE_ENV=production pm2 ./bin/www.js"
  },
```
* 運行指令
```gherkin=
npm run dev/prd...
```
* 簡單範例
`nodejs\bin\www.js`
```gherkin=
const http = require('http');

const PORT = 8000;
const serverHandler = require('../app');

const server = http.createServer(serverHandler);

server.listen(PORT);
console.log('Listening on port 8000');
```

`nodejs\app.js`
```gherkin=
const serverHandler = (req, res) => {
	//設定返回格式為JSON
	res.setHeader('Content-type', 'application/json');

	const resData = {
		method,
		url,
		path,
		query,
		env: process.env.NODE_ENV
	};
	res.end(JSON.stringify(resData));
};

module.exports = serverHandler;
```

### 開發API(暫時不連接資料庫和登入)

* 初始化路由: 根據之前方案設計，做出路由
* 返回假數據: 將路由和數據處理分離，以符合設計原則

#### 路由簡構

* 範例
`nodejs\app.js`
```gherkin=
const handleIndexRouter = require('./src/router/index');
const handleUserRouter = require('./src/router/user');

const serverHandler = (req, res) => {
	//設定返回格式為JSON
	res.setHeader('Content-type', 'application/json');

	const url = req.url;
	req.path = url.split('?')[0];

	//處理index路由
	const indexData = handleIndexRouter(req, res);
	if(indexData) {
		res.end(
			JSON.stringify(indexData)
		);
		return;
	}

	//處理user路由
	const userData = handleUserRouter(req, res);
	if(userData) {
		res.end(
			JSON.stringify(userData)
		);
		return;
	}

	//不符合路由，返回404
	res.writeHead(404, {"Content-type": "text/plain"});
	res.write("404 Not Found\n");
	res.end();
};

module.exports = serverHandler;
```
* 處理Blog的路由簡構
`nodejs\src\router\index.js`
```gherkin=
const handleIndexRouter = (req, res) => {
	const method = req.method;

	//GET
	//獲取Blog貼文
	if(method === 'GET' && req.path === '/api/blog/list') {
		return {
			msg: '獲取Blog貼文'
		};
		// res.end(JSON.stringify(resData));
	}

	//獲取貼文詳情
	if(method === 'GET' && req.path === '/api/blog/detail') {
		return {
			msg: '獲取貼文詳情'
		};
	}

	//POST
	//新增貼文
	if(method === 'POST' && req.path === '/api/blog/new') {
		return {
			msg: '獲取貼文詳情'
		};
	}

	//更新貼文
	if(method === 'POST' && req.path === '/api/blog/update') {
		return {
			msg: '更新貼文'
		};
	}

	//刪除貼文
	if(method === 'POST' && req.path === '/api/blog/del') {
		return {
			msg: '刪除貼文'
		};
	}
};

module.exports = handleIndexRouter;
```
* 處理登入的路由簡構
`nodejs\src\router\user.js`
```gherkin=
const handleUserRouter = (req, res) => {
	const method = req.method;

	//POST
	//登入
	if(method === 'POST' && req.path === '/api/user/login') {
		return {
			msg: '登入'
		};
	}
};

module.exports = handleUserRouter;
```

#### 路由延伸(model, controller, promise)

* 範例在tag v0.3之中
* promise 處理範例
`nodejs\nodejs\example\promise.js`
```gherkin=
const fs = require('fs');
const path = require('path');

// // callback方式獲取一個文件內容
// function getFileContent(fileName, callback) {
// 	const fullFileName = path.resolve(__dirname, 'file', fileName);
// 	fs.readFile(fullFileName, (err, data) => {
// 		if(err) {
// 			console.error(err);
// 			return;
// 		}
// 		callback(
// 			JSON.parse(data.toString())
// 		);
// 	});
// }

// // 測試 callback-hell
// getFileContent('a.json', aData => {
// 	console.log('a data', aData);
// 	getFileContent(aData.next, bData => {
// 		console.log('b data', bData);
// 	});
// });

// promise方式獲取文件內容
function getFileContent(fileName) {
	const promise = new Promise((resolve, reject) => {
		const fullFileName = path.resolve(__dirname, 'file', fileName);
		fs.readFile(fullFileName, (err, data) => {
			if(err) {
				reject(err);
				return;
			}
			resolve(
				JSON.parse(data.toString())
			);
		});
	});
	return promise;
}

getFileContent('a.json').then(aData => {
	console.log('a data', aData);
	return getFileContent(aData.next);
}).then(bData => {
	console.log('b data', bData);
	return getFileContent(bData.next);
});
```

#### 總結

* nodejs處理http請求的常用技能，ARC(google plugin)
* nodejs開發Blog的API(未連接mysql，未使用登入)
* router和controller分開用意

## Mysql、登入(cookie)和redis

### mysql介紹、安裝和使用

#### 介紹

* web server中最流行的關係行資料庫
* 官方網站可以免費下載，可用於學習
* 輕量級，易學易用
* 下載地址 https://dev.mysql.com/downloads/mysql/

#### 安裝

* 執行安裝
* 如果需要輸入root用戶的密碼，要務必記住
* 安裝mysql workbench(Client)，圖形化操作
* 下載地址 https://dev.mysql.com/downloads/workbench/

#### 使用

* 開啟並輸入帳密
* 查看現有資料庫
	*　show databases;
* 建資料庫
	*　create schema `myDB`;
* 建資料表
	* users
		* create table `myDB`.`users`(`id` int not null auto_increment, `name` varchar(20) not null, `password` varchar(126) not null, `create_at` datetime, primary key (`id`));
	* blogs
		* create table `myDB`.`blogs`(`id` int not null auto_increment, `title` varchar(52) not null, `content` longtext not null, `create_at` datetime, `author` varchar(20) not null, primary key (`id`));
* 操作資料表
	* 增
		* INSERT INTO `users`( `name`, `password`) VALUES (`Bob`, `123456`)
		* INSERT INTO `blogs`(`title`, `content`, `author`) VALUES (`我`, `吃變變`, `Bob`)

	* 刪
		* DELETE FROM `users` WHERE `id` = 1
		* DELETE FROM `blogs` WHERE `id` = 1

	* 改
		* UPDATE `users` SET `id`=2,`name`=`POABOB` WHERE `id` = 1
		* UPDATE `blogs` SET `id`=2,`title`=`ㄎㄎ`,`content`=`變遍布建ㄌ` WHERE `id` = 1

	* 查
		* SELECT * FROM `users` WHERE `id` = 1
		* SELECT * FROM `blogs` WHERE `id` = 1

#### 總結

* 如何建資料庫，如何建資料表
* 建資料表時常用資料類型(int bigint varchar longtext)
* SQL語法實現增刪改查

### nodejs連接mysql

* 範例在tag v0.4之中
* 範例: 用demo演示，不考慮使用
* 封裝: 將其封裝成系統可用工具
* 使用: 讓API直接操作資料庫，不再使用假資料

#### 配置

* 在'nodejs\\nodejs\\mysql-demo'輸入指令
	* npm init -y
	* npm install mysql

### API連接mysql

* 範例在tag v0.5之中
* 範例
`nodejs/nodejs/src/config/db.js`
```gherkin=
//環境參數
const env = process.env.NODE_ENV;

let MYSQL_CONF;

if(env === 'dev') {
	MYSQL_CONF = {
			host: 'localhost',
			user: 'root',
			password: 'root',
			port: '3306',
			database: 'myDB'
		};
}

if(env === 'production') {
	MYSQL_CONF = {
			host: 'localhost',
			user: 'root',
			password: 'root',
			port: '3306',
			database: 'myDB'
		};
}

module.exports = {
	MYSQL_CONF
};

```

`nodejs/nodejs/src/db/mysql.js`
```gherkin=
const { MYSQL_CONF } = require('../config/db');
const mysql = require('mysql');

const conn = mysql.createConnection(MYSQL_CONF);

conn.connect();

function exec(sql) {
	const promise = new Promise((resolve, reject) => {
		conn.query(sql, (err, result) => {
			if(err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});

	return promise;
}
// conn.end();

module.exports = {
	exec
}
```

#### 總結

* nodejs 連接mysql，如何執行sq語法
* 根據NODE_ENV區分配置
* 封裝exec函數，API使用exec操作資料庫

### 總結

* 安裝Mysql和workbench
* 創建資料庫、資料表、SQL語法和使用
* nodejs連接Mysql，應用到API

### 登入

* cookie和session
* session寫入redis
* 開發登入功能，和前端聯調(nginx反向代理)

#### cookie和session

* 範例在tag v0.5之中
* 什麼是cookie
	* 儲存於瀏覽器的一段字符串(最大5kb)
	* 跨域不共享(每個網站cookie不相同)
	* 格式如k1=v1;k2=v2;k3=v3，因此可以儲存結構化資料
	* 每次翻送http請求，會將請求域的cookie一起發送給server
	* server可以修改cookie並返回給瀏覽器
	* 瀏覽器可以通過js修改cookie(有限制)
* session
	* 儲存於Server的字符串
	* 因為cookie會暴露重要的值，非常危險
	* 如何解決，cookie儲存userid，server對應userid並給其值的session

#### session寫入redis

* 範例在v0.7之中
* session問題
	* 目前session直接為js變量，放在nodejs進程內存中
	* 一、進程內存有限，訪問量大，內存暴增會使系統崩饋潰
	* 二、正式上線為多進程，進程間的內存無法共享
* 解決方案redis
	* web server最常用的緩存資料庫，資料將存放於內存中
	* 相對於mysql，訪問速度更快(內存與硬碟處理效能差別極大)
	* 相對成本較高，可儲存資料量更小(硬傷)
	* 將web server和redis拆分成兩個單獨的服務
	* 雙方皆為獨立，都是可以擴展(可擴展成集群)
	* mysql，亦是一個單獨的服務，也可礦展
* 為什麼session適合用redis?
	* session訪問頻繁，對性能要求極大
	* session可不考慮斷電丟失數據問題
	* session資料量部會太大(相對於mysql)
* 安裝redis
	* 下載 https://github.com/MSOpenTech/redis/releases
	* Mac使用brew install redis
	* Linux參考 http://www.runoob.com/redis/redis-install.html
* redis-server使用
	* 開啟(已配置好環境變數)
		* redis-server.exe redis.windows.conf
* redis-cli使用
	* 連線
		* redis-cli.exe -h 127.0.0.1 -p 6379
	* 插入session值
		* set {key} {value}
	* 獲取session值
		* get {key}
	* 獲取全部
		* keys *
	* 刪除session值
		* del {key}
* 用redis儲存session
	* 範例在v0.6之中

#### 前端聯調

* 登入功能依賴cookie，必須用瀏覽器來聯調
* cookie跨域不共享，前端和server必須同域
* nginx
	* 修改/usr/local/etc/nginx/nginx.conf
	```gherkin=
	# 根據幾核心填寫
	worker_processes 2;
	# 在server{}裡面修改location
	location /nodejs/html/ {
		proxy_pass http://localhost:80/nodejs/html/;
	}
	location /api/ {
		proxy_pass http://localhost:8000;
		proxy_set_header Host $host;
	}
	```
* apache2
	* 修改conf/httpd.conf，這些要註解掉
	```gherkin=
	LoadModule proxy_module modules/mod_proxy.so
	LoadModule proxy_connect_modulemodules/mod_proxy_connect.so
	LoadModule proxy_ftp_modulemodules/mod_proxy_ftp.so
	LoadModuleproxy_http_modulemodules/mod_proxy_http.so
	```
	* balancer如果沒有額外配置就不要開啟，apache會開不起來
	* 然後到conf/httpd.conf最下面輸入
	```gherkin=
	#反向代理
	ProxyRequests Off
	ProxyPass /api/ http://127.0.0.1:8000/api/
	ProxyPassReverse /nodejs/html/ http://127.0.0.1:80/nodejs/html/
	#80為apache的監聽埠
	<proxy http://127.0.0.1:80>
	  AllowOverride None
	  Order Deny,Allow
	  Allow from all
	</proxy>
	```

#### 總結

* cookie和session是什麼?如何實現登入
* redis在這裡扮演甚麼角色，其核心價值是甚麼?
* nginx的反向代理配置，聯調過程中的作用

## 安全和日誌

### 日誌

* 系統沒有日誌 = 沒有眼睛
* 一、訪問日誌 access log (server最重要的)
* 二、自定義日誌(自定義事件、錯誤紀錄...等)

#### nodejs文件操作

* 範例
`nodejs\nodejs\example\file.js`
```gherkin=
const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, './file/data.txt');

// //讀取文件
// fs.readFile(fileName, (err, data) => {
// 	if(err) {
// 		console.log(err);
// 		return;
// 	}
// 	//轉換為字符串
// 	console.log(data.toString());
// });

// //寫入文件
// const content = 'WRITTED';
// const opt = {
// 	flag: 'a'	//追加寫入，覆蓋用w
// }
// fs.writeFile(fileName, content, opt, (err) => {
// 	if(err) {
// 		console.log(err);
// 	}

// });

// //判斷文件是否存在
// fs.exists(fileName, (exists) => {
// 	console.log(exists);
// });
```
* I/O操作的性能瓶頸
	* I/O，包括"網路"I/O和"文件"I/O
	* 想比於CPU計算和內存讀寫，I/O特點就是"慢"
	* 如何在有限情況下提高I/O操作效率
* stream
	* 標準輸入輸出，pipe就是管道(符合水流管道的模型圖)
	* process.stdin 獲取資料，直接通過管道傳遞給process.stdout
		* process.stdin.pipe(process.stdout)
	* 範例
`nodejs\nodejs\example\stream.js`
```gherkin=
//標準輸入輸出
// process.stdin.pipe(process.stdout)

// const http = require('http')

// const server = http.createServer((req, res) => {
//     if(method === 'POST') {
// 		req.pipe(res)
//     }
// })

// server.listen(8000)



// const fs = require('fs')
// const path = require('path')

// //兩文件名
// const file1 =  path.resolve(__dirname, 'file/data.txt')
// const file2 =  path.resolve(__dirname, 'file/data-bak.txt')

// //讀取文件的stream物件
// const readStream = fs.createReadStream(file1)
// const writeStream = fs.createWriteStream(file2)

// //copy，通過pipe
// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//     console.log(chunk.toString())
// })

// //資料讀取完成，即copy完成
// readStream.on('end', function () {
//     console.log('copyed!')
// })



const http = require('http')
const fs = require('fs')
const path = require('path')

const file1 =  path.resolve(__dirname, 'file/data.txt')
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        const readStream = fs.createReadStream(file1)
		readStream.pipe(res)
    }
})

server.listen(8000)

```
#### 日誌功能開發和使用

* 範例
`nodejs/nodejs/src/utils/log.js`
```gherkin=
const fs = require('fs')
const path = require('path')
const { LOG_CONF } = require('../config/db');

//寫日誌
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

//write stream
function createWriteStream(fileName) {
    const fullFileName= path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

//寫訪問日誌
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    if(LOG_CONF) {
        console.log(log)
        return
    }
    writeLog(accessWriteStream, log)
}

// //寫錯誤日誌
// const errorWriteStream = createWriteStream('errors.log')
// function error(log) {
//     writeLog(errorWriteStream, log)
// }

// //寫事件日誌
// const eventWriteStream = createWriteStream('event.log')
// function event(log) {
//     writeLog(eventWriteStream, log)
// }

module.exports = {
    access,
    // error,
    // event
}
```

`nodejs/nodejs/app.js`
```gherkin=
//寫access log
	access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
```

#### 日誌文件拆分，日誌內容分析

##### 日誌拆分
* 日誌內容會慢慢累積，放在一個文件中不好處理
* 按照時間劃分日誌文件，如：2019-10-27
* 實現方式：linux的crontab命令，即定時任務
* crontab
	* 設定定時任務，格式：***** command
	* 將access.log cpoy成2019-10-27.access.log
	* 清空access.log，繼續累積日誌
	* 範例
	`nodejs/nodejs/utils/copy.sh`
	```gherkin=
	#!/bin/sh
	cd /opt/lampp/htdocs/nodejs/nodejs/logs
	cp access.log $(data +%Y-%m-%d).access.log
	echo "" > access.log
	```
	* terminal 輸入crontab -e，然後增加以下一行(每天0點執行)
	> \* 0 * * * sh /opt/lampp/htdocs/nodejs/nodejs/src/utils/copy.sh

##### 日誌分析

* 如何針對access.log日誌，分析chrome的佔比
* 日誌是按行儲存，一行為一條
* 使用nodejs readline(基於stream，效率高)
* 範例
`nodejs/nodejs/src/utils/readline.js`
```gherkin=
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { LOG_CONF } = require('../config/db');

//文件名
const fileName= path.join(__dirname, '../', '../', 'logs', 'access.log')
//read Stream
const readStream = fs.createReadStream(fileName)
//readline
const readline = fs.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

readline.on('line',  (lineData) => {
    if(!lineData) {
        return
    }

    //總行數
    sum++

    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') > 0) {
        //累加chrome數量
        chromeNum++
    }
})

readline.on('close', () => {
    console.log('chrome 佔比：'+sum/chromeNum)
})

```
#### 日誌- 總結
* 日誌對server端的重要性，相當於人的眼睛
* I/O性能瓶頸，使用stream提高性能
* 使用crontab拆分日誌文件，使用readline分析日誌內容

### 安全

* sql注入：竊取資料庫內容
* XSS攻擊：竊取cookie內容
* 密碼加密：保障使用者資料安全

#### sql注入

* 最原始，最簡單的攻擊，從有了web2.0就有sql注入
* 攻擊方式：輸入一個sql片段，最終拼成一段攻擊code
* 預防措施：使用mysql escape函數處理輸入內容

#### XSS攻擊
*  前端最熟悉的攻擊方式，但後端更應該掌握
* 攻擊方式：在頁面中參雜js code，以獲取網頁訊息
* 預防措施：轉換產生js的特殊字符

| 轉換前 | 轉換後 |
| -- | -- | 
| & | \&amp; |
| < | \&lt; |
| > | \&gt; |
| " | \&quot; |
| ' | \&#x27; |
| / | \&#x2F; |

#### 密碼加密

* 萬一資料庫資料外洩，應把重要訊息加密
* 攻擊方式：獲取帳號和密碼，再去登入其他系統
* 預防措施：將密碼加密，即便拿到也不知道是明文
* 範例
`nodejs/nodejs/src/utils/crypto.js`
```gherkin=
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
```

### 總結

* 如何預防sql注入
* 如何預防xss攻擊
* 如何加密密碼

## express和koa2

### express

* express下載，安裝和使用，express中間件機制
* 開發接口，連切資料庫，實現登錄，日誌紀錄
* 分析express中間件原理

#### 介紹express

* 安裝(使用腳手架express-generator)
	```gherkin=
	npm i express-generator -g
	/opt/node-v10.16.3-linux-x64/bin/express express
	cd express
	npm i
	npm i cross-env nodemon -save-dev
	
	新增package.json
	"dev": "cross-env NODE_ENV=dev nodemon ./bin/www"

	npm run dev

	```
* 初始化code介紹，處理路由
	* 介紹app.js
		* 各插件應用
		* 思考各插件的實現原理
		* 處理GET/POST請求*
* 使用中間件
	* 範例
	`nodejs/express/example/test/app.js`
	```gherkin=
	const express = require('express')

	//http物件
	const app = express()

	app.use((req, res, next) => {
		console.log('request starting...', req.method, req.url)
		next()
	})

	app.use((req, res, next) => {
		//假設處理cookie
		req.cookie = {
			Id: '123123'
		}
		next()
	})

	app.use((req, res, next) => {
		//假設處理post
		//異步
		setTimeout(() => {
			req.body = {
				a: 100,
				b: 200
			}
			next()
		})
	})

	app.use('/api', (req, res, next) => {
		//假設處理api
	console.log('處理 /api路由')
	next()
	})

	app.get('/api', (req, res, next) => {
		//假設處理api
	console.log('get /api路由')
	next()
	})

	app.post('/api', (req, res, next) => {
		//假設處理api
	console.log('post /api路由')
	next()
	})

	//模擬登入驗證
	function loginCheck(req, res, next) {
		setTimeout(() => {
			console.log('模擬登入失敗!')
			res.json({
				errno: -1,
				data: '登入失敗'
			})
			// console.log('模擬登入成功!')
			// next()
		})
	}

	app.get('/api/get-cookie', loginCheck, (req, res, next) => {
		//假設獲取cookie
		console.log('get /api/get-cookie路由')
		res.json({
			errno: 0,
			data: req.cookie
		})
	})

	app.post('/api/get-post-cookie', (req, res, next) => {
		//假設獲取cookie
		console.log('get /api/get-post-cookie路由')
		res.json({
			errno: 0,
			data: req.body
		})
	})

	app.use((req, res, next) => {
		console.log('處理404')
		res.json({
			errno: -1,
			msg: '404 not found'
		})
	})

	app.listen(3000, () => {
		console.log('server is running...')
	})
	```

#### express開發接口
* 初始化項目，之前的code可以重複使用
	* 安裝插件 mysql xss
	* mysql controller resModel 可以複製
	* 初始化路由

* 實現登入
	* 使用express-session和connect-redis
	* req.session保存登入訊息，登入校驗做成中間件

* 紀錄日誌(morgan)
	* access log紀錄，直接使用morgan
	* 自定義日誌使用console.log和console.error
	* 日誌拆分，日誌內容分析

#### express中間件原理
* 分析
	* app.use用來註冊中間件，先收集起來
	* 遇到http請求，根據path和method判斷觸發哪些方法
	* 實現next機制，即通過next()觸發下一個方法
* 範例


## PM2介紹和配置

## PM2多進程模型

## Server運維

