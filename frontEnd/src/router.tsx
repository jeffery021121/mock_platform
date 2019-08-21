import { RouterAPI } from 'dva'
import { Route, Router, Switch } from 'dva/router'
import React from 'react'
import webDvaUtils from 'webdvautils'

class Lol extends React.Component {
	public render() {
		return <div>我是lol 的暂停</div>
	}
}

// const IndexPage = asyncComponent(() =>
// 	import(/* webpackChunkName: "indexPage" */ '@/pages/IndexPage'),
// )

function RouterConfig({ history, app }: RouterAPI) {
	const SignUp = webDvaUtils.asyncComponent(<Lol />)(
		() => import(/* webpackChunkName: "aaa" */ '@/pages/SignUp'),
		{
			app,
			modelsFunc: () => [import(/* webpackChunkName: "aaaModel" */ '@/pages/SignUp/model')],
		},
	)
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact={true} component={Lol} />
				<Route path="/signUp" exact={true} component={SignUp} />
			</Switch>
		</Router>
	)
}

export default RouterConfig
