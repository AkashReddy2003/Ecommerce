import React, { useState } from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap';
import "./box.css"
import { useUserContext } from '../context/userContext';
import im from '../img/login.png'
import "../pages/auth.css"
import {TbPassword} from 'react-icons/tb';
import {HiOutlineMail} from 'react-icons/hi'
function Login() {
    const {login}=useUserContext();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
   
    <div className='input_group'>
    
        
      <div className="input_field" >
        <i><HiOutlineMail/></i>
        <input  type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className="input_field" >
        <i><TbPassword/></i>
        <input type="password" placeholder="****" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      
      <button className='sub' onClick={()=>login(email,password)}>Submit</button>
    
    </div>
   
   
  )
}

export default Login