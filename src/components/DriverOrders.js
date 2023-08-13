import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import DriverOrderItem from './DriverOrderItem';
import './DriverOrd.css'
const DriverOrders = () => {
  const {user,BASE_URL}=useUserContext();
  const [orders,setOrders]=useState("");
  const [prod,setProd]=useState([]);
  const getOrders=async()=>{
    await axios.get(BASE_URL+"order").then((res)=>{
      setOrders(res.data);
      console.log(res.data);
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
  },[orders])
  return (
    <div>
      <h1 class="text-center" style={{padding:"20px"}}>Active Orders</h1>
    <div class="driverorder" >
      {orders?
      orders.map((o)=>
        o.status!="delivered"?<DriverOrderItem{...o} set={setOrders} prod={prod}/>:""
      )
      :""}

    </div>
    </div>
  )
}

export default DriverOrders