import React, { useState } from 'react'
import {Button, Form,Row,Col} from 'react-bootstrap';
import "./box.css"
import { useUserContext } from '../context/userContext';

function Signup() {
    const {signup}=useUserContext();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [name,setName]=useState("");
  return (
    <div className='container'>
    <Form>
        <h1>Create new Account</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Row>
        <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="****" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="123456890" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="address" value={address} onChange={(e)=>setAddress(e.target.value)} />
      </Form.Group>
        </Col>
      </Row>
      
      
      
      
      <Button onClick={()=>signup(name,email,password,phone,address)}>Submit</Button>
    </Form>
    </div>
  )
}

export default Signup