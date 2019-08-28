import request from '../utils/request'
// 这个文件，在我规划的新的开发方案中是没有的
// 因为目前没有mock，可以放在这里，根据文件区分一下，可以出来global和model，model的其实可以放到对应的组件下了。。。。

export function query() {
	return request('/api/users')
}
export function postInfor() {
	return request('http://127.0.0.1:7001/ddd', {
		contentType: 'json',
		method: 'POST',
	})
}
export function getInfor() {
	return request('http://127.0.0.1:7001/ccc')
}
