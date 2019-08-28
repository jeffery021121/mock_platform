import { Context } from 'egg'

export default function routewarp() {
	return async (ctx: Context, next: any) => {
		await next()
		const data = ctx.body
		// {
		// 		data:{数据可以不是对象},
		// 		success:true||false
		// 		message:'报错信息，一般为空'
		// 		errorStatus:'错误状态码'
		// 	}
		try {
			const warp = {
				data,
				success: true,
				message: '',
				errorStatus: 200,
			}
			ctx.body = warp
		} catch (e) {
			console.log('routewarp中间件打印：：：', ctx.body)
			console.log('routewarp中间件打印errrr：：：', e)
		}
	}
}
