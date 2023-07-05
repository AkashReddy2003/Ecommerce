import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext'
import { Badge, ListGroup ,Row,Col} from 'react-bootstrap';
import axios from 'axios';

const AdminOrdersItem = ({_id,owner,driver,products,address,date,status,total,product}) => {
    const {BASE_URL}=useUserContext();
    const [own,setOwn]=useState({});
    const [drive,setDrive]=useState({});
    const [prod,setProd]=useState([]);
    const getDetails=async()=>{
        await axios.get(BASE_URL+'user/'+owner._id).then((res)=>{
            setOwn(res.data);
        })
        driver!=""?await axios.get(BASE_URL+'user/'+driver).then((res)=>{
            setDrive(res.data);
        }):setDrive({});
        console.log(product);
        let or=product?product.filter((o)=>products[o._id]!=null):[];
        setProd(or);
        console.log(or);
    }
    useEffect(()=>{
        getDetails();
    },[])
    getDetails();
  return (
    <ListGroup.Item>
        <Row>
           
            <Col>{date}</Col>
            <Col>{own.name}<br/>{own.phone}<br/>{own.address}</Col>
            <Col>{drive.name}<br/>{drive.phone}<br/>{drive.address}{status=='processing'&&<p>Not Assigned Yet</p>}</Col>
            <Col>{prod.map((p)=>{
                console.log(p);
                return(
                    <p>{p.name+" "+p.category+" : "+products[p._id]}</p>
                )
            })}</Col>
            <Col>{status=="processing"&&<Badge bg='secondary'>Processing</Badge>}
            {status=="shipped"&&<Badge bg='primary'>Shipped</Badge>}
            {status=="delivered"&&<Badge bg='success'>Delivered</Badge>}
            </Col>
            
        </Row>
    </ListGroup.Item>
  )
}

export default AdminOrdersItem