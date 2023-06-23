import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import {Col,Row,ListGroup,Button} from 'react-bootstrap'
function AdminDrivers() {
    const [drivers,setDrivers]=useState([]);
    const [load,setLoad]=useState(true);
    const {BASE_URL}=useUserContext();
    const getDrivers=async()=>{
        await axios.get(BASE_URL+"user/drivers")
        .then((res)=>{
            setDrivers(res.data);
            console.log(res);
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    const conv=async(id)=>{
        console.log(id)
        await axios.patch(BASE_URL+'user/'+id+'/convert_to_client').then((res)=>{
            getDrivers();
        }).catch((e)=>{
            console.log(e);
        })

    }
    useEffect(()=>{

        getDrivers();
        setTimeout(()=>{},1000)
        setLoad(false);
        
    },[])
  return (
    <div style={{padding:"20px"}}>
        <ListGroup as="ol" style={{minWidth:"700px",boxShadow:"0px 0px 10px"}}>
        <ListGroup.Item
        as="li"
        
      >
        <Row md={12} xs={12}>
            <Col md={2} xs={2}>
            <h4>Name</h4>
            </Col>
            <Col md={2} xs={2}>
            <h4>Email</h4>
            </Col>
            <Col md={2} xs={2}>
            <h4>Role</h4>
            </Col>
            <Col md={2} xs={2}>
            <h4>Phone no.</h4>
            </Col>
            <Col md={2} xs={2}>
            <h4>Address</h4>
            </Col>
            <Col md={2} xs={2}>
            
            </Col>
        </Row>
      </ListGroup.Item>
        {drivers?
        drivers.map((client)=>{
            return(
                <ListGroup.Item
        as="li"
        
      >
        <Row md={12} xs={12}>
            <Col md={2} xs={2}>
            {client.name}
            </Col>
            <Col md={2} xs={2}>
            {client.email}
            </Col>
            <Col md={2} xs={2}>
            {client.role}
            </Col>
            <Col md={2} xs={2}>
            {client.phone}
            </Col>
            <Col md={2} xs={2}>
            {client.address}
            </Col>
            <Col md={2} xs={2}>
            <Button onClick={()=>conv(client._id)}>Convert to Client</Button>
            </Col>
        </Row>
      </ListGroup.Item>
            )
        }):""}
        
        </ListGroup>
    </div>
    
  )
}

export default AdminDrivers