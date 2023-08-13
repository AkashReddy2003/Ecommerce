import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ListGroup, Row,Col, Badge, Button,Toast,ToastContainer } from 'react-bootstrap'
import { useUserContext } from '../context/userContext';

const DriverOrderItem = ({set,_id,owner,driver,products,address,date,status,total,prod}) => {
    const {BASE_URL,user}=useUserContext();
    
    const [showB, setShowB] = useState(false);
    const [own,setOwn]=useState({});
    const [product,setProduct]=useState({});
    
    const toggleShowB = () => {setShowB(!showB)};
    const getOwner=async()=>{
        await axios.get(BASE_URL+"user/"+owner._id).then((res)=>{
            setOwn(res.data)
        })
    }
    const getProducts=async()=>{
        
            let or=prod.filter((d)=>products[d._id]!=null);
            setProduct(or);
        

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
    <div class="col-lg-4 col-md-4 col-12 a">
              <div class="card">
            
                <h1>{"Order Id: #"+_id}<br/>{"Date: "+date}<br/>{"Owner Name: "+own.name}<br/>{"Phone :"+own.phone}<br/>{"Address: "+address}
                <br/>{"Amount: "+total+"₹"}</h1>
                
              <div class="card-body text-center">
              
        <Button onClick={toggleShowB} className="mb-2">
          Product <strong>Details</strong>
        </Button>
        <ToastContainer position='middle-center'>
        <Toast onClose={toggleShowB} show={showB} animation={false}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Product Details</strong>
            <small>{"Total: "+total+"₹"}</small>
          </Toast.Header>
          <Toast.Body>{product.length>0?product.map((r)=>{
                    return(
                        <p>{r.name+" "+r.category+" : "+products[r._id]}</p>
                    )
                }):""}</Toast.Body>
        </Toast>
        </ToastContainer>
        
              <h5 class="card-title"></h5>
              
                
                {status=="processing"&&<Button onClick={ship}>Take the Order</Button>}
            {status=="shipped"&&driver==user._id&&<Button onClick={deliver} variant='success'>Mark Delivered</Button>}
            {status=="shipped"&&driver!=user._id&&<Badge bg='primary'>Shipped</Badge>}
            {status=="delivered"&&<Badge bg='success'>Delivered</Badge>}
              </div>
              
              </div>
              
              </div>
   
        

    
  )
}

export default DriverOrderItem