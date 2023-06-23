import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useUserContext } from '../context/userContext';
import AdminDrivers from '../components/AdminDrivers';
import AdminUsers from '../components/AdminUsers';
import AdminProducts from '../components/AdminProducts';
import Home2 from '../components/Home2';
import Cart from '../components/Cart';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Order from '../components/Order';
import DriverOrders from '../components/DriverOrders';
import DriverMyOrder from '../components/DriverMyOrder';
import AdminOrders from '../components/AdminOrders';

function Home() {
  const {user,logout}=useUserContext();
  const [data,setData]=useState("main");
  const Main=()=>{
    switch(data){
      case "drivers":
        return <AdminDrivers/>
      case "users":
        return <AdminUsers/>
      case "products":
        return <AdminProducts/>
      case "main":
        return <Home2/>
      case "cart":
        return <Cart/>
      case "order":
        return <Order/>
      case "driveorders":
        return <DriverOrders/>
      case "myorder":
        return <DriverMyOrder/>
      case "orders":
        return <AdminOrders/>
      default:
        return ""
    }
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{minWidth:"700px"}}>
      <Container style={{backgroundColor:"#F1C27B",color:"#1F6E8C"}} >
        <Navbar.Brand onClick={()=>setData("main")}><h3>PEPSI</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link onClick={()=>setData("cart")}><h5><AiOutlineShoppingCart />{"("+user.cart.count+")"}</h5></Nav.Link>
            <Nav.Link onClick={()=>setData("order")}><h5>Orders</h5></Nav.Link>
            
            {user.role=="admin"&&<h5>
            <NavDropdown title="Admin">
            <NavDropdown.Item onClick={()=>setData("products")}>Products</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>setData("drivers")}>Drivers</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>setData("orders")}>Orders</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>setData("users")}>Users</NavDropdown.Item>
            </NavDropdown>
            
            </h5>}
            {user.role=="driver"&&<h5>
            <NavDropdown title="Driver">
            <NavDropdown.Item onClick={()=>setData("driveorders")}>Active Orders</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>setData("myorder")}>My Orders</NavDropdown.Item>
            </NavDropdown>
            
            </h5>}
            
          </Nav>
        </Navbar.Collapse>
        <Button variant='outline-dark' onClick={logout}>Logout</Button>
      </Container>
    </Navbar>
    
    {Main()}
    </>
  )
}

export default Home