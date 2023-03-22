import axios from "axios";


export const GET_AUTH_REQUEST = "GET_AUTH_REQUEST";
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS";
export const GET_AUTH_FAILURE = "GET_AUTH_FAILURE";



export const getAuthRequest = ()=>{
    return({
        type:GET_AUTH_REQUEST
    })
}


export const getAuthSuccess = (auth)=>{
    return({
        type:GET_AUTH_SUCCESS,
        payload:auth
    })
}


export const getAuthFailure = ()=>{
    return({
        type:GET_AUTH_FAILURE
    })
}



export const getAuth = ()=>(dispatch)=>{
dispatch(getAuthRequest())
    return axios({
        method:"POST",
        url:""
    })
    .then((res)=>{
        dispatch(getAuthRequest(res.data))
    })
    .catch((error)=>{
     dispatch(getAuthFailure(error))
    })
} 


