const Todo = require('../Models/Todo');
const User = require('../Models/User');

module.exports = {
  new : (req,res) => {
      // console.log(req.body);
      const todo = new Todo(req.body);
      const userId = req.body.userId;
      // console.log(userId);
      // console.log(req.body , 'debug 1');
        todo.save((err,data)=> {
          if(err){
            res.json({
              msg : "Error"
            })
          }else{
            res.json({data});
          }
          // console.log(data);
        })
  },

  getTodos : (req,res) => {
    const id = req.params.id;
    // console.log(id ,"get todos");
    User.find({_id : id}, (err,user) => {
      if(!user){
        res.status(400).send({msg : "user not found"});
      }else{
        Todo.find({userId : id }, (err,allTodos) =>{
          if(err){
            res.status(400).send({msg : "no todos"});
          }else{
            res.json({data : allTodos});
          }
        })
      }
    })
  },

  deleteTodos : (req,res) => {
    const id = req.params.id;
    console.log(id ,"delete todos");
    Todo.remove({_id : id}, (err,deleteTodo) => {
      if(err) throw err;
      else{
        Todo.find({userId : req.user._id}, (err,data) => {
          if(err) throw err;
          res.json({data});
        })
      }
    })
  }
}