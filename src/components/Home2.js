import React, { useEffect, useState } from 'react'

import "./home2.css"
import about from '../img/about.jpg';
import loa from '../img/button.png';

const Home2 = ({setData}) => {
  const [load,setLoad]=useState(true);
  useEffect(()=>{
        
    setTimeout(()=>{setLoad(false)},500);
    
    
  },[])
  return (
    <>
    {load?
      <section id='load'>
          <img src={loa}/>
      </section>
      :
    <div className='main'>
        <section id='home'>
          <h1 class="text-center">Fresh Drinks</h1>
          <p>Refreshing Deals on PepsiCo Soft Drinks: Wholesale Goodness Delivered to Your Doorstep!</p>
          <button onClick={()=>{setData("product")}}>Buy Now</button>
        </section>
        <section id='about'>
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <img src={about} class="image-fluid"/>
              </div>
              <div class="col-lg-6 col-md-6 col-12 p-lg-12 p-15">
                <h1>ABOUT US</h1>
                <p>We're here to bring you tasty drinks in a big way! We have a bunch of different sodas that we sell. You can find them in our real stores that you can visit, or on our website if you like shopping online.

We've been doing this since 2000, making sure parties, businesses, and events have yummy drinks. We have old-time favorites and new flavors too. Whether you like classics or something new, we've got drinks for all times. So, let's enjoy together – because at Fresh Drinks, we're not just selling drinks, we're making moments refreshing!</p>
              </div>

            </div>

          </div>

        </section>

        
    </div>}
    </>
  )
}

export default Home2