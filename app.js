const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const port = 8080;

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true },  function(err, connection) {
  if(err) throw err
  else console.log('Connected to mongodb');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "todo secret",
  resave : true,
  saveUninitialized: true,
  cookie : {
    maxAge : 9000000000
  },
  store : new MongoStore({url : "mongodb://localhost/todo-session"})
}))

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');


if(process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware')
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}


app.use(passport.initialize());

app.use(passport.session());


require('./server/modules/passport')(passport);
app.use(cors());

app.use( '/api',require('./server/routes/api'));
app.use(require('./server/routes/routes'));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})