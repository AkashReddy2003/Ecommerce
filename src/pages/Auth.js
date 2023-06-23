import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup';
import "./auth.css"
import { Container,Col,Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import a from "../img/a.jpg"
import b from "../img/b.jpeg"
import c from "../img/c.jpg"
import logo from "../img/logo.webp"
function Auth() {
    const [state,setState]=useState(true);
    const data=()=>{
        switch(state){
            case true:
                return <Login/>
            case false:
                return <Signup/>
            default:
                return <Login/>
        }
    }
  return (
    
    <Row style={{height:"80vh",alignItems:"center"}} className='grid'>
    <Col style={{alignItems:"center",padding:"0 5vw",height:"100vh",textAlign:"center"}} >
        
        <h1><img style={{height:"80px"}} src={logo}></img>Sri Sai Agencies</h1>
       <Row>
        <Col onClick={()=>setState(false)} style={{cursor:"pointer"}} className="switch"><h4>Signup</h4></Col>
        <Col onClick={()=>setState(true)} style={{cursor:"pointer"}} className="switch"> <h4>Login</h4></Col>
        </Row> 
  
    {data()}
    </Col>
    <Col >
    <Carousel >
      <Carousel.Item>
        <img
        style={{height:"100vh",objectFit:"cover"}}
          className="d-block w-100"
          src={a}
          alt="First slide"

        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{height:"100vh",objectFit:"cover"}}
          className="d-block w-100"
          src={b}
          alt="Second slide"
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{height:"100vh",objectFit:"cover"}}
          className="d-block w-100"
          src={c}
          alt="Third slide"
        />

       
      </Carousel.Item>
    </Carousel>
    </Col>
    
    </Row>
    
  )
}

export default Auth