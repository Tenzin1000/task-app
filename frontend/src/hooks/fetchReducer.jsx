export const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        data: [],
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: true,
        data: [],
      };
    default:
      return state;
  }
};
