import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
	// tslint:disable-next-line:no-object-literal-type-assertion
	const config = {} as PowerPartial<EggAppConfig>

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1565246633849_7281'

	// add your egg config in here
	config.middleware = ['routewarp']
	config.routewarp = {
		asdf:'asdfasdf',
	}

	config.jwt = { secret: 'yqwdzjl' }

	config.mongoose = {
		url: 'mongodb://127.0.0.1:27017/test',
		options: {},
	}

	// config.security = {
	// 	domainWhiteList: ['http://localhost', 'http://0.0.0.0'],
	// }
	config.cors = {
		origin: '*',
		credentials: true,
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
	}

	// add your special config in here
	const bizConfig = {
		// ??????
		sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
	}

	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig,
	}
}
