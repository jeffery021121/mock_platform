const fs = require('fs') // 引入fs模块

const types = {
	Number: 'number',
	String: 'string',
	Boolean: 'boolean',
}

fs.readFile(`${__dirname}/aabb.json`, function(err, data) {
	// 读取文件失败/错误
	if (err) {
		throw err
	}
	// 读取文件成功

	data = data.toString() // 将二进制的数据转换为字符串
	data = JSON.parse(data) // 将字符串转换为json对象

	// 提取内容
	const result = getResult(data)

	let txt = ''

	// 提取api-params.ts
	const getCat = (cat, index) => {
		const name = Object.keys(result)[index]
		const typeName = `${name}Type`
		const params = getParamsToText(cat.params)

		// type
		txt += `interface ${typeName} {`
		txt += '\r\n'
		txt += params
		txt += '}'
		txt += '\r\n\r\n'

		// api request
		txt += `export const ${name} = (params:${typeName}) => {`
		txt += '\r\n\r\n'
		txt += '}'
		txt += '\r\n\r\n\r\n\r\n'
	}

	Object.values(result).map(getCat)
	// 写入文件
	writeFile(txt)
})

// 根据params选项拼装出interface
const getParamsToText = (params) => {
	let paramsTxt = ''

	for (const i of params) {
		const item = i
		const key = item.name
		const { type } = item

		if (item.require === 'true') {
			paramsTxt += `   ${key}:${types[type]}`
		} else if (item.require === 'false') {
			paramsTxt += `   ${key}?:${types[type]}`
		}
		paramsTxt += '\r\n'
	}

	console.log('paramsTxt:', paramsTxt)

	return paramsTxt
}

// 提取
function getResult(data) {
	const apiList = []
	const result = {}

	for (const value of Object.values(data.apiList)) {
		apiList.push(value)
	}

	const recursion = (cat) => {
		const api = cat.api.split('___')[0]
		const _result = {
			name: cat.comment,
			url: api,
			method: cat.method === 'ALL' ? 'GET' : cat.method,
			dataType: cat.method === 'GET' ? 'JSON' : 'X-WWW-FORM-URLENCODED',
			params: cat.params,
		}

		const pathSnippets = cat.api.split('/')
		const __split = pathSnippets.map((str, index) =>
			index > 0 ? str.substring(0, 1).toUpperCase() + str.substring(1) : str,
		)
		const newKey = __split
			.join('')
			.split('___')[0]
			.replace('.json', '')
		result[newKey] = _result
	}

	apiList.map(recursion)

	return result
}

// 写入文件
function writeFile(str) {
	// str = JSON.stringify(str);
	fs.writeFile('./api-params.ts', str, function(err) {
		if (err) {
			console.error(err)
		}
		console.log('----------添加成功-------------')
	})
}
