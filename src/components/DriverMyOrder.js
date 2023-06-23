import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useUserContext } from '../context/userContext'
import axios from 'axios';
import DriverOrderItem from './DriverOrderItem';

const DriverMyOrder = () => {
    const {BASE_URL,user}=useUserContext();
    const [order,setOrders]=useState([]);
    const [myOrder,setMyOrder]=useState([]);
    const getOrders=async()=>{
        await axios.get(BASE_URL+"order").then((res)=>{
        let or=res.data.filter((o)=>o.driver==user._id);
          setOrders(res.data);
          setMyOrder(or);
          console.log(or);
        })
      }
      
      useEffect(()=>{
        getOrders();
      },[order])
  return (
    <div>
        <h1>My Orders</h1>
    <ListGroup style={{minWidth:"700px",boxShadow:"0px 0px 10px"}} numbered>
        {myOrder.length>0?
        myOrder.map((o)=>{return(
            <DriverOrderItem{...o} set={setOrders}/>
        )})
        :""}

    </ListGroup>
    </div>
  )
}

export default DriverMyOrder