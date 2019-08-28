import { Application } from 'egg'

export default (app: Application) => {
	const { controller, router } = app
  // const routewarp = 
	router.get('/needgzip', app.middleware.routewarp, controller.home.index)
	router.get('/', controller.home.index)
}
