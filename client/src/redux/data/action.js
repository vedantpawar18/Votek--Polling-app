import axios from "axios";


export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_FAILURE";





export const getDataRequest = ()=>{
    return({
        type:GET_DATA_REQUEST
    })
}


export const getDataSuccess = (data)=>{
    return({
        type:GET_DATA_SUCCESS,
        payload:data
    })
}


export const getDataFailure = ()=>{
    return({
        type:GET_DATA_FAILURE
    })
}





export const getData = ()=>(dispatch)=>{
dispatch(getDataRequest())
    return axios({
        method:"GET",
        url:""
    })
    .then((res)=>{
        dispatch(getDataRequest(res.data))
    })
    .catch((error)=>{
     dispatch(getDataFailure(error))
    })
} 


