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
		const listData = getList(author, keyword);

		return new SuccessModel(listData);
	}

	//獲取貼文詳情
	if(method === 'GET' && req.path === '/api/blog/detail') {
		if(id !== '') {
			const detailData = getDetail(id);

			return new SuccessModel(detailData);
		}
	}

	//POST
	//新增貼文
	if(method === 'POST' && req.path === '/api/blog/new') {
		const data = addBlog(req.body);
		return new SuccessModel(data);
	}

	//更新貼文
	if(method === 'POST' && req.path === '/api/blog/update') {
		const result =updateBlog(id, req.body);
		if(result) {
			return new SuccessModel('update Succeed');
		} else {
			return new ErrorModel('update failed');
		}
	}

	//刪除貼文
	if(method === 'POST' && req.path === '/api/blog/del') {
		const result =delBlog(id, req.body);
		if(result) {
			return new SuccessModel('delete Succeed');
		} else {
			return new ErrorModel('delete failed');
		}
	}
};

module.exports = handleIndexRouter;
