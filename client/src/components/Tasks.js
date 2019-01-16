import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTodos, deleteTodo } from '../action/action';
import { Link } from 'react-router-dom';


class Tasks extends Component {

 
  componentDidMount(){
  this.props.dispatch(getTodos(this.props.userId));    
  }

  handleClick = (e) => {
    this.props.dispatch(deleteTodo(e.target.id));
  }

  render() {
    const { userData } = this.props;
    console.log(userData);

    return (
      <div className="container tasks">
        {
          userData.map(d => 
            <div className="todo__items">
            <span className="todo__title">{d.title}</span>
            <button className="btn--del" onClick={this.handleClick} id={d._id}>delete</button>
            </div>
          )
        }  
        {/* <Link to="/todo">back</Link> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId : state.currentUserId,
    userData: state.currentUserData.todos
  }
}

export default connect(mapStateToProps)(Tasks);