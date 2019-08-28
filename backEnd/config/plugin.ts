import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
	// static: true,
	// nunjucks: {
	//   enable: true,
	//   package: 'egg-view-nunjucks',
	// },
	mongoose: {
		enable: true,
		package: 'egg-mongoose',
	},
	jwt: {
		enable: true,
		package: 'egg-jwt',
	},
	security: {
		enable: true,
		package: 'egg-security',
	},
	cors: {
		enable: true,
		package: 'egg-cors',
	},
}

export default plugin
