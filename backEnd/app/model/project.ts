import { Application } from 'egg';

// 每个项目都打算添加一个子路由集合 eg: interface_ibms

module.exports = (app: Application) => {
  const { mongoose, mongoose: { Schema } } = app
  const { ObjectId } = Schema.Types
  const projectSchema = new Schema({
    key: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    describe: {
      type: String,
      required: true,
    },
    user: {
      master: [ObjectId],
      developer: [ObjectId],
      reader: [ObjectId],
    },
    create_time: Date,
    update_time: Date,
    interface_count: Number,
  })
  return mongoose.model('project', projectSchema)
}