import { connect } from 'dva'
import React, { PureComponent } from 'react'

interface Iprops {
	aaa: string
	signUp: Store['signUp']
}

@connect(({ signUp }: Store) => ({ signUp }))
class SignUp extends PureComponent<Iprops> {
	public componentDidMount() {
		const { signUp } = this.props
		console.log('signUp：：：：：：', signUp)
	}
	public render() {
		const { aaa } = this.props
		return <div>这里是注册页面{aaa}</div>
	}
}

export default SignUp
