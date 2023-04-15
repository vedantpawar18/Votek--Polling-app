import axios from "axios";

export const POST_POLL_DATA_REQUEST = "POST_POLL_DATA_REQUEST";
export const POST_POLL_DATA_SUCCESS = "POST_POLL_DATA_SUCCESS";
export const POST_POLL_DATA_FAILURE = "POST_POLL_DATA_FAILURE";

export const ADD_TEMPLATE_DATA_REQUEST = "ADD_TEMPLATE_DATA_REQUEST";
export const ADD_TEMPLATE_DATA_SUCCESS = "ADD_TEMPLATE_DATA_SUCCESS";
export const ADD_TEMPLATE_DATA_FAILURE = "ADD_TEMPLATE_DATA_FAILURE";

export const GET_TEMPLATE_DATA_REQUEST = "GET_TEMPLATE_DATA_REQUEST";
export const GET_TEMPLATE_DATA_SUCCESS = "GET_TEMPLATE_DATA_SUCCESS";
export const GET_TEMPLATE_DATA_FAILURE = "GET_TEMPLATE_DATA_FAILURE";

export const GET_TEMPLATE_BY_ID_DATA_REQUEST = "GET_TEMPLATE_BY_ID_DATA_REQUEST";
export const GET_TEMPLATE_BY_ID_DATA_SUCCESS = "GET_TEMPLATE_BY_ID_DATA_SUCCESS";
export const GET_TEMPLATE_BY_ID_DATA_FAILURE = "GET_TEMPLATE_BY_ID_DATA_FAILURE";

export const GET_ALL_DATA_REQUEST = "GET_ALL_DATA_REQUEST";
export const GET_ALL_DATA_SUCCESS = "GET_ALL_DATA_SUCCESS";
export const GET_ALL_DATA_FAILURE = "GET_ALL_DATA_FAILURE";

export const GET_LIVE_DATA_REQUEST = "GET_LIVE_DATA_REQUEST";
export const GET_LIVE_DATA_SUCCESS = "GET_LIVE_DATA_SUCCESS";
export const GET_LIVE_DATA_FAILURE = "GET_LIVE_DATA_FAILURE";

export const STOP_POLL_REQUEST = "STOP_POLL_REQUEST";
export const STOP_POLL_SUCCESS = "STOP_POLL_SUCCESS";
export const STOP_POLL_FAILURE = "STOP_POLL_FAILURE";

export const ENDED_POLL_REQUEST = "ENDED_POLL_REQUEST";
export const ENDED_POLL_SUCCESS = "ENDED_POLL_SUCCESS";
export const ENDED_POLL_FAILURE = "ENDED_POLL_FAILURE";

export const USER_VOTED_REQUEST = "USER_VOTED_REQUEST";
export const USER_VOTED_SUCCESS = "USER_VOTED_SUCCESS";
export const USER_VOTED_FAILURE = "USER_VOTED_FAILURE";




export const postPollDataRequest = ()=>{
    return({
        type:POST_POLL_DATA_REQUEST
    })
}


export const postPollDataSuccess = ()=>{
    return({
        type:POST_POLL_DATA_SUCCESS,
     
    })
}


export const postPollDataFailure = ()=>{
    return({
        type:POST_POLL_DATA_FAILURE
    })
}

export const addTemplateDataRequest = ()=>{
    return({
        type:ADD_TEMPLATE_DATA_REQUEST
    })
}


export const addTemplateDataSuccess = ()=>{
    return({
        type:ADD_TEMPLATE_DATA_SUCCESS
       
    })
}


export const addTemplateDataFailure = ()=>{
    return({
        type:ADD_TEMPLATE_DATA_FAILURE
    })
}



export const getTemplateDataRequest = ()=>{
    return({
        type:GET_TEMPLATE_DATA_REQUEST
    })
}


export const getTemplateDataSuccess = (data)=>{
    return({
        type:GET_TEMPLATE_DATA_SUCCESS,
        payload:data
    })
}


export const getTemplateDataFailure = ()=>{
    return({
        type:GET_TEMPLATE_DATA_FAILURE
    })
}



export const getTemplateByIdDataRequest = ()=>{
    return({
        type:GET_TEMPLATE_BY_ID_DATA_REQUEST
    })
}


export const getTemplateByIdDataSuccess = (data)=>{
    return({
        type:GET_TEMPLATE_BY_ID_DATA_SUCCESS,
        payload:data
    })
}


export const getTemplateByIdDataFailure = ()=>{
    return({
        type:GET_TEMPLATE_BY_ID_DATA_FAILURE
    })
}





export const getAllDataRequest = ()=>{
    return({
        type:GET_ALL_DATA_REQUEST
    })
}


export const getAllDataSuccess = (data)=>{
    return({
        type:GET_ALL_DATA_SUCCESS,
        payload:data
    })
}


export const getAllDataFailure = ()=>{
    return({
        type:GET_ALL_DATA_FAILURE
    })
}



export const getLiveDataRequest = ()=>{
    return({
        type:GET_LIVE_DATA_REQUEST
    })
}


export const getLiveDataSuccess = (data)=>{
    return({
        type:GET_LIVE_DATA_SUCCESS,
        payload:data
    })
}


export const getLiveDataFailure = ()=>{
    return({
        type:GET_LIVE_DATA_FAILURE
    })
}



