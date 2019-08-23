import { stateFactory } from '@/utils/publicFunc'
import produce from 'immer'

interface INode {
	children?: INode[]
}

// 定义初始数据，创建成类是为了不用直接写数据的类型，直接定义初始值，通过typeof获取类型即可
class InitalState {
	public time = '时间'
	public toggle = 'tyui'
	public obj = { a: { b: { c: [1, 2, 8] } }, asd: 3456 }
	public treeData = [] // 树数据一般我都是这样写的，其实这样写反而没有了依据
	public tree: Array<INode> = [
		{ children: [{ children: [{ children: [] }, { children: [] }] }, { children: [] }] },
		{ children: [] },
	] // 这是一个典型的树数据，一般来说我们的处理也不一样
}

// 定义action的内容，键为type.值为payload
interface IactionType {
	'signUp/payloadRype': {
		id: string
		name: string
	}
	'signUp/updateState': {
		asdf: number
	}
}

const signUp: IModel<InitalState> = {
	namespace: 'signUp',
	state: stateFactory(InitalState),// 通过工厂函数处理数据使之可以被immer使用
	subscriptions: { setup({ dispatch, history }) {} },
	effects: {
		*payloadRype(action, { select, put }) {
			if (action.type !== 'signUp/payloadRype') return // 如果不写action类型，这里会是联合类型，得加一层判断
			const signUp: InitalState = yield select(({ signUp }) => signUp) // yield会导致any
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

export type IsignUpActions = CreateActions<IactionType>

export default signUp

// //////////////////////////////
