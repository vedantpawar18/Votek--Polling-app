import axios from "axios";


export const POST_POLL_DATA_REQUEST = "POST_POLL_DATA_REQUEST";
export const POST_POLL_DATA_SUCCESS = "POST_POLL_DATA_SUCCESS";
export const POST_POLL_DATA_FAILURE = "POST_POLL_DATA_FAILURE";

export const ADD_TEMPLATE_DATA_REQUEST = "ADD_TEMPLATE_DATA_REQUEST";
export const ADD_TEMPLATE_DATA_SUCCESS = "ADD_TEMPLATE_DATA_SUCCESS";
export const ADD_TEMPLATE_DATA_FAILURE = "ADD_TEMPLATE_DATA_FAILURE";



export const postPollDataRequest = ()=>{
    return({
        type:POST_POLL_DATA_REQUEST
    })
}


export const postPollDataSuccess = (data)=>{
    return({
        type:POST_POLL_DATA_SUCCESS,
        payload:data
    })
}


export const postPollDataFailure = ()=>{
    return({
        type:ADD_TEMPLATE_DATA_FAILURE
    })
}

export const addTemplateDataRequest = ()=>{
    return({
        type:ADD_TEMPLATE_DATA_REQUEST
    })
}


export const addTemplateDataSuccess = (data)=>{
    return({
        type:ADD_TEMPLATE_DATA_SUCCESS,
        payload:data
    })
}


export const addTemplateDataFailure = ()=>{
    return({
        type:ADD_TEMPLATE_DATA_FAILURE
    })
}



export const postPollData = (data,token)=>(dispatch)=>{
   
dispatch(postPollDataRequest())
    return axios({
        method:"POST",
        url:"http://localhost:8080/firebase/create-poll",
        headers:{
          'Authorization' : `Bearer ${token}`
        },
        data
    })
    .then((res)=>{
        // console.log("data res",res.data)
        dispatch(postPollDataRequest(res.data));
    })
    .catch((error)=>{
     dispatch(postPollDataFailure(error))
    })
} 




export const addTemplateData = (data,token)=>(dispatch)=>{
    // console.log("receive data",data,token)
dispatch(addTemplateDataRequest())
    return axios({
        method:"POST",
        url:"http://localhost:8080/firebase/create-poll",
        headers:{
          'Authorization' : `Bearer ${token}`
        },
        data
    })
    .then((res)=>{
        // console.log("res",res.data)
        dispatch(addTemplateDataRequest(res.data));
    })
    .catch((error)=>{
     dispatch(addTemplateDataFailure(error))
    })
} 