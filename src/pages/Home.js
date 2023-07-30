import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useUserContext } from '../context/userContext';

import Home2 from '../components/Home2';
import Cart from '../components/Cart';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Order from '../components/Order';
import DriverOrders from '../components/DriverOrders';
import DriverMyOrder from '../components/DriverMyOrder';

import Product from '../components/Product';
import './home.css';
import Admin from '../components/Admin';

function Home() {
  const {user,logout}=useUserContext();
  const [data,setData]=useState("main");
  const Main=()=>{
    switch(data){
      case "product":
        return <Product />
      case "admin":
        return <Admin/>
      case "main":
        return <Home2 setData={setData}/>
      case "cart":
        return <Cart/>
      case "order":
        return <Order/>
      case "driveorders":
        return <DriverOrders/>
      case "myorder":
        return <DriverMyOrder/>
      default:
        return ""
    }
  }
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark " id='navbar'>
  <div className="container-fluid">
    <a className="navbar-brand" href="#home" onClick={()=>setData("main")}>PEPSI</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto ">
      <li className='nav-item' onClick={()=>setData("main")} ><a href="#home" className='nav-link'>Home</a></li>
          <li className='nav-item' onClick={()=>setData("main")}><a href='#about' className='nav-link'>About</a></li>
          <li className='nav-item'><a className='nav-link'>Contact</a></li>
          <li className='nav-item' onClick={()=>setData("product")} ><a className='nav-link'>Products</a></li>
          
            <li className='nav-item' onClick={()=>setData("cart")}><a className='nav-link'><AiOutlineShoppingCart />{"("+user.cart.count+")"}</a></li>
            <li className='nav-item' onClick={()=>setData("order")}><a className='nav-link'>Orders</a></li>
            {user.role=="admin"&&
            <li className='nav-item' onClick={()=>setData("admin")}><a className='nav-link'>Admin</a></li>}
            {user.role=="driver"&&
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Driver
            </a>
            <ul className='dropdown-menu' title="Driver">
            <li className='dropdown-item' onClick={()=>setData("driveorders")}>Active Orders</li>
            <li className='dropdown-item' onClick={()=>setData("myorder")}>My Orders</li>
            </ul>
            </li>}
          
            
      </ul>
      <button class="btn" onClick={logout} >Logout</button>
      
    </div>
  </div>
</nav>
      
    
    {Main()}
    </>
  )
}

export default Home