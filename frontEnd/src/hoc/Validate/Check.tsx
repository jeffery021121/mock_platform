import { FormItemProps } from 'antd/lib/form/FormItem'
import React, { Fragment, PureComponent } from 'react'
import { IItem, IValiForm, valiContext } from './ValiForm'

interface IProps extends FormItemProps {
	children: (prop: {
		listen: (cb?: (...props: any[]) => void) => (...props: any[]) => Promise<void>
		help?: string
		validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating' | undefined
	}) => JSX.Element
	rules?: any // 这个的确比较难定义，得特备清楚这个ku估计才行，可以为对象或者函数，所以先any吧。
	source?: { [propName: string]: any }
	sourceName?: string
	needFormItem?: boolean
	defaultValue?: any // 默认值，和sourceName配合使用
}
// interface IProps extends FormItemProps{

// }
const STATUS = {
	validateStatus: '' as '' | 'success' | 'warning' | 'error' | 'validating' | undefined,
	help: '',
}

class Check extends PureComponent<IProps> {
	// private reset = (undefined as unknown) as IvaliFormRenderProps['reset']
	public updateState = (null as unknown) as IValiForm['setStateObj']
	public deleteProp = (null as unknown) as IValiForm['deleteProp']
	public state = ({} as unknown) as { propName: string }
	public componentDidMount = async () => {
		const { source, sourceName } = this.props
		let key = undefined as any
		if (source) [key] = Object.keys(source) as [string, any]
		if (sourceName) key = sourceName

		await this.setState({ propName: key })
		this.registProp()
	}
	public render() {
		const { source, sourceName, needFormItem = false, ...props } = this.props
		return (
			<valiContext.Consumer>
				{({ setStateObj, getState, verify, deleteProp, FormItem }) => {
					let propName = ''
					if (source) {
						propName = Object.keys(source)[0]
					} else if (sourceName) {
						propName = sourceName
					} else {
						throw new Error('source和sourceName有且必有一个')
					}

					if (!this.updateState) this.updateState = setStateObj
					if (!this.deleteProp) this.deleteProp = deleteProp
					const { status = STATUS } = getState(propName) as IItem

					if (needFormItem) {
						return (
							<FormItem help={status.help} validateStatus={status.validateStatus} {...props}>
								{this.props.children({
									listen: this.listen(setStateObj, verify),
								})}
							</FormItem>
						)
					}
					return (
						<Fragment>
							{this.props.children({
								listen: this.listen(setStateObj, verify),
								help: status.help,
								validateStatus: status.validateStatus,
							})}
						</Fragment>
					)
				}}
			</valiContext.Consumer>
		)
	}

	public componentWillUnmount() {
		const { propName } = this.state
		this.deleteProp(propName)
	}

	private registProp = () => {
		if (this.updateState) {
			const { rules, source, sourceName, defaultValue } = this.props
			if (source && sourceName) {
				return console.error('sourceName和source属性只能使用一个，以区分是否为受控组件')
			}
			if (source && defaultValue) {
				return console.error('defaultValue只能配合sourceName使用')
			}
			const { propName } = this.state
			if (source) this.updateState('value')(source)
			if (rules) {
				let descriptor = {
					[propName]: { [propName]: rules },
				}
				this.updateState('descriptor')(descriptor)
			}
			if (sourceName) this.updateState('value')({ [sourceName]: defaultValue })
		}
	}

	private listen = (setStateObj: IValiForm['setStateObj'], verify: IValiForm['verify']) => (
		cb?: (...props: Array<any>) => void,
	) => async (...props: Array<any>) => {
		const { source, sourceName, rules } = this.props
		if (source) await setStateObj('value')(source)

		if (sourceName) {
			const [prop1] = props
			let value: any = prop1
			if (prop1 && prop1.target !== undefined) {
				value = prop1.target.value
			}
			await setStateObj('value')({ [sourceName]: value })
		}

		if (cb) await cb(...props)

		const { propName } = this.state
		if (rules) verify(propName)
	}
}

export default Check
