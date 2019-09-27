const { getList,
		getDetail,
		addBlog,
		updateBlog,
		delBlog, } = require('../controller/index');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleIndexRouter = (req, res) => {
	const method = req.method;
	const id= req.query.id;
	//GET
	//獲取Blog貼文
	if(method === 'GET' && req.path === '/api/blog/list') {
		const author = req.query.author || '';
		const keyword = req.query.keyword || '';

		const result = getList(author, keyword);

		return result.then(listData => {
			return new SuccessModel(listData);
		});
	}

	//獲取貼文詳情
	if(method === 'GET' && req.path === '/api/blog/detail') {
		if(id !== '') {
			const result = getDetail(id);

			return result.then(detailData => {
				return new SuccessModel(detailData);
			});
		}
	}

	//POST
	//新增貼文
	if(method === 'POST' && req.path === '/api/blog/new') {
		const result = addBlog(req.body);
		return result.then(data => {
			return new SuccessModel(data);
		});
	}

	//更新貼文
	if(method === 'POST' && req.path === '/api/blog/update') {
		const result = updateBlog(id, req.body);
		return result.then(value => {
			if(value) {
				return new SuccessModel(value);
			} else {
				return new ErrorModel(value);
			}
		});
	}

	//刪除貼文
	if(method === 'POST' && req.path === '/api/blog/del') {
		const author = req.body.author;
		const result = delBlog(id, author);
		return result.then(value => {
			if(value) {
				return new SuccessModel(value);
			} else {
				return new ErrorModel(value);
			}
		});
	}
};

module.exports = handleIndexRouter;
