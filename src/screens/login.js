import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 

export default function Login(){

    const navigate = useNavigate()
    const [logindata, setLogindata] = useState({email:'',password:''})
    const [feedback, setFeedback] = useState('')

    function submit(){
        //console.log(logindata)
        axios.post('http://localhost:9000/authuser',{
            email:logindata.email,
            password:logindata.password
        })
        .then(res=>{
            localStorage.setItem('user-token',res.data.token)
            localStorage.setItem('user-id',res.data.id)
            setFeedback('success')
            navigate('/')
        })
        .catch(err=>{
            setFeedback('Please try again after sometime')    
            console.log(err.message)
        })
    }


    return(
        <div className="login" >
            <h2 className="my-3"> Login Page</h2>
            <input  type="email" onChange={(e)=>setLogindata({...logindata,email:e.target.value})} className=" my-2" placeholder="Enter your email"/>
            <input type="password" onChange={(e)=>setLogindata({...logindata,password:e.target.value})} className="my-2" placeholder="Enter your password" />
            <button onClick={submit} className="btn btn-secondary" > submit </button>
            {feedback && <p> {feedback} </p>}
        </div>
    )
}