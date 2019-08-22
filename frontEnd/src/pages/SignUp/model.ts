import { stateFactory } from '@/utils/publicFunc'
import produce from 'immer'

interface INode {
	children?: INode[]
}

class IinitalState {
	public time = '时间'
	public toggle = 'tyui'
	public obj = { a: { b: { c: [1, 2, 8] } }, asd: 3456 }
	public treeData = [] // 树数据一般我都是这样写的，其实这样写反而没有了依据
	public tree: Array<INode> = [
		{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] },
		{ children: [] },
	] // 这是一个典型的树数据，一般来说我们的处理也不一样
}

// 获取实例
const classState = new IinitalState()

// 通过typeof获取到类型
export type IsignUpState = typeof classState

// 通过工厂函数去除数据的class标志,使得immer可用
const initalState = stateFactory<IsignUpState>(classState)

// 最难的一个步骤就是同步payload数据，目前没有太好的想法。
interface IactionType {
	'signUp/payloadRype': {
		id: string
		name: string
	}
	'signUp/updateState': {
		asdf: number
	}
}

// // 创建所有action类型
// type Iactions = createActions<IactionType>

// // 导出Actions需要的类型
// export type IsignUpActions = ValueOf<Iactions>
export type IsignUpActions = ValueOf<createActions<IactionType>>

const signUp: IModel<IsignUpState> = {
	namespace: 'signUp',
	state: initalState,
	subscriptions: { setup({ dispatch, history }) {} },
	effects: {
		*payloadRype(action, { select, put }) {
			if (action.type !== 'signUp/payloadRype') return
			const signUp: IsignUpState = yield select(({ signUp }) => signUp) // yield会导致any
			yield console.log('asdfasfda', signUp.treeData)
			yield put({
				type: 'signUp/payloadRype',
				payload: { id: 'id', name: 'string' },
			})
			console.log(action.payload.name)
		},
	},

	reducers: {
		updateState(state, action) {
			if (action.type !== 'signUp/updateState') return
			const { asdf } = action.payload
		},
	},
}

export default signUp

// //////////////////////////////
