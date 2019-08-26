import { Form } from 'antd' //  彻底和antd聚合，非聚合版本在Validate中，这个要提取成三方库，使用antd的import方法即可
import { FormProps } from 'antd/lib/form/Form'

// @ts-ignore
import schema from 'async-validator'
import produce from 'immer'
import React, { PureComponent } from 'react'

const FormItem = Form.Item

export interface IValiForm {
	setStateObj: (
		propName: 'value' | 'status' | 'descriptor',
	) => (prop: { [propName: string]: any }) => void
	getState: (propName: string) => IItem | {}
	verify: ( asyncSource?: { [propName: string]: any })=>(propName: string) => void
	deleteProp: (propName: string) => void
	FormItem: typeof FormItem
}

export interface IItem {
	value: any
	status?: {
		validateStatus: '' | 'success' | 'warning' | 'error' | 'validating' | undefined
		help: string
	}
	descriptor?: { [propName: string]: any }
}

const prop: IValiForm = {
	setStateObj: (propName) => (prop) => {},
	getState: (propName) => ({}),
	verify: ()=>(propName) => {},
	deleteProp: (propName) => {},
	FormItem,
}

const valiContext = React.createContext(prop)

type getStates<T> = () => T

export interface IcheckFormRenderProps<T = any> {
	checkStatus: () => Promise<boolean>
	getStates: getStates<T>
	reset: () => void
}

interface IProps<T> extends FormProps {
	children: (prop: IcheckFormRenderProps<T>) => JSX.Element
	needForm?: boolean
}

const initState: { formData: { [propName: string]: IItem } } = {
	formData: {
		// name: {
		// 	value: '小明', // 验证的数据值，可以使任何类型，最好可以用泛型腿短出来
		// 	status: {
		// 		validateStatus: 'success',
		// 		help: '请填写对应的内容',
		//    descriptor:any, //
		// 	},
		// },
	},
}

class CheckForm<T = any /* { [propName: string]: any } */> extends PureComponent<IProps<T>> {
	public state = initState
	public render() {
		const { needForm = true, children, ...props } = this.props
		return (
			<valiContext.Provider
				value={{
					setStateObj: this.setStateObj,
					getState: this.getState,
					verify: this.verify,
					deleteProp: this.deleteProp,
					FormItem,
				}}
			>
				{needForm ? (
					<Form {...props}>
						{children({
							checkStatus: this.checkStatus,
							getStates: this.getStates,
							reset: this.resetAll,
						})}
					</Form>
				) : (
					children({
						checkStatus: this.checkStatus,
						getStates: this.getStates,
						reset: this.resetAll,
					})
				)}
			</valiContext.Provider>
		)
	}

	private setStateObj: IValiForm['setStateObj'] = (propName) => (prop) => {
		const [key, value] = Object.entries(prop)[0] as [string, any]

		this.setState((prevState: typeof initState) => {
			let immerData = produce(prevState.formData, (draftData) => {
				if (!draftData[key]) draftData[key] = { value: undefined }
				draftData[key][propName] = value
			})
			return { formData: immerData }
		})
	}

	// 校验函数
	private verify: IValiForm['verify'] = (asyncSource) => (propName) => {
		const { value, descriptor } = this.state.formData[propName]
		let source = {
			[propName]: value,
		}
		if (asyncSource) source = asyncSource
		if (!descriptor) {
			return this.setStateObj('status')({
				[propName]: {
					validateStatus: '',
					help: '',
				},
			})
		}

		let validator = new schema(descriptor)
		type IErrors = Array<{
			message: string
		}>
		validator.validate(source, (errors: IErrors) => {
			if (errors) {
				let message = ''
				if (errors && errors.length) {
					message = errors[0].message
				}
				return this.setStateObj('status')({
					[propName]: {
						validateStatus: 'error',
						help: message,
					},
				})
			}
			this.setStateObj('status')({
				[propName]: {
					validateStatus: '',
					help: '',
				},
			})
		})
	}

	// 重置校验结果
	private reset = (propName: string) => {
		this.setStateObj('status')({ [propName]: { validateStatus: '', help: '' } })
	}

	// 取出所有的status,然后统一验证，返回一个结果
	private checkStatus = async () => {
		await Object.keys(this.state.formData).forEach(this.verify())

		let status = true
		Object.values(this.state.formData).forEach((item) => {
			if (!item.status) return
			const { validateStatus } = item.status
			if (validateStatus === 'error') status = false
		})
		return status
	}

	// 获取所有的value,对象的形式
	private getStates = () => {
		const { formData } = this.state
		let obj: { [propName: string]: any } = {}
		Object.entries(formData).forEach(([k, v]) => {
			obj[k] = v.value
		})
		return (obj as any) as T
	}

	// 通过键名获取对应的数据
	private getState: IValiForm['getState'] = (propsName) => {
		const { formData } = this.state
		return formData[propsName] || {}
	}

	// 注销函数，删除对应的数据
	private deleteProp: IValiForm['deleteProp'] = (propsName) => {
		this.setState((prevState: typeof initState) => {
			let immerData = produce(prevState.formData, (draftData) => {
				delete draftData[propsName]
			})
			return { formData: immerData }
		})
	}

	// 清空目前的验证状态,直接制空现在的formData
	private resetAll = () => {
		Object.keys(this.state.formData).forEach(this.reset)
	}
}

export default CheckForm
export { valiContext }
