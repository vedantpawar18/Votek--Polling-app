import axios from "axios";


export const SIGNIN_AUTH_REQUEST = "SIGNIN_AUTH_REQUEST";
export const SIGNIN_AUTH_SUCCESS = "SIGNIN_AUTH_SUCCESS";
export const SIGNIN_AUTH_FAILURE = "SIGNIN_AUTH_FAILURE";


export const SIGNUP_AUTH_REQUEST = "SIGNUP_AUTH_REQUEST";
export const SIGNUP_AUTH_SUCCESS = "SIGNUP_AUTH_SUCCESS";
export const SIGNUP_AUTH_FAILURE = "SIGNUP_AUTH_FAILURE";



export const signInAuthRequest = ()=>{
    return({
        type:SIGNIN_AUTH_REQUEST
    })
}


export const signInAuthSuccess = (auth)=>{
    return({
        type:SIGNIN_AUTH_SUCCESS,
        payload:auth
    })
}


export const signInAuthFailure = (err)=>{
    return({
        type:SIGNIN_AUTH_FAILURE,
        payload:err
    })
}

export const signUpRequest = ()=>{
    return({
        type:SIGNUP_AUTH_REQUEST
    })
}


export const signUpSuccess = (auth)=>{
    return({
        type:SIGNUP_AUTH_SUCCESS,
        payload:auth
    })
}


export const signUpFailure = (err)=>{
    return({
        type:SIGNUP_AUTH_FAILURE,
        payload:err
    })
}


export const signInAuth = (data)=>(dispatch)=>{
    
dispatch(signInAuthRequest())
    return axios({
        method:"POST",
        url:"https://votek-backend-production.up.railway.app/auth/signin",
        data
    })
    .then((res)=>{
       
        dispatch(signInAuthSuccess(res.data))
         
        if(res.data.role!=="admin"){
            localStorage.setItem("userToken",res.data.token.primaryToken);
            localStorage.setItem("userName",res.data.fullName);
            localStorage.setItem("userEmail",res.data.email);
        }else{
            localStorage.setItem("adminToken",res.data.token.primaryToken);
            localStorage.setItem("userName","Admin");
            localStorage.setItem("adminEmail",res.data.email);
        }
        
    })
    .catch((error)=>{
   
     dispatch(signInAuthFailure(error))
     
    })
} 



export const signUp = (data)=>(dispatch)=>{
    dispatch(signUpRequest())
        return axios({
            method:"POST",
            url:"https://votek-backend-production.up.railway.app/user/signup",
            data
        })
        .then((res)=>{
            
            dispatch(signUpSuccess(res.data));
          
            localStorage.setItem("userToken",res.data.token.primaryToken);
            localStorage.setItem("userName",res.data.fullName);
            localStorage.setItem("userEmail",res.data.email);
        })
        .catch((error)=>{
         dispatch(signUpFailure(error))
        })
    } 

