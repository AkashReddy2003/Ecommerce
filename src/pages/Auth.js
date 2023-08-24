import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup';
import "./auth.css"
import {CiUser} from 'react-icons/ci';
import {AiOutlineEmail,AiOutlinePhone} from 'react-icons/ai';
import {TbPassword} from 'react-icons/tb';
import {FaRegAddressCard} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
function Auth() {
    const [state,setState]=useState("Sign Up");
    
    const data=()=>{
        switch(state){
            case "Log In":
                return <Login/>
            case "Sign Up":
                return <Signup/>
            default:
                return <Signup/>
        }
    }
  return (
    
    <div className='containe'>
      <div className='form_box'>
        <h1>Fresh Drinks</h1>
        <div className='btn_field'>
        <button type='button' className={state=="Sign Up"?"":"disable"} onClick={()=>setState("Sign Up")}>Sign up</button>
        <button type='button' className={state=="Log In"?"":"disable"} onClick={()=>setState("Log In")}>Log in</button>

      </div>
        {data()}
        
      </div>
    </div>
    
    
    
    
  )
}

export default Auth