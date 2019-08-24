import { Check, IvaliFormChildrenProps, ValiForm } from '@/hoc'
import { Form, Input } from 'antd'
import { connect } from 'dva'
import React, { PureComponent } from 'react'

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
	private checkStatus = (undefined as unknown) as IvaliFormChildrenProps['checkStatus']
	private reset = (undefined as unknown) as IvaliFormChildrenProps['reset']
	private getStates = (undefined as unknown) as IvaliFormChildrenProps<Ivalidate>['getStates']

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
				<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					<FormItem label="用户名" /*  labelCol={{ span: 3}} */>
						<Input />
					</FormItem>
					<FormItem label="用户sadf 名" /*  labelCol={{ span: 3}} */>
						<Input />
					</FormItem>
					<FormItem label="用名" /*  labelCol={{ span: 3}} */>
						<Input />
					</FormItem>
				</Form>

				{/* 
				这里传入泛型是为了不丢失验证以后的数据。这个泛型以后应该也能优化掉，
				这个类型最好是放在每一个check下，通过check可以直接拿到要验证的键和值，通过泛型传递 
				目前没有找到实现的方式
				*/}

				<ValiForm<Ivalidate>>
					{({ checkStatus, getStates, reset }) => {
						if (!this.checkStatus) this.checkStatus = checkStatus
						if (!this.reset) this.reset = reset
						if (!this.getStates) this.getStates = getStates
						return (
							<Check sourceName={'name'} rules={{ type: 'string', required: true }}>
								{({ listen, help, validateStatus }) => (
									<FormItem validateStatus={validateStatus} help={help}>
										<Input
											onChange={listen(() => {
												console.log('hahaha')
											})}
											placeholder="请输入手机号"
										/>
									</FormItem>
								)}
							</Check>
						)
					}}
				</ValiForm>
			</div>
		)
	}

	private handleAaa = async (event: React.MouseEvent) => {
		const checkStatus = await this.checkStatus()
		const asdf = this.getStates()
		const result = this.reset()
		// this.props.dispatch({
		// 	type: 'signUp/payloadRype',
		// 	payload: { id: '234', name: 'string' },
		// })
	}
}

export default SignUp
