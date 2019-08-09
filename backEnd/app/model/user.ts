import { Application } from 'egg';

module.exports = (app: Application) => {
  const { mongoose, mongoose: { Schema } } = app
  // 用户名需要唯一，查一下怎么搞，一般字段不写注释，尽量字段就表明意思
  const userSchema = new Schema({
    id: {//这个id其实完全可以当做主键来用了，没有必要再弄一个_id了。或者不用这个，用_id来做主键
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    password_prompt: { // 密码提示
      type: String,
      required: true,
    },
    eMail: {
      type: String,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
      unique: true,
    },
    avater: String, // 用户头像，感觉这个设计就是坑自己了，算是练习上传图片文件吧，额其实这个可以直接转存到海康的那个文件系统中的，这里存url.
    // roles: [String],使用连表查询来做
    token: {
      mobile: String,//部分为安卓和苹果的原因是，不同平台的手机也不能同时登陆一个qq号。通过不同的登陆接口名来判断登陆平台
      web: String
    },
    reg_time: Date,
    last_login_time: Date,
    update_time: Date,
  })
  return mongoose.model('User', userSchema)
}