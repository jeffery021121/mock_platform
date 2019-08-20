import { RouterAPI } from 'dva'
import {  Route,Router, Switch } from 'dva/router'
import React from 'react'
import dddd from 'webdvautils'

class Lol extends React.Component {
	public render() {
		return <div>我是lol 的暂停</div>
	}
}

// const IndexPage = asyncComponent(() =>
// 	import(/* webpackChunkName: "indexPage" */ '@/pages/IndexPage'),
// )

function RouterConfig({ history, app }: RouterAPI) {
	// const Aaa = dddd.asyncComponent(<Lol/>)(() => import(/* webpackChunkName: "aaa" */ '@/pages/Aaa'), {
	// 	app,
	// 	modelsFunc: () => [import(/* webpackChunkName: "aaaModel" */ '@/pages/Aaa/models')],
	// })
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact={true} component={Lol} />
			</Switch>
		</Router>
	)
}

export default RouterConfig
