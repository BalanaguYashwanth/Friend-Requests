import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"


export default function MutualFriends(){

    const [mutualData, setMutualData] = useState('')

    useEffect(() => {
        axios.post('http://localhost:9000/get/mutualfriends',{
            userid:localStorage.getItem('user-id')
        })
        .then(res=>{            
            setMutualData(res.data.filter((r)=> (r.userid !== localStorage.getItem('user-id')) ))
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    return(
        <div>
        <mark style={{backgroundColor:'yellow'}}> Mutual Friends  </mark>
        <Row>
         {
            mutualData && mutualData.map((data,index)=>(
                <Col key={index}>
                    <Card  className="p-2 my-3" style={{ width: '30rem', margin:'0 auto',color:'black', textAlign:'center',  }}>
                        <Card.Title> {data.name} user has mutual friend {data.mutualfriend}  </Card.Title>
                        {/* <Button onClick={()=>submit(data.userid)} > Add Friend  </Button>   */}
                        
                    </Card>
                </Col>
            ))
        } 
     </Row>
    </div>
    )
}