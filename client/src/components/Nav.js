import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../action/action';
import { connect } from 'react-redux';

 class Nav extends Component {
 

  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
  }
  
  render() {
    const { userData } = this.props;
    console.log(userData);
if(userData) {
  return(
    <div className="nav"> 
    <Link className="link" to={`user/${this.props.userId}/todos`}>all todos</Link>
    <button onClick={this.handleLogout}>logout</button>
  </div>
  )
} else {
  return(
    <div className="nav">
    <Link className="nav-link" to="/login">Login</Link>
    <Link className="nav-link" to="/">Signup</Link>
    </div>
  )
}

 }
}

const mapStateToProps = (state) => {
  return {
    userId :  state.currentUserId,
    userData: state.currentUserData.userInfo
  }
}

export default connect(mapStateToProps)(Nav);