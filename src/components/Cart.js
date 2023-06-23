import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext'
import axios from 'axios';
import { ListGroup,Row,Col,Button } from 'react-bootstrap';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';

const Cart = () => {
    const {BASE_URL,login,user,setUse}=useUserContext();
    const [cart,setCart]=useState([]);
    const [products,setProducts]=useState([]);
    const getCart=async()=>{
      await axios.get(BASE_URL+"product").then((res)=>{
        setProducts(res.data);
        
      }).catch((e)=>{
        console.log(e);
      })
      
      const c=user.cart;
      const car=products&&c?products.filter((product)=>c[product._id]!=null):""
      setCart(car);
    }
    const order=async()=>{
      await axios.post(BASE_URL+'order',{userId:user._id,cart:user.cart,address:user.address}).then((res)=>{
        setUse(res.data);
      })
    } 
    getCart()
    useEffect(()=>{
      getCart();
    },[user])
  return (
    <div style={{padding:"20px"}}>
      <h1>Cart</h1>
      
      <ListGroup as="ol" style={{minWidth:"700px",boxShadow:"0px 0px 10px"}}>
      <ListGroup.Item as="li" >
          <Row>
              <Col>
              <h4></h4>
              </Col>
              <Col>
              <h4>Name</h4>
              </Col>
              <Col>
              <h4>Category</h4>
              </Col>
              <Col>
              <h4>Quantity</h4>
              </Col>
              <Col>
              <h4>Price</h4>
              </Col>
              <Col>
              
              </Col>
          </Row>
          </ListGroup.Item>
      {cart?cart.map((c)=>{
        const incCart=async()=>{
          await axios.post(BASE_URL+"product/increase-cart",{userId:user._id,productId:c._id,price:c.price}).then((res)=>{
            setUse(res.data);
          })
        }
        const decCart=async()=>{
          await axios.post(BASE_URL+"product/decrease-cart",{userId:user._id,productId:c._id,price:c.price}).then((res)=>{
            setUse(res.data);
          })
        }
        const delCart=async()=>{
          await axios.post(BASE_URL+"product/remove-from-cart",{userId:user._id,productId:c._id,price:c.price}).then((res)=>{
            setUse(res.data);
          })
        }

        return(
          <ListGroup.Item as="li" style={{minWidth:"700px"}} >
          <Row>
              <Col>
              <img
    src={c.pictures}
    
    alt=""
    style={{maxHeight:"50px"}}
  />
              </Col>
              <Col>
              {c.name}
              </Col>
              <Col>
              {c.category}
              </Col>
              <Col>
              <Button onClick={user.cart[c._id]>1?decCart:delCart} variant='outline-dark'><AiOutlineMinus/></Button>
              {"   "+user.cart[c._id]+"   "}
              <Button onClick={incCart} variant='outline-dark'><AiOutlinePlus/></Button>
              </Col>
              <Col>
              {Number(c.price)*Number(user.cart[c._id])}
              </Col>
              <Col>
              <Button onClick={delCart} variant='outline-dark'><AiOutlineDelete/></Button>
              </Col>
          </Row>
          </ListGroup.Item>
        )
      }):""}
      </ListGroup>
      <Button variant='outline-dark' onClick={order}>Order{"  "}<AiOutlineSend/></Button>
    </div>
  )
}

export default Cart