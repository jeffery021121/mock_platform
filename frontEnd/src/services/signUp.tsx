import fetchDataFun from '@/utils/fetchData'

const baseUrl = 'http://127.0.0.1:7001'
const fetchData = fetchDataFun(baseUrl)

export const sendEmail: <T>(params: T) => void = (params) => {
	const obj = {
		method: 'get',
		apiName: '/',
		params,
	}
	// const result = fetchData(obj)
	return fetchData(obj)
}
