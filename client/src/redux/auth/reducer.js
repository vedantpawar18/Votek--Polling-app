import { SIGNIN_AUTH_FAILURE, SIGNIN_AUTH_REQUEST, SIGNIN_AUTH_SUCCESS, SIGNUP_AUTH_FAILURE, SIGNUP_AUTH_REQUEST, SIGNUP_AUTH_SUCCESS } from "./action"




const initState = {
    isError:false,
    isLoading:false,
    auth:[],
    error:[]
}



export const authReducer = (state=initState, action)=>{
switch(action.type){
    case SIGNIN_AUTH_REQUEST:
        return({
            ...state,

            isLoading:true,
            isError:false
        })
        case SIGNIN_AUTH_SUCCESS:
            return({
                ...state,
                isLoading:false,
                isError:false,
                auth:action.payload
            })
            case SIGNIN_AUTH_FAILURE:
                return({
                    ...state,
                    isLoading:false,
                    isError:false,
                    error:action.payload
                })
                case SIGNUP_AUTH_REQUEST:
                    return ({
                        ...state,
                        isLoading: true,
                        isError: false
                       
                    })
        
                case SIGNUP_AUTH_SUCCESS:
                    return ({
                        ...state,
                        isLoading: false,
                        isError: false,
                        auth:action.payload
                    })
        
                case SIGNUP_AUTH_FAILURE:
                    return ({
                        ...state,
                        isLoading: false,
                        isError: true,
                        error:action.payload
                    })
      default:
        return({
            ...state
        })

}
}