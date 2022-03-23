import axios from "axios";
import { useEffect, useState } from "react";
import UserProfile from './userprofile.js'

export default function Dashboard() {

  // useEffect( ()=>(
  //     axios.get()
  //     .then(res=>console.log(res))
  //     .catch(err=>console.log(err))
  // ) )

  return (
    <div>
      <div className="photo"></div>
      <div className="container mainbody">
        <img
          className="Img"
          alt="profile"
          height={200}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBwDrR96wTO6JVWXI3r-9DXqK85Qnr5M7_WQ&usqp=CAU"
        />
        <div style={{ color: "white" }}>
        <h3 > Hello, </h3>
         <UserProfile /> 
        </div>
      </div>
    </div>
  );
}

//{localStorage.getItem('name')} !!!