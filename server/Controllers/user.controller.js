const User = require('../Models/User');
const passport = require('passport');

module.exports = {
  signup : (req,res) => {
    if(req.body.password.length <= 5) {
      return res.status(400).send({ message: 'Password should be longer than 5 chars.'})
    }
    const user = new User(req.body);
    console.log(req.body , 'debug 1');
    User.find({username : req.body.username}, (err,data) => {
      if(err) throw err;
      console.log(data,'debug 2');
      user.save((err,data) => {
        if(err) throw err;
        console.log(data , 'debug 3');
        res.json(data);
      })
    })
  },

  login: (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(400).send({ message : "no such user"}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({user: req.user});
      });
    })(req, res, next);
  },

  whoami: (req, res) => {
    if(req.user){
      User.findOne({_id: req.user._id},(err,data) => {
        if(data){
          res.json({ user: data })
        }else{
          res.status(400).json({msg : " no such user ,please signup"})
        }
      })
    }
  },

  logout : (req, res) => {
    req.session.destroy();
    res.status(200).json({
      msg : "Session is removed"
    })
  }
}

