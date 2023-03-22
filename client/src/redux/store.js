import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { dataReducer } from "./data/reducer";

const root = combineReducers({
    data:dataReducer,
    auth:authReducer
})




export const store = legacy_createStore(
    root,
    applyMiddleware(thunk)
)