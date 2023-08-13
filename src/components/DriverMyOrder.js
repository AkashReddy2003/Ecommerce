import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useUserContext } from '../context/userContext'
import axios from 'axios';
import DriverOrderItem from './DriverOrderItem';
import "./DriverOrd.css"
const DriverMyOrder = () => {
    const {BASE_URL,user}=useUserContext();
    const [order,setOrders]=useState([]);
    const [myOrder,setMyOrder]=useState([]);
    const [prod,setProd]=useState([]);
    const getOrders=async()=>{
        await axios.get(BASE_URL+"order").then((res)=>{
        let or=res.data.filter((o)=>o.driver==user._id);
          setOrders(res.data);
          setMyOrder(or);
          console.log(or);
        })
      }
      const getProducts=async()=>{
        await axios.get(BASE_URL+"product").then((res)=>{
            setProd(res.data);
        })

    }
      
      useEffect(()=>{
        getOrders();
        getProducts();
      },[order])
  return (
    <div>
        <h1 class="text-center" style={{padding:"20px"}}>My Orders</h1>
    <div class="driverorder">
        {myOrder.length>0?
        myOrder.map((o)=>{return(
            <DriverOrderItem{...o} set={setOrders} prod={prod}/>
        )})
        :""}

    </div>
    </div>
  )
}

export default DriverMyOrder