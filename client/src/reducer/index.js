const initState = {
  currentUserData: {},
  currentUserId : ""
};

function rootReducer(state = initState,action) {
  switch(action.type){
    case "SIGNUP_SUCCESS": {
      return state;
    }
    case "LOGIN_SUCCESS": {
      const user = {
        userInfo: action.data.user,
        todos: []
      }
      return {
        currentUserData: user,
        currentUserId: action.data.user._id
      }
    }
    case "ALL_TODOS": {
      return {
        ...state,
          currentUserData : {
            ...state.currentUserData,
            todos: action.data.data
          }
      }
    } case "LOGOUT": {
      return {
        currentUserData : {},
        currentUserId : ''
      }
    }
    default: 
    return state;
  }
}

export default rootReducer;