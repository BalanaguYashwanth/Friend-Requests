import axios from "axios"
import { useState,useEffect } from "react"
import {Card, Button, Row, Col} from 'react-bootstrap'
import Dashboard from "./dashboard"
import { useSelector,useDispatch } from 'react-redux';
import { userPendingDetails } from "../redux_store/thunk";

export default function Findfriends(){

    const dispatch = useDispatch()
    const [frienddatas, setFriendDatas] = useState('')
    const [userdetails, setUserdetails] = useState('')
    const [buttontext, setButtontext] = useState([]) 
    const [name, setName] = useState('')
    //const {loading, data, error} =  useSelector(state=>state.user_pending)
    const [userid, setUserid] = useState('')

    useEffect(() =>{

        axios.get('https://userrequestsapp.herokuapp.com/get/usersdetailsbyid/'+localStorage.getItem('user-id'))
        .then(res=>{
            setUserid(res.data[0].userid)
            setName(res.data[0].name)})
        .catch(err=>console.log(err))


        axios.post('https://userrequestsapp.herokuapp.com/get/useremptydetails',{
            userid:localStorage.getItem("user-id")
        })
        .then(res=>{
            const userdatas = res.data.filter((data)=>data.userid == localStorage.getItem('user-id'))
            console.log(userdetails)
            setUserdetails(userdatas)
            const datas = res.data.filter((data)=>data.userid != localStorage.getItem('user-id'))
            setFriendDatas(datas)
            console.log('datas',datas)
        })
        .catch(err=>console.log(err))
    },[])

    function submit(id)
    {
        axios.put('https://userrequestsapp.herokuapp.com/get/pendinguserdetails',{
            userid:id,
            request_friends:{userid:userid,name:name,status:'pending'}
        })
        .then(res=>{
            //dispatch(userPendingDetails())
            window.location.reload()
            console.log(res.data)
            
        })
        .catch(err=>console.log(err))
    }


    return(
       <div style={{color:'white'}}> 
       <mark style={{backgroundColor:'yellow'}}> Find Friends </mark>
       <Row>
        
         {
            frienddatas && frienddatas.map((data,index)=>(
                <Col key={index}>
                    <Card  className="p-2 my-3" style={{ width: '18rem', margin:'0 auto' ,color:'black', textAlign:'left',  }}>
                        <Card.Title>  {data.name} </Card.Title>
                        <Card.Text> My details - {data.age} | {data.gender} | {data.bio}</Card.Text>
                      
                       <Button onClick={()=>submit(data.userid)} >  Add Friend </Button>
                    </Card>
                </Col>
            ))
         }
         {frienddatas && frienddatas.length == 0 && <h2> please register few more users to display under find friends </h2> }
         </Row>
       </div>
    )
}

