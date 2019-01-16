import React, { Component } from 'react'
import { loginAction, isLoggedIn } from '../action/action';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom";
// import queryString from "query-string";

class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username : "",
      password: ""
    }
  }

  // componentWillMount() {
  //   var query = queryString.parse(this.props.location.search);
  //   if (query.token) {
  //     window.localStorage.setItem("jwt", query.token);
  //     this.props.history.push("/todo");
  //    }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(loginAction(this.state));
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }
  
  render() {
    const { userId } = this.props;
    if(userId) {
      return <Redirect to="/todo" />
    } else {
      return (
        <div className="container">
            <div>{this.state.errorMsg}</div>
            <form className="login" onSubmit={this.handleSubmit}>
              <input className="form username" type="text" name="username" onChange={this.handleChange} placeholder="username" required/><br/><br/>
              <input className="form password" type="password" name="password" onChange={this.handleChange} placeholder="password" required/><br/><br/>
              <button className="form btn" type="submit">Submit</button>
            </form>
            <a className="google" href="/auth/google">g<span>+</span></a>
        </div>
      )
    }
    
  }
}

const mapStateToProps = (state) => {
    return {
      userId :  state.currentUserId
    }
}

export default connect(mapStateToProps)(Login);