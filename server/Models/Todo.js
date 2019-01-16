const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new mongoose.Schema({
  title : String,
  done: Boolean,
  description: String,
  userId: {
    type: ObjectId,
    ref: 'User'
  }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
