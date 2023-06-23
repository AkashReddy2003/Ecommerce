import React, { useEffect, useState } from 'react'
import { ListGroup,Row,Col } from 'react-bootstrap'
import { useUserContext } from '../context/userContext'
import axios from 'axios';
import AdminOrdersItem from './AdminOrdersItem';

const AdminOrders = () => {
    const {BASE_URL}=useUserContext();
    const [orders,setOrders]=useState([]);
    const [product,setProduct]=useState([]);
    const getOrders=async()=>{
        await axios.get(BASE_URL+"order").then((res)=>{
            setOrders(res.data);
        })
        await axios.get(BASE_URL+"product").then((res)=>{
            setProduct(res.data);
        })
    }
    useEffect(()=>{
        getOrders();
    },[])
  return (
    <>
    
    <ListGroup style={{minWidth:"700px",boxShadow:"0px 0px 10px"}}>
    <ListGroup.Item>
            <Row>
               
                <Col><h4>Date</h4></Col>
                <Col><h4>Owner Details</h4></Col>
                <Col><h4>Driver Details</h4></Col>
                <Col><h4>Product Details</h4></Col>
                <Col><h4>Status</h4></Col>
            </Row>
        </ListGroup.Item>
        
        {orders.length>0?orders.map((o)=>{
            return(

                <AdminOrdersItem {...o} product={product}/>
            )
        }
        ):""}
    </ListGroup>
    </>
  )
}

export default AdminOrders