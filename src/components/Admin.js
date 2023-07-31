import React, { useEffect, useState } from 'react'
import "./admin.css"
import { AiOutlineHome } from 'react-icons/ai'
import {HiUsers} from 'react-icons/hi'
import {GiSteeringWheel} from "react-icons/gi"
import {BsListCheck} from "react-icons/bs"
import {TbBottle} from 'react-icons/tb'
import axios from 'axios'
import { useUserContext } from '../context/userContext'
import {Toast,InputGroup,Form,Row,Col,Button,ListGroup} from 'react-bootstrap'

const Admin = () => {
    const {BASE_URL}=useUserContext();
    const [data,setData]=useState("home");
    const [ord,setOrd]=useState([]);
    const [am,setAm]=useState(0);
    const [act,setAct]=useState(0);
    const [quant,setQuant]=useState(0);
    const [use,setUse]=useState([]);
    const [prod,setProd]=useState([]);
    const [nam,setName]=useState("");
    const [categor,setCategory]=useState("");
    const [stoc,setStock]=useState("");
    const [pric,setPrice]=useState("");
    const [picture,setPictures]=useState("");
    const [i,setI]=useState("");
    const [orddet,setOrddet]=useState({});
    const [orddetuse,setOrddetuse]=useState({});
    const [orddetdri,setOrddetdri]=useState({});
    const [orddetprod,setOrddetprod]=useState([]);
    const update=async()=>{
        await axios.patch(BASE_URL+"product/"+i,{name:nam,price:pric,category:categor,stock:stoc,pictures:picture}).then((res)=>{
            
            getdetails();
        }).catch((e)=>{
            console.log(e);
        })

    }
    const addProduct=async()=>{
        await axios.post(BASE_URL+"product",{name:nam,stock:stoc,price:pric,category:categor,pictures:picture}).then((res)=>{
          getdetails();
        }).catch((e)=>{
          console.log(e);
        })
      }
    const getdetails=async()=>{
        await axios.get(BASE_URL+"order").then((res)=>{
            setOrd(res.data);
            let a=0;
            let b=0;
            let c=0;
            for(let i=0;i<res.data.length;i++){
                a+=res.data[i].total;
                b+=res.data[i].count;
                if(res.data[i].status!="delivered"){
                    c++;
                }
            }
            setAm(a);
            setQuant(b);
            setAct(c);
        })
        await axios.get(BASE_URL+"users").then((res)=>{
            setUse(res.data);
        })
        
        await axios.get(BASE_URL+"product").then((res)=>{
            setProd(res.data);
        })
        
    }
    const convDri=async(id)=>{
        console.log(id)
        await axios.patch(BASE_URL+'user/'+id+'/convert_to_client').then((res)=>{
            getdetails();
        }).catch((e)=>{
            console.log(e);
        })

    }
    const convUse=async(id)=>{
        console.log(id)
        await axios.patch(BASE_URL+'user/'+id+'/convert_to_driver').then((res)=>{
            getdetails();
        }).catch((e)=>{
            console.log(e);
        })
    }

    const ordersof=(x)=>{
        let a=0;
        ord.map((m)=>{
            if(m.driver==x&&m.status=="delivered"){
                a=a+1;
            }
        })
        return(
            <>{a}</>
        )
    }
    const ordersactive=(x)=>{
        let a=0;
        ord.map((m)=>{
            if(m.driver==x&&m.status!="delivered"){
                a=a+1;
            }
        })
        return(
            <>{a}</>
        )
    }
    
    const delet=async(a)=>{
        await axios.delete(BASE_URL+"product/"+a).then((res)=>{
            getdetails();
        }).catch((e)=>{
            console.log(e);
        })
    }

    const getName=(b)=>{
        let ans={};
        use.map((x)=>{
            if(x._id==b||x.email==b){
                console.log(x.name)      
                ans=x
            }
        })
        return(
            ans
        )
    }
    const getuselength=(y)=>{
      let a=0;
      use.map((x)=>{
        if(x.role==y){
          a++;
        }

      })
      return (
        <>{a}</>
      )
    }

  const getordprod=async(products)=>{
    console.log(products)
      let or=prod.filter((d)=>products[d._id]!=null);
      console.log(or)
      setOrddetprod(or);
     return (or);
        
      
  }


    useEffect(()=>{
        
        getdetails() 
        
    },[data])
  return (
    
    <div className='contain'>
        <div className='navigate'>
            <ul>
                <li onClick={()=>setData("home")}>
                    <a href='#'>
                        <span className='ic'><AiOutlineHome/></span>
                        <span className='title' >Home</span>
                    </a>
                </li>
                <li onClick={()=>setData("products")}>
                    <a href='#' >
                        <span className='ic'><TbBottle/></span>
                        <span className='title'>Products</span>
                    </a>
                </li>
                <li onClick={()=>setData("users")}>
                    <a href='#'>
                        <span className='ic'><HiUsers/></span>
                        <span className='title'>Users</span>
                    </a>
                </li>
                <li onClick={()=>setData("drivers")}>
                    <a href='#'>
                        <span className='ic'><GiSteeringWheel/></span>
                        <span className='title' >Drivers</span>
                    </a>
                </li>
                <li onClick={()=>setData("orders")}>
                    <a href='#'>
                        <span className='ic'><BsListCheck/></span>
                        <span className='title' >Orders</span>
                    </a>
                </li>
            </ul>

        </div>
        <div className='content'>
            {data=="home"&&<div className='parameters'>
            <div class="card" style={{height:"auto"}}>
              <h1>Active Orders</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{act}</h5>
              </div>
              </div>
              <div class="card">
              <h1>Delivered Orders</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{ord.length-act}</h5>
              </div>
              </div>
              <div class="card">
              <h1>Total Amount</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{am}₹</h5>
              </div>
              </div>
              <div class="card">
              <h1>Items Sold</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{quant}</h5>
              </div>
              </div>
              <div class="card">
              <h1>Users</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{getuselength("client")}</h5>
              </div>
              </div>
              <div class="card">
              <h1>Drivers</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{getuselength("driver")}</h5>
              </div>
              </div>
                

            </div>}
            {data=="users"&&<div className='parameters'>
            
            {use.map((u)=>{
                return(
                  <>
              {u.role=="client"&&<div class="card" style={{height:"auto"}}>
              <h1>{u.name}</h1>
              <div class="card-body text-center">
              <h5 class="card-title">Phone:{u.phone}</h5>
              <p>email:{u.email}</p>
              <p>address: {u.address}</p>
              <p>Orders: {u.orders.length}</p>
              <a onClick={()=>convUse(u._id)} class="btn btn-primary">Convert to Driver</a>
              </div>
              </div>}      
            
              </> 
                )
            })}
            
              
                

            </div>}

            {data=="drivers"&&<div className='parameters'>
            
            {use.map((d)=>{
                return(
                   
                   <>
                   {d.role=="driver"&&
                   <div class="card" style={{height:"auto"}}>
                   <h1>{d.name}</h1>
                   <div class="card-body text-center">
                   <h5 class="card-title">Phone:{d.phone}</h5>
                   <p>email:{d.email}</p>
                   <p>address: {d.address}</p>
                   <p>Active Orders: {ordersactive(d._id)}</p>
                   <p>Orders Completed: {ordersof(d._id)}</p>
                   <a onClick={()=>convDri(d._id)} class="btn btn-primary">Convert to User</a>
                   </div>
                   </div>}
            
              </> 
                )
            })}
            
              
                

            </div>}

            {data=="products"&&<>
            <button onClick={()=>{setI("");setName("");setCategory("");setPictures("");setPrice("");setStock("")}} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                    Add New Product
                </button>
            <div className='parameters'>
            
            {prod.map((p)=>{
                return(
                   
                    
            <div class="card" style={{height:"auto"}}>
                <img src={p.pictures}/>
              <h1>{p.name+" "+p.category}</h1>
              <div class="card-body text-center">
              <h5 class="card-title">Price:{p.price}</h5>
              <p>Stock:{p.stock}</p>
              <div class="btn_group">
              
                <button onClick={()=>{setI(p._id);setName(p.name);setCategory(p.category);setPictures(p.pictures);setPrice(p.price);setStock(p.stock)}} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                    Edit
                </button>
                <button class="btn btn-primary" onClick={()=>delet(p._id)}>
                    Delete
                </button>
                
              </div>
              </div>
              
              </div>
              
                )
            })}
            
              
                

            </div>
            </>
            }
            {data=="orders"&&
            <div className='parameters'>
            {ord.map((o)=>{
                
                
                
                return(
                    
            <div class="card" style={{height:"auto"}} onClick={()=>{setOrddet(o);setOrddetprod(getordprod(o.products));setOrddetuse(getName(o.owner._id));setOrddetdri(getName(o.driver))}} data-bs-toggle="modal" data-bs-target="#orderdetails">
                <p>{o.date}</p>
                <h1>{"Buyer: "+o.owner.name}</h1>
            <h1>{"Amount: "+o.total+"₹"}</h1>
            <div class="card-body text-center">
            {o.status!="processing"&&<h1>{"Driver: "}{getName(o.driver).name}</h1>}
            {o.status=="processing"&&<span class="badge text-bg-secondary">Processing</span>}
            {o.status=="shipped"&&<span class="badge text-bg-primary">Shipped</span>}
            {o.status=="delivered"&&<span class="badge text-bg-success">Delivered</span>}
            </div>
            </div>
                )
                })}
             
            </div>}
           
            
            
            

        </div>
        
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Form>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={nam}
          onChange={(e)=>setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Stock
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={stoc}
          onChange={(e)=>setStock(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Price
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={pric}
          onChange={(e)=>setPrice(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Picture URL
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={picture}
          onChange={(e)=>setPictures(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
      <InputGroup.Text id="inputGroup-sizing-default">
          Category
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={categor}
          onChange={(e)=>setCategory(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
      <Button onClick={()=>i?update():addProduct()}  data-bs-dismiss="modal" >Update</Button>
      </InputGroup>
      </Form>
      </div>
      
    </div>
  </div>
</div>
<div class="modal fade" id="orderdetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <div className='orddet'>
            <div class="card" style={{height:"auto"}}>
              <h1>Buyer</h1>
              {orddet!={}?<div class="card-body text-center">
              <h5 class="card-title">{"Name: "+orddetuse.name}</h5>
              <h5 class="card-title">{"Email: "+orddetuse.email}</h5>
              <h5 class="card-title">{"Phone: "+orddetuse.phone}</h5>
              <h5 class="card-title">{"Address: "+orddetuse.address}</h5>
              
              </div>:""}
              </div>
              <div class="card" style={{height:"auto"}}>
              <h1>Driver</h1>
              {orddet.driver?<div class="card-body text-center">
              <h5 class="card-title">{"Name: "+orddetdri.name}</h5>
              <h5 class="card-title">{"Email: "+orddetdri.email}</h5>
              <h5 class="card-title">{"Phone: "+orddetdri.phone}</h5>
              <h5 class="card-title">{"Address: "+orddetdri.address}</h5>
              <h5 class="card-title">{"Delivered Orders: "}{ordersof(orddet.driver)}</h5>
              </div>:""}
              </div>
              <div class="card" style={{height:"auto"}}>
              <h1>Products Ordered</h1>
              <div class="card-body text-center">
              {
                prod.filter((d)=>orddet.products[d._id]!=null).map((x)=>{
                  return (
                    <h5>{x.name+" : "+orddet.products[x._id]}</h5>
                  )
                })
              }
              </div>
              
              </div>
              <div class="card" style={{height:"auto"}}>
              <h1>Details</h1>
              <div class="card-body text-center">
              <h5 class="card-title">{"Date: "+orddet.date}</h5>
              <h5 class="card-title">{"Quantity: "+orddet.count}</h5>
              <h5 class="card-title">{"Status: "+orddet.status}</h5>
              <h5 class="card-title">{"Total Amount: "+orddet.total}</h5>
              
              </div>
              </div>
            </div>
      </div>
      
    </div>
  </div>
</div>
    </div>

  )
}

export default Admin