import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Findfriends from "./screens/findfriends";
import FriendRequests from "./screens/requests";
import Suggestion from "./screens/suggestions";
import MutualFriends from "./screens/mutualfriends";
import { useNavigate } from 'react-router-dom' 

export default function Header() {

    const navigate = useNavigate()
    const [result, setResult] =useState('Findfriends')

    // function submit(name)
    // {
    //     setResult()
    // }

  return (
    <div>
      <Row style={{ backgroundColor: "grey" }}>
          
        <Col>
          <span style={{ color: "white" }} onClick={()=>setResult('Findfriends')} >
            {" "}
            <i className="fa-solid fa-user-group"></i>Find Friends{" "}
          </span>
        </Col>

        <Col>
          <span style={{ color: "white" }}  onClick={()=>setResult('FriendRequests')} >
            {" "}
            <i className="fas fa-user-plus"></i>Friend Requests{" "}
          </span>
        </Col>

        <Col>
          <span style={{ color: "white" }} onClick={()=>setResult('Suggestion')} >
            {" "}
            <i className="fa-solid fa-user-group"></i>Suggestion{" "}
          </span>
        </Col>

        <Col>
          <span style={{ color: "white" }} onClick={()=>setResult('MutualFriends')} >
            {" "}
            <i className="fa-solid fa-user-group"></i>MutualFriends{" "}
          </span>
        </Col>

        <Col>
          <span style={{ color: "white" }} onClick={()=>(navigate('/login'))} >
            {" "}
            <i className="fa-solid fa-right-from-bracket"></i>Logout{" "}
          </span>
        </Col>
      </Row>

      { result == 'Findfriends' && <Findfriends /> }
      { result == 'FriendRequests' && <FriendRequests /> }
      { result == 'Suggestion' && <Suggestion />}
      { result == 'MutualFriends' && <MutualFriends />}
    </div>
  );
}
