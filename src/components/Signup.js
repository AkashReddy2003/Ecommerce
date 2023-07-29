import React, { useState } from 'react'
import {Button, Form,Row,Col} from 'react-bootstrap';
import "./box.css"
import { useUserContext } from '../context/userContext';
import "../pages/auth.css"
import {CiUser} from 'react-icons/ci';
import {AiOutlineEmail,AiOutlinePhone} from 'react-icons/ai';
import {TbPassword} from 'react-icons/tb';
import {FaRegAddressCard} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
function Signup() {
    const {signup}=useUserContext();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [name,setName]=useState("");
  return (
    <div className='input_group'>
    
        <div className="input_field">
        <i><CiUser/></i>
        <input type="text" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
        <div className="input_field">
        <i><HiOutlineMail/></i>
        <input type="email" placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
        
        <div className="input_field">
        <i><TbPassword/></i>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
       
      
        <div className="input_field">
        <i><AiOutlinePhone/></i>
        <input type="text" placeholder="Phone No" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </div>
        
        <div className="input_field">
        <i><FaRegAddressCard/></i>
        <input type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
      </div>
        <button className='sub' onClick={()=>signup(name,email,password,phone,address)}>Submit</button>
    </div>
  )
}

export default Signup