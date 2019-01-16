import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import Login from './Login';
import { signupAction } from '../action/action';
import { connect } from 'react-redux';


class Signup extends Component {
  
  constructor(props){
    super(props);
    this.state= {
      fullname : '',
      email : '',
      username : '',
      password : '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(signupAction(this.state));
    this.props.history.push(`/login`);
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    const { userId } = this.props;
      if(userId) {return <Redirect to="/todo"/>}
      else {
        return (
          <div className="container">
            {/* <h2 className="heading">Signup</h2> */}
            <div>{this.state.errorMsg}</div>
             <form className="Signup" onSubmit={this.handleSubmit}>
              <input className="form fullname" type="text" onChange={this.handleChange} name="fullname" placeholder="name" required/>
              <input className="form username" type="text" name="username" onChange={this.handleChange} placeholder="username" required/>
              <input className="form email" type="email" name="email" onChange={this.handleChange} placeholder="email" required/>
              <input className="form password" type="password" name="password" onChange={this.handleChange} placeholder="password" required/>
              <button className="form btn" type="submit">Submit</button>
            </form>
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




export default connect(mapStateToProps)(Signup)