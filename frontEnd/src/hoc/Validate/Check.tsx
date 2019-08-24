import { FormItemProps } from 'antd/lib/form/FormItem'
import React, { Fragment, PureComponent } from 'react'
import { IItem, valiContext } from './ValiForm'

interface IProps  extends FormItemProps {
	children: (prop: any) => JSX.Element
	rules?: any
	source?: { [propName: string]: any }
	// help?: string
	sourceName?: string
	needFormItem?: boolean
	[propName: string]: any
}
// interface IProps extends FormItemProps{

// }
const STATUS = {
	validateStatus: '' as '' | 'success' | 'warning' | 'error' | 'validating' | undefined,
	help: '',
}

class Check extends PureComponent<IProps> {
	public updateState: any = null
	public deleteProp: any = null
	public state: any = {}
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
			const { rules, source, sourceName } = this.props
			if (source && sourceName) {
				return console.error('sourceName和source属性只能使用一个，以区分是否为受控组件')
			}
			const { propName } = this.state
			if (source) this.updateState('value')(source)
			if (rules) {
				let descriptor = {
					[propName]: { [propName]: rules },
				}
				this.updateState('descriptor')(descriptor)
			}
			if (sourceName) this.updateState('value')({ [sourceName]: undefined })
		}
	}

	private listen = (
		setStateObj: (propName: 'value' | 'status') => (prop: { [propName: string]: any }) => void,
		verify: (propName: string) => any,
	) => (cb: any) => async (...props: Array<any>) => {
		if (cb) await cb(...props)

		const { source, sourceName, rules } = this.props
		const { propName } = this.state

		if (source) setStateObj('value')(source)
		if (sourceName) {
			const [prop1] = props
			let value: any = prop1
			if (prop1 && prop1.target) value = prop1.target.value
			setStateObj('value')({ [sourceName]: value })
		}
		if (rules) verify(propName)
	}
}

export default Check
