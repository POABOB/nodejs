const { exec, escape } = require('../db/mysql');
const xss = require('xss')

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `;
	if (author) {
		author = xss(escape(author))
		sql += `and author='${author}' `;
	}

	keyword = xss(escape(keyword))
	if(keyword) {
		sql += `and (title like '%${keyword}%' OR content like '%${keyword}%') `;
	}
	sql += `order by create_at desc;`;

	//返回promise
	return exec(sql);
};

const getDetail = (id) => {
	id = xss(escape(id))
	let sql = `select * from blogs where id='${id}' `;
	return exec(sql).then(rows => {
		return rows[0];
	});
};

//增刪改查
const addBlog = (blogData = {}) => {
	
	const title = xss(escape(blogData.title));
	const content = xss(escape(blogData.content));
	const author = xss(escape(blogData.author));
	let sql = `INSERT INTO blogs (title, content, author) VALUES ('${title}','${content}','${author}') `;
	return exec(sql).then(insertData => {
		return {
				id: insertData.insertId
			};
	});
};
// UPDATE `blogs` SET `id`=2,`title`=`ㄎㄎ`,`content`=`變遍布建ㄌ` WHERE `id` = 1
const updateBlog = (id, blogData = {}) => {
	const title = xss(escape(blogData.title));
	const content = xss(escape(blogData.content));
	let sql = `UPDATE blogs SET title='${title}', content='${content}' WHERE id = '${id}'`;
	return exec(sql).then(updateData => {
			if(updateData.affectedRows > 0) {
				return true;
			}
			return false;
		});
};

const delBlog = (id, author) => {
	id = xss(escape(id))
	author = xss(escape(author))
	let sql = `DELETE FROM blogs WHERE id = '${id}' and author = '${author}'`;
	return exec(sql).then(delData => {
			if(delData.affectedRows > 0) {
				return true;
			}
			return false;
		});
};

module.exports = {
	getList,
	getDetail,
	addBlog,
	updateBlog,
	delBlog
};