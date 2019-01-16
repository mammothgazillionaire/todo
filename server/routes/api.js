const express = require('express');
const router = express.Router();
const user = require('../Controllers/user.controller');
const todo = require('../Controllers/todo.controller');
const auth = require('../modules/auth');

router.post('/signup', user.signup);

// custom authenticate.
router.post('/login', user.login);

router.post('/todo', auth.isLoggedIn , todo.new);  

router.get('/user/:id/todos', auth.isLoggedIn , todo.getTodos);

router.delete('/todo/:id/delete', todo.deleteTodos);

router.get('/whoami', auth.isLoggedIn, user.whoami );

router.get('/logout', user.logout);

module.exports = router;