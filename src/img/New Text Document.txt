import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import axios from 'axios';
import { ListGroup, Row,Col, Badge } from 'react-bootstrap';

const Order = () => {
    const [data,setData]=useState([]);
    const {user,BASE_URL}=useUserContext();
    const [prod,setProd]=useState([]);
    
    let p=[];
    let driver={};
    
    const getOrders=async()=>{
        await axios.get(BASE_URL+"order").then((res)=>{

            console.log(res.data);
            console.log(user.orders);
            let or=res.data.filter((d)=>user.orders.includes(d._id));
            setData(or);
        })
        await axios.get(BASE_URL+"product").then((res)=>setProd(res.data))
    }
    const getProd=async(order)=>{
        p=[];
        p=prod.filter((x)=>order.products[x._id]!=null);
        return p;
    }
    const getDriver=async(order)=>{
        if(order.status!="processing"){
            await axios.get(BASE_URL+"user/"+order.driver).then((res)=>{
                driver={
                    name:res.data.name,
                    phone:res.data.phone
                }
                return driver;
            }).catch((e)=>{
                console.log(e);
            })
        }else{
            driver={
                name:"Not Assigned",
                phone:"Not Assigned"
            }
            return driver;
        }
        
    }
    useEffect(()=>{
        getOrders();
    },[])
    getOrders();
  return (
    <div>
        <ListGroup.Item style={{minWidth:"700px"}}>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    <h5>Order Date</h5>
                    </Col>
                    <Col>
                    <h5>Order Status</h5>
                    </Col>
                    <Col>
                    <h5>Ordered Products</h5>
                    </Col>
                    <Col>
                    <h5>Order Price</h5>
                    </Col>
                </Row>
            </ListGroup.Item>
        <ListGroup as="ul" numbered style={{minWidth:"700px"}}>
            
        {data?
        data.map((d)=>{
            console.log(getProd(d))
            getProd(d).then((r)=>p=r);
            
            return(
                <ListGroup.Item>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        {d.date}
                        </Col>
                        <Col>
                        {d.status=="processing"&&<Badge bg='secondary'>Processing</Badge>}
                        {d.status=="shipped"&&<Badge bg="primary">Shipped</Badge>}
                        {d.status=="delivered"&&<Badge bg="success">Delivered</Badge>}
                        </Col>
                        
                        <Col>
                        {p.length>0?p.map((x)=>{return(
                            <h5>{x.name+" "+x.category+" : "+d.products[x._id]}</h5>
                        )}):""}
                        </Col>
                        <Col>
                        {d.total}
                        </Col>
                        
                    </Row>
                </ListGroup.Item>
            )
        })
        :""}
        </ListGroup>
    </div>
  )
}

export default Order