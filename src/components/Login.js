import React, { useState } from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap';
import "./box.css"
import { useUserContext } from '../context/userContext';
import im from '../img/login.png'

function Login() {
    const {login}=useUserContext();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
  return (
   
    <div className='container'>
    <Form>
        <h1>Login to your Account</h1>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="****" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      
      <Button onClick={()=>login(email,password)}>Submit</Button>
    </Form>
    </div>
   
   
  )
}

export default Login