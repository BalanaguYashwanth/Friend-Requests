import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row,Button } from "react-bootstrap";

export default function Suggestion(){

    const [suggestData, setSuggestData] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        
        axios.get('http://localhost:9000/get/usersdetailsbyid/'+localStorage.getItem('user-id'))
        .then(res=>setName(res.data[0].name))
        .catch(err=>console.log(err))

        axios.post('http://localhost:9000/get/suggestions',{
            userid:localStorage.getItem('user-id')
        })
        .then(res=>{            
            setSuggestData(res.data.filter((r)=> (r.userid !== localStorage.getItem('user-id')) ))
            //console.log(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    function submit(id)
    {
        //console.log(id)
        axios.put('http://localhost:9000/get/pendinguserdetails',{
            userid:id,
            request_friends:{userid:localStorage.getItem('user-id'),name:name,status:'pending'}
        })
        .then(res=>{
           // console.log(res)
            window.location.reload()
        })
        .catch(err=>console.log(err))
        //console.log(userdetails)
    }


    return(
        <div>
        <mark style={{backgroundColor:'yellow'}}> Friend Suggestions </mark>
        <Row>
         {
            suggestData && suggestData.map((data,index)=>(
                <Col key={index}>
                    <Card  className="p-2 my-3" style={{ width: '18rem', margin:'0 auto',color:'black', textAlign:'left',  }}>
                        <Card.Title> {data.name}  </Card.Title>
                      
                        <Button onClick={()=>submit(data.userid)} > Add Friend  </Button>  
                        
                    </Card>
                </Col>
            ))
        } 
     </Row>
    </div>
    )
}