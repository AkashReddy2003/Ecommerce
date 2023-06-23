import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import DriverOrderItem from './DriverOrderItem';
const DriverOrders = () => {
  const {user,BASE_URL}=useUserContext();
  const [orders,setOrders]=useState("");
  const getOrders=async()=>{
    await axios.get(BASE_URL+"order").then((res)=>{
      setOrders(res.data);
      console.log(res.data);
    })
  }

  useEffect(()=>{
    getOrders()
  },[orders])
  return (
    <div>
      <h1>Active Orders</h1>
    <ListGroup style={{minWidth:"700px",boxShadow:"0px 0px 10px"}} numbered>
      {orders?
      orders.map((o)=>
        o.status!="delivered"?<DriverOrderItem{...o} set={setOrders}/>:""
        
      )
      :""}

    </ListGroup>
    </div>
  )
}

export default DriverOrders