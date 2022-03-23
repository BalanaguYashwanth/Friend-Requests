import axios from "axios"
import { user_pending_error, user_pending_request, user_pending_success } from "./actions"

function userPendingDetails(){
    return(dispatch)=>{
        dispatch(user_pending_request())
        axios.get('http://localhost:9000/get/useremptydetails')
        .then(res=>dispatch(user_pending_success(res.data)))
        .catch(err=>dispatch(user_pending_error(err)))
    }
}

export {userPendingDetails}