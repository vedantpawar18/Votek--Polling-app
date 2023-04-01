import {
  ADD_TEMPLATE_DATA_FAILURE,
  ADD_TEMPLATE_DATA_REQUEST,
  ADD_TEMPLATE_DATA_SUCCESS,
  POST_POLL_DATA_FAILURE,
  POST_POLL_DATA_REQUEST,
  POST_POLL_DATA_SUCCESS,
} from "./action";

const initState = {
  isError: false,
  isLoading: false,
  data: [],
};

export const dataReducer = (state = initState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_POLL_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case POST_POLL_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case ADD_TEMPLATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ADD_TEMPLATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case ADD_TEMPLATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    default:
      return {
        ...state,
      };
  }
};
