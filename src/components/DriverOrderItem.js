import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ListGroup, Row,Col, Badge, Button } from 'react-bootstrap'
import { useUserContext } from '../context/userContext';

const DriverOrderItem = ({set,_id,owner,driver,products,address,date,status,total}) => {
    const {BASE_URL,user}=useUserContext();
    const [own,setOwn]=useState({});
    const [product,setProduct]=useState({});
    const getOwner=async()=>{
        await axios.get(BASE_URL+"user/"+owner._id).then((res)=>{
            setOwn(res.data)
        })
    }
    const getProducts=async()=>{
        await axios.get(BASE_URL+"product").then((res)=>{
            let or=res.data.filter((d)=>products[d._id]!=null);
            setProduct(or);
        })

    }
    const ship=async()=>{
        await axios.patch(BASE_URL+"order/"+_id+"/mark-shipped",{ownerId:own._id,driverId:user._id}).then((res)=>{
            set(res.data);
        })
    }
    const deliver=async()=>{
        await axios.patch(BASE_URL+"order/"+_id+"/mark-delivered",{ownerId:own._id,driverId:user._id}).then((res)=>{
            set(res.data);
        })
    }
    useEffect(()=>{
        getOwner();
        getProducts();
    },[own])
  return (
    <ListGroup.Item as="li">
        <Row>
            <Col>
            </Col>
            <Col>
            {date}
            </Col>
            <Col>
                <Badge bg='secondary'>{own.name}<br/>{own.phone}<br/>{own.address}</Badge>
            </Col>
            <Col>
                {product.length>0?product.map((r)=>{
                    return(
                        <p>{r.name+" "+r.category+" : "+products[r._id]}</p>
                    )
                }):""}
            </Col>
            <Col>
            {total}
            </Col>
            <Col>
            {status=="processing"&&<Button onClick={ship}>Take the Order</Button>}
            {status=="shipped"&&driver==user._id&&<Button onClick={deliver} variant='success'>Mark Delivered</Button>}
            {status=="shipped"&&driver!=user._id&&<Badge bg='primary'>Shipped</Badge>}
            {status=="delivered"&&<Badge bg='success'>Delivered</Badge>}
            </Col>
        </Row>

    </ListGroup.Item>
  )
}

export default DriverOrderItem