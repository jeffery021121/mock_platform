import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import dddd from 'webdvautils'

class Lol extends React.Component {
	render() {
		return <div>我是lol 的暂停</div>
	}
}

// const IndexPage = asyncComponent(() =>
// 	import(/* webpackChunkName: "indexPage" */ '@/pages/IndexPage'),
// )

function RouterConfig({ history, app }) {
	// const Aaa = dddd.asyncComponent(Lol)(() => import(/* webpackChunkName: "aaa" */ '@/pages/Aaa'), {
	// 	app,
	// 	modelsFunc: () => [import(/* webpackChunkName: "aaaModel" */ '@/pages/Aaa/models')],
	// })

	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact render={() => 'hello webDva'} />
			</Switch>
		</Router>
	)
}

export default RouterConfig
