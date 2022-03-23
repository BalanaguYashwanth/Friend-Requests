import axios from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Findfriends from "./findfriends";
import FriendRequests from "./requests";
import Header from "../header";
import Dashboard from "./dashboard";

export default function UserProfile() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [bio, setBio] = useState('') 
  const [datas, setDatas] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:9000/get/usersdetailsbyid/'+localStorage.getItem('user-id'))
    .then(res=>{
      const datas = res.data
      console.log('datas',datas)
      setDatas(datas)
      //setFeedback('success')
      //console.log(datas)
      // for(let obj in datas)
      // {
      //   setName(obj.name)
      //   setAge(obj.age)
      //   setGender(obj.gender)
      //   setBio(obj.bio)
      // }
    })
    .catch(err=>{
      console.log(err.message)
      //setFeedback('failed')
    })
  },[])

  function submit() {
    console.log(localStorage.getItem("user-id"),name,age,gender,bio)
    axios
      .post("http://localhost:9000/get/userdetailsbyid", {
        userid: localStorage.getItem("user-id"),
        name: name,
        age: age,
        gender:gender,
        bio:bio,
      })
      .then((res) => {
        //console.log(res)
        window.location.reload();
        setFeedback('success')
        
      })
      .catch((err) => {
        console.log(err)
        setFeedback('please enter valid inputs')
      });
  }

  return (
    <div>
  {  datas && datas.length==0 ? ( <div>
      <p> User Profile </p>
     
      <Col>
        <input placeholder="Enter your name*" type='text' value={name} onChange={(e)=>setName(e.target.value)} />
      </Col>
      <Col>
        <input placeholder="Enter your age*" type='Number'value={age} onChange={(e)=>setAge(e.target.value)} />
      </Col>
      <Col>
        <select placeholder="Enter your gender*" type='text' value={gender} onChange={(e)=>setGender(e.target.value)} > 
            <option> select the gender* </option>
            <option> Male </option>
            <option> Female </option>
            <option> Not prefer to say </option>
        </select>
      </Col>
      <Col>
        <input placeholder="Enter your bio*" type='text' value={bio} onChange={(e)=>setBio(e.target.value)} />
      </Col>
      <button onClick={submit} className="btn btn-secondary" > submit </button>
      <p> Note -  Please fill userprofile all required inputs to proceed futhur screens </p>
       <p> {feedback} </p> 
      </div>) : <div style={{colors:'white'}}> <Header />  </div> }
    </div>
   
  );
}
