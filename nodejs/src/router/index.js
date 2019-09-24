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
