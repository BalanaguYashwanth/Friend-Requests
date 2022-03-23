import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"

export default function FriendRequests(){
    const [requestedFriends, setRequestedFriends] = useState('')
    const [requestdetails, setRequestDetails] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:9000/get/usersdetailsbyid/'+localStorage.getItem('user-id'))
        .then(res=>{
            console.log(res.data)
            setRequestedFriends(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    async function submit(status,id,name){
        if(status == 'accept')
        {
            //console.log('hello',requestedFriends[0].userid,id)
            await axios.put('http://localhost:9000/get/updateuserdetails',{
                userid:requestedFriends[0].userid, //current user id
                friends:{userid:id,name:name},
                request_friends:{userid:id,status:'accepted'},
            })      

            .then(res=>console.log(res))
            .catch(err=>console.log(err.message))
            
        }else{
            //console.log(id)
            await axios.put('http://localhost:9000/get/updateuserdetails',{
                userid:localStorage.getItem('user-id'),
                request_friends:{userid:id,status:'declined'},
            })      
            .then(res=>console.log(res))
            .catch(err=>console.log(err.message))
        }
        window.location.reload()
    }


  
    return(
        <div>
            <mark style={{backgroundColor:'yellow'}}> Friend Requests </mark>
            <Row>
            {
                requestedFriends && requestedFriends[0].request_friends.map((data,index)=>(
                    <Col key={index}>
                        <Card  className="p-2 my-3" style={{ width: '18rem', margin:'0 auto',color:'black', textAlign:'left',  }}>
                            <Card.Title> {data.name}  </Card.Title>
                            {/* <Card.Text> My details - {data.age} | {data.gender} | {data.bio}</Card.Text> */}
                           { requestedFriends && data.status!=='pending' ? ( 
                               <Row>
                               <Button style={{width:'100px'}}  >{data.status} </Button>  
                               </Row>
                           ) : ( <Row>
                            <Button style={{width:'100px'}} onClick={()=>submit('accept',data.userid,data.name)} > Accept  </Button>  
                            <Button style={{width:'100px'}} onClick={()=>submit('decline',data.userid,data.name)}> Decline  </Button>  
                            </Row>)   }
                            
                        </Card>
                    </Col>
                ))
            }
         </Row>
        </div>
    )
}