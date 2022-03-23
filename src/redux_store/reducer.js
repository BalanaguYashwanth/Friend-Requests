import {USER_PENDING_REQUEST,USER_PENDING_SUCCESS,USER_PENDING_ERROR} from './references.js'

const initalState={
    loading:false,
    data:[],
    error:"",
}

const user_pending_reducer=(state={},action)=>{
    switch(action.type){
        case USER_PENDING_REQUEST:
            return{
                ...state,
                loading:true
            }
        case USER_PENDING_SUCCESS:
            return{
                loading:false,
                data:action.payload,
                error:""
            }
        case USER_PENDING_ERROR:
            return{
                loading:false,
                error:action.payload,
                data:""
            }
        default:
            return state
    }

}   

export {user_pending_reducer}