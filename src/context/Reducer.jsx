const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        token: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
        token: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
