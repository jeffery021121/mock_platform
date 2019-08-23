const stateFactory : <T>( initalClass:new()=> T) => T = (
	initalClass,
) => {
	// 通过工厂函数转换类生成对象为普通对象，immer就可以使用了
	let initalState = new initalClass()
	const state: InitObj = {}
	Object.entries(initalState).map(([k, v]: [string, any]) => {
		state[k] = v
	})
	return (state as any) as typeof initalState // 在这里转一手，强制要求输出的是T类型
}

export default stateFactory

/* 
class IinitalState {
	public time = '时间'
	public toggle = 'tyui'
	public obj = { a: { b: { c: [1, 2, 8] } }, asd: 3456 }
	public treeData = [] // 树数据一般我都是这样写的，其实这样写反而没有了依据
}

const initalState = stateFactory(IinitalState) */
