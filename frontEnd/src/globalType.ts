import { IsignUpActions, IsignUpState } from '@/pages/SignUp/model'
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


	type Actions = IsignUpActions/*  | IasdfsignUpActions*/
	interface IModel<Istate> {
		namespace: string
		state: Istate
		subscriptions: {
			setup: (obj: { dispatch: Dispatch; history: History }) => void
		}
		effects: {
			[key: string]: (
				action: Actions,
				effects: {
					select: (cb: (store: Store) => any) => any
					put: (action: Actions) => any // 这里的action应该可以直接搞到一个全局维护的action的。
				},
			) => any
		}
		reducers: {
			[key: string]: (state: Istate, action: Actions) => any
		}
	}
}
// 讲真的没太看懂
window.aaa = window.aaa || {}
