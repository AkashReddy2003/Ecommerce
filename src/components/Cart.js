import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext'
import axios from 'axios';
import { ListGroup,Row,Col,Button } from 'react-bootstrap';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import loa from '../img/button.png';
const Cart = () => {
    const {BASE_URL,login,user,setUse}=useUserContext();
    const [cart,setCart]=useState([]);
    const [products,setProducts]=useState([]);
    const [load,setLoad]=useState(true);
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
      if(!cart.length){
        alert("Cart is Empty")
      }else{
        await axios.post(BASE_URL+'order',{userId:user._id,cart:user.cart,address:user.address}).then((res)=>{
          setUse(res.data);
        })
      }
      
    } 
    getCart()
    useEffect(()=>{
      setLoad(true);
      setTimeout(()=>{getCart();setLoad(false)},1000);
      
      
  },[user])
  
    
  return (
    <>
          {load?
            <section id='load'>
                <img src={loa}/>
            </section>
            :
    <div id="cart">
      <div>
      <h1 class="text-center">{cart.length>0?"CART":"CART IS EMPTY"}</h1>
      <div class="cart-container">
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
          
          <div class="cart-item">
          <img src={c.pictures} alt="Item 1"/>
          <div class="item-details">
            <h2>{c.name+" "+c.category}</h2>
            <p>Price: ${Number(c.price)*Number(user.cart[c._id])}</p>
            <div class="quantity">
              <button onClick={user.cart[c._id]>1?decCart:delCart} class="decrease-btn">-</button>
              <span class="count">{user.cart[c._id]}</span>
              <button onClick={incCart} class="increase-btn">+</button>
            </div>
            <button onClick={()=>{delCart();setTimeout(()=>{setLoad(false)},1500)}} class="delete-btn">Delete</button>
          </div>
        </div>
        )
      }):""}
      </div>
      <div class="cart-container">
      {cart.length>0?
      <button class="order-btn" variant='outline-dark' onClick={order}>Order{" "}Now</button>
      :""}
      </div>
      </div>
    </div>
}
    </>
  )
}

export default Cart