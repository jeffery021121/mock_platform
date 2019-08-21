import { stateFactory } from '@/utils/publicFunc'
import produce from 'immer'

interface INode {
	children?: INode[]
}

class IinitalStateClass {
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
const classState = new IinitalStateClass()

// 通过typeof获取到类型
export type IsignUpState = typeof classState

// 通过工厂函数去除数据的class标志,使得immer可用
const initalState = stateFactory<IsignUpState>(classState)

interface Iaaa {
	aaa: string
}

// 最难的一个步骤就是同步payload数据，目前没有太好的想法。

const signUp: IModel<IsignUpState> = {
	namespace: 'signUp',
	state: initalState,
	subscriptions: { setup({ dispatch, history }) {} },
	effects: {
		*payloadRype({ payload }: Action<Iaaa>, { select, put }) {
			const signUp: IsignUpState = yield select(({ signUp }) => signUp) // yield会导致any
			yield console.log('asdfasfda', signUp.treeData)
			yield put({ type: 'asdf', payload: {} })
			console.log(payload.aaa)
		},
	},

	reducers: {
		updateState(state, action: Action<Iaaa>) {},
	},
}

// const signUp = {
// 	namespace: 'signUp',
// 	state: initalState,
// 	subscriptions: { setup({ dispatch, history }: { dispatch: Dispatch; history: History }) {} },
// 	effects: {
// 		*payloadRype({ payload }: Action, { select, put }: EffectsCommandMap) {
// 			const signUp: IsignUpState = yield select(({ signUp }: Store) => signUp) // yield会导致any
// 			yield console.log('asdfasfda', signUp.time)
// 			yield put({ type: 'asdf', payload: {} })
// 		},
// 	},
// 	reducers: {
// 		updateState(state: IsignUpState, action: Action) {},
// 	},
// }

export default signUp