export const stopPollRequest = ()=>{
    return({
        type:STOP_POLL_REQUEST
    })
}


export const stopPollSuccess = (data)=>{
    return({
        type:STOP_POLL_SUCCESS,
        payload:data
    })
}


export const stopPollFailure = ()=>{
    return({
        type:STOP_POLL_FAILURE
    })
}



export const endedPollRequest = ()=>{
    return({
        type:ENDED_POLL_REQUEST
    })
}


export const endedPollSuccess = (data)=>{
    return({
        type:ENDED_POLL_SUCCESS,
        payload:data
    })
}


export const endedPollFailure = ()=>{
    return({
        type:ENDED_POLL_FAILURE
    })
}



export const userVotedRequest = ()=>{
    return({
        type:USER_VOTED_REQUEST
    })
}


export const userVotedSuccess = (data)=>{
    return({
        type:USER_VOTED_SUCCESS,
        payload:data
    })
}


export const userVotedFailure = ()=>{
    return({
        type:USER_VOTED_FAILURE
    })
}






export const postPollData = (data,token)=>(dispatch)=>{
  
dispatch(postPollDataRequest())
    return axios({
        method:"POST",
        url:"https://votek-backend-production.up.railway.app/firebase/create-poll",
        headers:{
          'Authorization' : `Bearer ${token}`
        },
        data
    })
    .then((res)=>{
   
        dispatch(postPollDataRequest());
    })
    .catch((error)=>{
     dispatch(postPollDataFailure(error))
    })
} 




export const addTemplateData = (data,token)=>(dispatch)=>{
    
dispatch(addTemplateDataRequest())
    return axios({
        method:"POST",
        url:"https://votek-backend-production.up.railway.app/template/save-template",
        headers:{
          'Authorization' : `Bearer ${token}`
        },
        data
    })
    .then((res)=>{

        dispatch(addTemplateDataSuccess());
    })
    .catch((error)=>{
     dispatch(addTemplateDataFailure(error))
    })
} 






export const getTemplateData = (token)=>(dispatch)=>{
    
dispatch(getTemplateDataRequest())
    return axios({
        method:"GET",
        url:"https://votek-backend-production.up.railway.app/user/user-details",
        headers:{
          'Authorization' : `Bearer ${token}`
        }
    })
    .then((res)=>{
      
        dispatch(getTemplateDataSuccess(res.data));
    })
    .catch((error)=>{
     dispatch(getTemplateDataFailure(error))
    })
} 




export const getTemplateByIdData = (id,token)=>(dispatch)=>{
    
dispatch(getTemplateByIdDataRequest())
    return axios({
        method:"GET",
        url:`https://votek-backend-production.up.railway.app/template/get-template/${id}`,
        headers:{
          'Authorization' : `Bearer ${token}`
        }
    })
    .then((res)=>{
       
        dispatch(getTemplateByIdDataSuccess(res.data));
    })
    .catch((error)=>{
     dispatch(getTemplateByIdDataFailure(error))
    })
} 





export const getAllData = (token)=>(dispatch)=>{
   
dispatch(getAllDataRequest())
    return axios({
        method:"GET",
        url:"https://votek-backend-production.up.railway.app/user/user-details",
        headers:{
          'Authorization' : `Bearer ${token}`
        }
    })
    .then((res)=>{
  
        dispatch(getAllDataSuccess(res.data));
    })
    .catch((error)=>{
     dispatch(getAllDataFailure(error))
    })
} 

export const getLiveData = (token)=>(dispatch)=>{
    dispatch(getLiveDataRequest())
        return axios({
            method:"GET",
            url:"https://votek-backend-production.up.railway.app/firebase/live-polls",
            headers:{
              'Authorization' : `Bearer ${token}`
            }
        })
        .then((res)=>{
        
            dispatch(getLiveDataSuccess(res.data));
            
        })
        .catch((error)=>{
         dispatch(getLiveDataFailure(error))
        })
    } 






    export const stopPoll = (data,token)=>(dispatch)=>{
        dispatch(stopPollRequest())
            return axios({
                method:"POST",
                url:"https://votek-backend-production.up.railway.app/poll/save-poll",
                headers:{
                  'Authorization' : `Bearer ${token}`
                },
                data
            })
            .then((res)=>{
         
                dispatch(stopPollSuccess());
            })
            .catch((error)=>{
             dispatch(stopPollFailure(error))
            })
        } 
        
        
    export const endedPoll = (token)=>(dispatch)=>{
        dispatch(endedPollRequest())
            return axios({
                method:"GET",
                url:"https://votek-backend-production.up.railway.app/poll/ended-polls",
                headers:{
                  'Authorization' : `Bearer ${token}`
                }
            
            })
            .then((res)=>{
           
                dispatch(endedPollSuccess(res.data));
            })
            .catch((error)=>{
             dispatch(endedPollFailure(error))
            })
        } 

        export const userVotedData = (data,token)=>(dispatch)=>{

            dispatch(userVotedRequest())
                return axios({
                    method:"POST",
                    url:"https://votek-backend-production.up.railway.app/poll/polls/votedBy",
                    headers:{
                      'Authorization' : `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    },
                    data:JSON.stringify(data)
                })
                .then((res)=>{
                   dispatch(userVotedSuccess(res.data));
                })
                .catch((error)=>{
                 dispatch(userVotedFailure(error))
                })
            } 



         