import React, { Component } from 'react';
import Signup from './components/Signup';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import Login from './components/Login';
import Todo from './components/Todo';
import Tasks from './components/Tasks';
import { connect } from 'react-redux';
import { isLoggedIn } from './action/action';
import Nav from './components/Nav';

class App extends Component {
  
  componentWillMount() {
    console.log('check 1');
    this.props.dispatch(isLoggedIn((data) => {
      console.log(data,"check2");
      if(data){
        this.props.dispatch({
          type: "LOGIN_SUCCESS",
          data
        })
      }
    }));
  }
  
  render() {
  
      return (
          <Router>
            <div className="App">
            <Nav/>
            <Switch>
              <Route exact path="/" component={Signup}/>
              <Route exact path="/login" component={Login}/> 
              <Route exact path="/todo" component={Todo}/>
              <Route exact path="/user/:id/todos" component={Tasks}/>
            </Switch>
            </div>
          </Router>
        );
      }
    }


const mapStateToProps = (state) => {
  return {
    userId :  state.currentUserId
  }
}

export default connect(mapStateToProps)(App);
