import React, { useEffect, useState } from 'react'
import ban from '../img/banner.jpeg'
import { Carousel, Col,Container,Row } from 'react-bootstrap'
import { useUserContext } from '../context/userContext'
import axios from 'axios'
import "./home2.css"
import CategoryItem from './CategoryItem'
const Home2 = () => {
    const {BASE_URL}=useUserContext();
    const [categories,setCategories]=useState([]);
    const getCategories=async()=>{
        await axios.get(BASE_URL+"product/categories").then((res)=>{
            setCategories(res.data);
        })
    }
    getCategories()
    useEffect(()=>{
        getCategories();
    },[])
  return (
    <div className='main'>
        <div >
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ban}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ban}
          alt="Second slide"
        />

        
      </Carousel.Item>
      
    </Carousel>
    </div>
    <h1>Categories</h1>
        <div className='section'>
                {categories.map((cat)=>{
                    return(
                        <CategoryItem {...{cat}}/>
                    )
                })}
        </div>
    </div>
  )
}

export default Home2