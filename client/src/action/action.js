const url = "http://localhost:8080/api";

export function loginAction(data){
  console.log(data);
  return dispatch => {
    fetch(`${url}/login`,{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        if(data){
          dispatch({
            type: "LOGIN_SUCCESS",
            data
          })   
        }else{
          dispatch({
            type: "LOGIN_NOTSUCCESSFUL",
            data
          })
        }
    }); 
  } 
}

export function signupAction(data) {
  return dispatch => {
    fetch(`${url}/signup`,{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify( data )
    })
    .then(res => res.json())
    .then(data => {
      dispatch({type: "SIGNUP_SUCCESS", data})
  })
}
}

export function postTodo(data) {
  console.log(data);
  return dispatch => {
    fetch(`${url}/todo`,{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(d => console.log(d));
  }
}

export function getTodos(id){
  return dispatch => {
      fetch(`${url}/user/${id}/todos`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "ALL_TODOS",
          data
        })
      });
    }
}


export function deleteTodo(id){
  console.log(id);
  return dispatch => {
    fetch(`${url}/todo/${id}/delete`,{
      method: "DELETE",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({id})
    })
    .then(res => res.json())
    .then( data => {
      dispatch({
        type: "ALL_TODOS",
        data
      })
    })
  }
}

export function isLoggedIn(cb){
  return () => {
    fetch(`${url}/whoami`)
    .then((res) => {
      if(res.status == 200){
        res.json()
        .then(data => cb(data));
      }
    })
  }
}

export function logout(){
  return dispatch => {
    fetch(`${url}/logout`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: "LOGOUT",
        data
      })
    })
  }
}