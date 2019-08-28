import { message } from 'antd'
import axios from 'axios'

interface Iprops {
	method: string
	apiName: string
	params?: { [key: string]: any }
	baseURL?: string
}
const fetchData = (baseURL = '') => async (props: Iprops) => {
	const { method, apiName, params = {} } = props

	const lowMethod = method.toLowerCase()
	// 创建一个axios对象
	const newAxios = axios.create({
		baseURL,
		timeout: 20000,
	})
	let axiosConfig = {}
	if (lowMethod === 'get') {
		const random = { _: Math.random() } // 解决get请求参数不变时浏览器默认取缓存的问题
		axiosConfig = {
			method: lowMethod,
			url: apiName,
			params: { ...params, ...random },
		}
	} else {
		axiosConfig = {
			method: lowMethod,
			url: apiName,
			data: params,
			headers: {
				'content-type': 'application/json',
			},
		}
	}
	try {
		const result = await newAxios(axiosConfig)
		console.log('请求返回的结果：：：', result)

		// const result = {
		// 	data: {
		// 		data: {},
		// 		success: true || false,
		// 		message: '报错信息，一般为空',
		// 		errorStatus: '错误状态码',
		// 	},
		// 	status: 200,
		// }

		if (
			result &&
			result.data &&
			result.data.data &&
			result.data.success &&
			result.data.errorStatus === 200
		) {
			return result.data.data
		}
		throw result
	} catch (err) {}
}

export default fetchData
