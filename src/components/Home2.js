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
          <h1 class="text-center">Wholesale SoftDrinks</h1>
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
                <p> totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
              </div>

            </div>

          </div>

        </section>

        
    </div>}
    </>
  )
}

export default Home2