const getList = (author, keyword) => {
	//先返回假數據
	return [
		{
			id: 1,
			title: '標題ㄎ',
			content: '內容ㄎ',
			created_at: '2019-08-32 20:00:22',
			author: 'Bob'
		}
	];
};

const getDetail = (id) => {
	//先返回假數據
	return [
		{
			id: 1,
			title: '標題ㄎ',
			content: '內容ㄎ',
			created_at: '2019-08-32 20:00:22',
			author: 'Bob'
		}
	];
};

//增刪改查
const addBlog = (blogData = {}) => {

	//先返回新增數據
	return [
		{
			id: 3,
			title: '標題ㄎ',
			content: '內容ㄎ',
			created_at: '2019-08-32 20:00:22',
			author: 'Bob'
		}
	];
};

const updateBlog = (id, blogData = {}) => {

	//更新後返回true
	return true;
};

const delBlog = (id) => {
	//刪除後返回true
	return true;
};

module.exports = {
	getList,
	getDetail,
	addBlog,
	updateBlog,
	delBlog
};