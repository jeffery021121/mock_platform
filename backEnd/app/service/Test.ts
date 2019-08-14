import { Service } from "egg";

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    // const post = { passWord: '123456', eMaile: 'asdfe@qq.com' }
    // this.ctx.model.User.create(post, (err: Error, doc: typeof post) => {
    //   if (err) return console.log('数据库插入错误', err)
    //   console.log('插入返回的文档：', doc)
    // })
    // //----------------------------------------------    collectiongName = key.interfaces
    // if (!this.app.mongoose.models['interface.ibms']) {
    //   console.log('this.ctx.model::::::::::::::', this.ctx.model)
    //   const { mongoose, mongoose: { Schema } } = this.app
    //   const projectSchema = new Schema({
    //     key: String
    //   })
    //   await mongoose.model('interface.ibms', projectSchema)
    //   const post = { key: 'yoa啊' }
    //   this.app.mongoose.models['interface.ibms'].create(post, (err: Error, doc: typeof post) => {
    //     if (err) return console.log('数据库插入错误', err)
    //     console.log('插入返回的文档：', doc)
    //   })
    //   console.log('我要的查看：', this.app.mongoose.models) //能够

    // } else {
    //   const post = { key: 'ibms' }
    //   this.app.mongoose.models['interface.ibms'].create(post, (err: Error, doc: typeof post) => {
    //     if (err) return console.log('数据库插入错误', err)
    //     console.log('插入返回的文档：', doc)
    //   })
    // }

    return `hi, ${name}`;
  }
}
