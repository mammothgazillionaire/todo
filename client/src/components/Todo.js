import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postTodo } from '../action/action';
import { Redirect, Link } from 'react-router-dom';


class Todo extends Component {

  constructor(props){
    super(props);
    this.state= {
      title : "",
      done: false,
      description: "",
      userId: this.props.userId
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(postTodo(this.state));
    this.props.history.push(`/user/${this.props.userId}/todos`);
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    if(this.props.userId){
      return (
        <div className="container">
          <h1 className="heading">Add Todos</h1>
          <form className="Todo" onSubmit={this.handleSubmit}>
            <input className="form todo--title" type="text" name="title" onChange={this.handleChange} placeholder="title" required/><br/><br/>
            <input className="form todo--description" type="text" name="description" onChange={this.handleChange} placeholder="description" required/><br/><br/>
            <button className="form btn" type="submit">Submit</button>
          </form>
        </div>
      )
    }else{
      return <Redirect to="/login"/>
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    userId :  state.currentUserId
  }
}


export default connect(mapStateToProps)(Todo)