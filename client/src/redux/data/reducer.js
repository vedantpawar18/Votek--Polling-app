import {
  ADD_TEMPLATE_DATA_FAILURE,
  ADD_TEMPLATE_DATA_REQUEST,
  ADD_TEMPLATE_DATA_SUCCESS,
  ENDED_POLL_FAILURE,
  ENDED_POLL_REQUEST,
  ENDED_POLL_SUCCESS,
  GET_ALL_DATA_FAILURE,
  GET_ALL_DATA_REQUEST,
  GET_ALL_DATA_SUCCESS,
  GET_LIVE_DATA_FAILURE,
  GET_LIVE_DATA_REQUEST,
  GET_LIVE_DATA_SUCCESS,
  GET_TEMPLATE_BY_ID_DATA_FAILURE,
  GET_TEMPLATE_BY_ID_DATA_REQUEST,
  GET_TEMPLATE_BY_ID_DATA_SUCCESS,
  GET_TEMPLATE_DATA_FAILURE,
  GET_TEMPLATE_DATA_REQUEST,
  GET_TEMPLATE_DATA_SUCCESS,
  POST_POLL_DATA_FAILURE,
  POST_POLL_DATA_REQUEST,
  POST_POLL_DATA_SUCCESS,
  STOP_POLL_FAILURE,
  STOP_POLL_REQUEST,
  STOP_POLL_SUCCESS,
  USER_VOTED_FAILURE,
  USER_VOTED_REQUEST,
  USER_VOTED_SUCCESS,
} from "./action";

const initState = {
  isError: false,
  isLoading: false,
  data: [],
  liveData: [],
  dataDetails: [],
  ended: [],
  userVoted:[],
  adminDownload:[]
};

export const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_POLL_DATA_REQUEST:
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
      };
    case ADD_TEMPLATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case GET_TEMPLATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_TEMPLATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_TEMPLATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case GET_TEMPLATE_BY_ID_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_TEMPLATE_BY_ID_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataDetails: action.payload,
      };
    case GET_TEMPLATE_BY_ID_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case GET_ALL_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_ALL_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_ALL_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case STOP_POLL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STOP_POLL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case STOP_POLL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
      case USER_VOTED_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case USER_VOTED_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          userVoted: action.payload,
        };
      case USER_VOTED_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: false,
        };
    case GET_LIVE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_LIVE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        liveData: action.payload,
      };
    case GET_LIVE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case ENDED_POLL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ENDED_POLL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        ended: action.payload,
      };
    case ENDED_POLL_FAILURE:
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