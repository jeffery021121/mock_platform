const isFunction = <T extends (e: any) => any>(value: any): value is T =>
	typeof value === 'function'

  export default isFunction