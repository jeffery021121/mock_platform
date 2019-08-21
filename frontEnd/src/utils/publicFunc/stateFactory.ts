const stateFactory: <T = { [propName: string]: any }>(initalState: T) => T = <T>(
	initalState: T,
): T => {
	// 通过工厂函数转换类生成对象为普通对象，immer就可以使用了
	// let initalState = new initalClass()
	const state: InitObj = {}
	Object.entries(initalState).map(([k, v]: [string, any]) => {
		state[k] = v
	})
	return (state as any) as T // 在这里转一手，强制要求输出的是T类型
}

export default stateFactory