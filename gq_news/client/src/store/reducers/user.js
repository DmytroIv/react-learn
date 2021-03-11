function user(state = {}, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        ...action.payload
      }
    case 'LOGIN_USER':
      return {
        ...state,
        ...action.payload
      }
    case 'AUTOSIGNIN_USER':
      return {
        ...state,
        ...action.payload
      }
    case 'LOGOUT_USER':
      return {
        auth: action.payload
      }
    case 'UPDATE_USER_EMAIL_PASS':
      return {
        ...state,
        ...action.payload
      }
    case 'GET_USER_STATS':
      return {
        ...state,
        ...action.payload
      }
    case 'CREATE_POST':
      return {
        ...state,
        ...action.payload
      }
    case 'CLEAR_CREATE_POST':
      return {
        ...state,
        ...action.payload
      }
    case 'GET_USER_POSTS':
      return {
        ...state,
        ...action.payload
      }
    case 'UPDATE_POST_STATUS':
      return {
        ...state,
        ...action.payload
      }
    case 'DELETE_POST':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default user;