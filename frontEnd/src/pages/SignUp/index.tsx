import { CheckForm, IcheckFormRenderProps } from '@/hoc'
import { Button, Input } from 'antd'
import { connect } from 'dva'
import React, { Fragment, PureComponent } from 'react'
import styles from './index.scss'

const CheckFormItem = CheckForm.Item
/* 
name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // password_prompt: { // 密码提示,这个省掉吧，感觉没啥用
    //   type: String,
    //   required: true,
    // },
    eMail: {
      type: String,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
      unique: true,
    },
*/
// prop的类型
interface Iprops {
	signUp: Store['signUp']
	dispatch: Dispatch
}

// 验证数据的类型,这个后期应该也不是在这里维护，应该是直接在对应的model中维护的一个字段这里只需要引入一下即可了
interface ICheckdate {
	name: string
	password: string
	confirmPwd: string
	eMail: string
	nickname: string
}
const initState = {
	nameMsg: '用户名是必须滴',
	canGetVerificationCode: false,
}

type Istate = typeof initState

@connect(({ signUp }: Store) => ({ signUp }))
class SignUp extends PureComponent<Iprops, Istate> {
	public state = initState
	private checkStatus = (undefined as unknown) as IcheckFormRenderProps['checkStatus']
	private reset = (undefined as unknown) as IcheckFormRenderProps['reset']
	private getStates = (undefined as unknown) as IcheckFormRenderProps<ICheckdate>['getStates']
	// public constructor(props: Iprops) {
	// 	super(props)
	// 	this.state = {

	// 	}
	// }

	public componentDidMount() {
		const { signUp } = this.props
		console.log('signUp：：：：：：', signUp)
	}

	public render() {
		const { dispatch } = this.props
		return (
			<div style={{ width: '1000px' }} className={styles.asd}>
				<CheckForm<ICheckdate> needForm={true} labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					{({ checkStatus, getStates, reset }) => {
						if (!this.checkStatus) this.checkStatus = checkStatus
						if (!this.reset) this.reset = reset
						if (!this.getStates) this.getStates = getStates
						return (
							<Fragment>
								<CheckFormItem
									sourceName={'name'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="用户名"
									required={true}
									message={this.state.nameMsg}
								>
									{({ listen }) => <Input onChange={listen()} placeholder="请输入用户名" />}
								</CheckFormItem>

								<CheckFormItem
									required={true}
									sourceName={'password'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="密码"
								>
									{({ listen }) => (
										<Input onChange={listen()} type="password" placeholder="请输入密码" />
									)}
								</CheckFormItem>

								<CheckFormItem
									required={true}
									sourceName={'confirmPwd'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="确认密码"
								>
									{({ listen }) => (
										<Input onChange={listen()} type="password" placeholder="请输入密码" />
									)}
								</CheckFormItem>

								<CheckFormItem
									required={true}
									sourceName={'nickname'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="昵称"
								>
									{({ listen }) => <Input onChange={listen()} placeholder="请输入昵称" />}
								</CheckFormItem>

								<CheckFormItem
									required={true}
									sourceName={'eMail'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="邮箱"
								>
									{({ listen }) => (
										<Input
											onChange={listen((status) => () => {
												console.log('邮箱的状态获取中', status)
												this.setState({ canGetVerificationCode: status })
											})}
											placeholder="请输入邮箱"
										/>
									)}
								</CheckFormItem>

								<CheckFormItem
									required={true}
									sourceName={'verificationCode'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="验证码"
								>
									{({ listen }) => {
										return (
											<div
												style={{
													display: 'flex',
													marginBottom: '7px',
												}}
											>
												<Input onChange={listen()} placeholder="请输入邮箱" />
												<Button
													onClick={this.handleGetVerificationCode}
													style={{ marginLeft: '10px' }}
													disabled={!this.state.canGetVerificationCode}
												>
													获取邮箱验证码
												</Button>
											</div>
										)
									}}
								</CheckFormItem>
							</Fragment>
						)
					}}
				</CheckForm>
				<div>
					<Button onClick={this.handleSignUp}>注册</Button>
				</div>
			</div>
		)
	}

	private handleSignUp = async (event: React.MouseEvent) => {
		// const checkStatus = await this.checkStatus()
		const states = this.getStates()
		const checkReselts = await this.checkStatus()
		// const result = this.reset()
		console.log('所有数据：', states)
		console.log('checkReselts:::::', checkReselts)
		// this.props.dispatch({
		// 	type: 'signUp/payloadRype',
		// 	payload: { id: '234', name: 'string' },
		// })
	}

	private handleGetVerificationCode = () => {
		const { eMail } = this.getStates()
		this.props.dispatch({ type: 'signUp/sendEmail', payload: { eMail } })
	}
}

export default SignUp

setTimeout(() => console.log('我是定时器'), 0)
