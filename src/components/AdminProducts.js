import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, ListGroup ,Toast,Row,Col,InputGroup,FormControl,Form} from 'react-bootstrap'
import { useUserContext } from '../context/userContext';
import { AiFillDelete, AiFillEdit, AiOutlineAim, AiOutlinePlus } from "react-icons/ai";
import ProductEdit from './ProductEdit';
function AdminProducts() {
    const [prod,setProd]=useState([]);
    const {BASE_URL,setProdUpdate,prodUpdate}=useUserContext();
    const [show, setShow] = useState(false);
    const [nam,setName]=useState("");
    const [categor,setCategory]=useState("500ML");
    const [stoc,setStock]=useState("");
    const [pric,setPrice]=useState("");
    const [picture,setPictures]=useState("");
    const toggleShow = () => setShow(!show);
    const getProducts=async()=>{
        await axios.get(BASE_URL+"product").then((res)=>{
            setProd(res.data);
            setShow(false);
            setName("");
            setPictures("");
            setPrice("");
            setStock("");
            setCategory("500ML");
        }).catch((e)=>{
            console.log(e);
        })
    }
    const addProduct=async()=>{
      await axios.post(BASE_URL+"product",{name:nam,stock:stoc,price:pric,category:categor,pictures:picture}).then((res)=>{
        setProd(res.data);
      }).catch((e)=>{
        console.log(e);
      })
    }
    useEffect(()=>{
        getProducts();
    },[prodUpdate])
  return (
    <div style={{padding:"20px"}}>
    <Button onClick={toggleShow} style={{marginBottom:"10px"}}><AiOutlinePlus/>{"  ADD PRODUCT"}</Button>
    <Toast show={show} onClose={toggleShow} style={{zIndex:1,position:"absolute"}} >
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
      <Button onClick={addProduct}>ADD</Button>
      </InputGroup>
    
      </Form>
        </Toast>
    <ListGroup as="ol">
        {prod.map((p)=>{
            return(
                <ProductEdit{...p}/>
            )
        })}
    </ListGroup>
    </div>
  )
}

export default AdminProducts