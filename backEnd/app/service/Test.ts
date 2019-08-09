import { Service } from 'egg';

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
    return `hi, ${name}`;
  }
}
