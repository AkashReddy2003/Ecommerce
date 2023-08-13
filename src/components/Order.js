import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import axios from 'axios';
import { ListGroup, Row,Col, Badge } from 'react-bootstrap';
import "./order.css"
import Home from "../img/Home.png"
import Shipping from "../img/Shipping.png"
import Delivery from "../img/Delivery.png"
import loa from '../img/button.png';
const Order = () => {
    const [data,setData]=useState([]);
    const {user,BASE_URL}=useUserContext();
    const [prod,setProd]=useState([]);
    const [load,setLoad]=useState(true);
    
    let p=[];
    let driver={};
    
    const getOrders=async()=>{
        await axios.get(BASE_URL+"order").then((res)=>{

            console.log(res.data);
            console.log(user.orders);
            let or=res.data.filter((d)=>user.orders.includes(d._id));
            or.reverse();
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
        setTimeout(()=>{getOrders();setLoad(false)},2000);
    },[])
    
  return (
    <>
    {load?
        <section id='load'>
            <img src={loa}/>
        </section>
        :
        <>
        <h1 class="text-center" style={{padding:"20px"}}>ORDERS</h1>
    <div class="con">
        
        {data?
        data.map((d)=>{
            getProd(d).then((r)=>p=r);
            return(
                <div class="px-1 px-md-4 py-5 mx-auto">
      <div class="card">
        <div  className='cont1'>
        <div class="row d-flex justify-content-between px-3 top">
          <div class="d-flex">
            <h5>
              ORDER
              <span class="text-primary font-weight-bold">{" #"+d._id}</span>
            </h5>
          </div>
          <div class="d-flex flex-column text-sm-right">
            <p class="mb-0">
              Ordered Date : <span class="font-weight-bold">{d.date}</span>
            </p>
            <p>
              Price <span class="font-weight-bold">{d.total}₹</span>
            </p>
          </div>
        </div>
        <div class="row d-flex justify-content-between px-3 top"> 
        {p.length>0?p.map((x)=>{return(
                            <h5>{x.name+" "+x.category+" : "+d.products[x._id]}</h5>
                        )}):""}
            </div>
        </div>
        
        
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <ul id="progressbar" class="text-center">
              <li class={(d.status=="processing"||d.status=="shipped"||d.status=="delivered")?"active step0":"step0"}></li>
              <li class={(d.status=="shipped"||d.status=="delivered")?"active step0":"step0"}></li>
              <li class={(d.status=="delivered")?"active step0 ":"step0"}></li>
            </ul>
          </div>
        </div>
        <div class="cont justify-content-between top">
          <div class="icon-content">
            <img src={Delivery} alt="" class="icon" />
            <div class="flex-column">
              <p class="font-weight-bold">Order <br />Processed</p>
            </div>
          </div>
          <div class=" icon-content">
            <img src={Shipping} alt="" class="icon" />
            <div class="flex-column">
              <p class="font-weight-bold">Order <br />En Route</p>
            </div>
          </div>
          <div class=" icon-content">
            <img src={Home} alt="" class="icon" />
            <div class="flex-column">
              <p class="font-weight-bold">Order <br />Arrival</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
            )
        })
        
        :""}
        
        
    </div>
    </>
}
</>
  )
}

export default Order