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
```
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

## 登入和redis

## 安全和日誌

## express和koa2

## 中間件和插件

## 中間件原理

## PM2介紹和配置

## PM2多進程模型

## Server運維

