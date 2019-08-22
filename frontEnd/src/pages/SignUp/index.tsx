import { connect } from 'dva'
import React, { PureComponent } from 'react'

interface Iprops {
	aaa: string
	signUp: Store['signUp']
	dispatch: Dispatch
}

@connect(({ signUp }: Store) => ({ signUp }))
class SignUp extends PureComponent<Iprops> {
	public componentDidMount() {
		const { signUp } = this.props
		console.log('signUp：：：：：：', signUp)
	}
	public render() {
		const { aaa } = this.props
		return <div onClick={this.handleAaa}>这里是注册页面{aaa}</div>
	}
	private handleAaa = (event: React.MouseEvent) => {
		this.props.dispatch({
			type: 'signUp/payloadRype',
			payload: { id: '234', name: 'string' },
		})
	}
}

export default SignUp
