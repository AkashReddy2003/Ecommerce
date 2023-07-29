import React,{useState,useEffect} from 'react'
import { useUserContext } from '../context/userContext';
import "./home2.css"
import axios from 'axios';
import loa from '../img/button.png';
const Product = () => {
    const {BASE_URL,user,setUse}=useUserContext();
    const [prod,setProd]=useState([]);
    const [load,setLoad]=useState(true);
    const getProducts=async()=>{
      await axios.get(BASE_URL+"product").then((res)=>{
          setProd(res.data);
      }).catch((e)=>{
          console.log(e);
      })
  }
  
  
    useEffect(()=>{
        
        
        setTimeout(()=>{getProducts();setLoad(false)},2000);
        
        
    },[])
  return (
    <>
    {load?
        <section id='load'>
            <img src={loa}/>
        </section>
        :
        <div id='product'>
        <div>
            <h1 class="text-center my-5">OUR PRODUCTS</h1>
            <div class="row">
            
             
                {prod.length>0?
                prod.map((p)=>{
                    const add=async()=>{
                        await axios.post(BASE_URL+"product/add-to-cart",{userId:user._id,productId:p._id,price:p.price}).then((res)=>{
                            setUse(res.data);
                            alert("Added")
                        }); 
                    }
                  return(
                    <div class="col-lg-4 col-md-4 col-12">
              <div class="card">
              <img src={p.pictures} class="card-img-top" />
              <div class="card-body text-center">
              <h5 class="card-title">{p.name+" "+p.category}</h5>
                <p>Price:{" "+p.price+"₹"} Stock:{" "+p.stock}</p>
              <a onClick={add} class="btn btn-primary">Add to Cart</a>
              </div>
              </div>
              </div>
                  )
                })
                :""}
              
              </div>
              </div>

        </div>}
        </>
    
        
  )
}

export default Product