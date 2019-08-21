import { IsignUpState } from '@/pages/SignUp/model'
import { History, Location } from 'history'

// 全局类型不加I，但是非全局类型都加I
declare global {
	// 可以通过这种方式修改window对象
	// tslint:disable-next-line:interface-name
	interface Window {
		aaa: any
	}
	// tslint:disable-next-line:interface-name
	interface RouteType {
		history: History
		match: Match
		location: Location
	}

	interface Store {
		signUp: IsignUpState
	}

	// interface IModel<Istate> {
	// 	namespace: string
	// 	state: Istate
	// 	subscriptions: {
	// 		[key: string]: (obj: { dispatch: Dispatch; history: History }) => void
	// 	}
	// 	effects: {
	// 		[key: string]: <Ipayload = undefined>(
	// 			action: Action<Ipayload>,
	// 			{
	// 				select,
	// 				put,
	// 			}: {
	// 				select: (cb: (store: Store) => any) => any
	// 				put: <Ipayload = undefined>(action: Action<Ipayload>) => any
	// 			},
	// 		) => any
	// 	}
	// 	reducers: {
	// 		[key: string]: <Ipayload = undefined>(state: Istate, action: Action<Ipayload>) => any
	// 	}
	// }

	interface IModel<Istate> {
		namespace: string
		state: Istate
		subscriptions: {
			setup: (obj: { dispatch: Dispatch; history: History }) => void
		}
		effects: {
			[key: string]: (
				action: Action<any>,
				effects: {
					select: (cb: (store: Store) => any) => any
					put: (action: Action<any>) => any
				},
			) => any
		}
		reducers: {
			// [key: string]: (state: Istate, action: Action<any>) => any
			[key: string]: (state: Istate, action: Action<any>) => any
		}
	}
}
// 讲真的没太看懂
window.aaa = window.aaa || {}
