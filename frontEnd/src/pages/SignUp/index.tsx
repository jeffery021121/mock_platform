import { Check, IvaliFormRenderProps, ValiForm } from '@/hoc'
import { Form, Input } from 'antd'
import { connect } from 'dva'
import React, { Fragment,PureComponent } from 'react'

// prop的类型
interface Iprops {
	aaa: string
	signUp: Store['signUp']
	dispatch: Dispatch
}

// 验证数据的类型,这个后期应该也不是在这里维护，应该是直接在对应的model中维护的一个字段这里只需要引入一下即可了
interface Ivalidate {
	name: string
}

const FormItem = Form.Item

@connect(({ signUp }: Store) => ({ signUp }))
class SignUp extends PureComponent<Iprops> {
	private checkStatus = (undefined as unknown) as IvaliFormRenderProps['checkStatus']
	private reset = (undefined as unknown) as IvaliFormRenderProps['reset']
	private getStates = (undefined as unknown) as IvaliFormRenderProps<Ivalidate>['getStates']

	public constructor(props: Iprops) {
		super(props)
	}
	public componentDidMount() {
		const { signUp } = this.props
		console.log('signUp：：：：：：', signUp)
	}

	public render() {
		const { aaa } = this.props
		return (
			<div style={{ width: '1000px' }}>
				<ValiForm<Ivalidate> needForm={true} labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					{({ checkStatus, getStates, reset }) => {
						if (!this.checkStatus) this.checkStatus = checkStatus
						if (!this.reset) this.reset = reset
						if (!this.getStates) this.getStates = getStates
						return (
							<Fragment>
								<Check
									sourceName={'name'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="用名"
								>
									{({ listen }) => (
										<Input
											onChange={listen(/* (e) => {
												console.log('这里是啥啊：：：：：', e.target.value)
											} */)}
											placeholder="请输入手机号"
										/>
									)}
								</Check>
								<Check
									sourceName={'address'}
									rules={{ type: 'string', required: true }}
									needFormItem={true}
									label="地址"
									defaultValue={'我是默认值了asdfasdfasdfasdf啦'} // 这两个属性sourceName和defaultValue 配合完全可以实现非受控组件所有功能
									// hasFeedback={true}
								>
									{({ listen }) => (
										<Input
											onChange={listen()}
											placeholder="请输入地址"
											defaultValue={'我是默认值了啦'}
										/>
									)}
								</Check>
							</Fragment>
						)
					}}
				</ValiForm>
				<div>
					<button onClick={this.handleAaa}>注册</button>
				</div>
			</div>
		)
	}

	private handleAaa = async (event: React.MouseEvent) => {
		// const checkStatus = await this.checkStatus()
		const states = this.getStates()
		this.checkStatus()
		// const result = this.reset()
		console.log('所有数据：', states)
		// this.props.dispatch({
		// 	type: 'signUp/payloadRype',
		// 	payload: { id: '234', name: 'string' },
		// })
	}
}

export default SignUp
