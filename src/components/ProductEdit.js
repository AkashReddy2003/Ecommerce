import axios from 'axios';
import React,{useEffect, useState} from 'react'
import {Toast,InputGroup,Form,Row,Col,Button,ListGroup} from 'react-bootstrap'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useUserContext } from '../context/userContext';
const ProductEdit = ({_id,name,category,stock,price,pictures}) => {
  
    const {BASE_URL,setProdUpdate,prodUpdate}=useUserContext();
    const [show, setShow] = useState(false);
    const [nam,setName]=useState(name);
    const [categor,setCategory]=useState(category);
    const [stoc,setStock]=useState(stock);
    const [pric,setPrice]=useState(price);
    const [picture,setPictures]=useState(pictures);
    const toggleShow = () => setShow(!show);
    const update=async()=>{
        await axios.patch(BASE_URL+"product/"+_id,{name:nam,price:pric,category:categor,stock:stoc,pictures:picture}).then((res)=>{
            setShow(false);
            setProdUpdate(!prodUpdate);
        }).catch((e)=>{
            console.log(e);
        })

    }
    const delet=async()=>{
        await axios.delete(BASE_URL+"product/"+_id).then((res)=>{
            setProdUpdate(!prodUpdate);
        }).catch((e)=>{
            console.log(e);
        })
    }
    
    useEffect(()=>{

    },[show])
    
  return (
    <ListGroup.Item as="li" >
                    <Row>
                        <Col>
                        <img
              src={pictures}
              
              alt=""
              style={{maxHeight:"50px"}}
            />
                        </Col>
                        <Col>
                        {name}
                        </Col>
                        <Col>
                        {category}
                        </Col>
                        <Col>
                        {stock}
                        </Col>
                        <Col>
                        {price}
                        </Col>
                        <Col>
                        <Button onClick={toggleShow}><AiFillEdit/></Button>
                        {"   "}
                        <Button onClick={delet}><AiFillDelete/></Button>
                        </Col>
                    </Row>

                
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
      <Button onClick={()=>update()}>Update</Button>
      </InputGroup>
    
      </Form>
        </Toast>
        </ListGroup.Item>
  )
}

export default ProductEdit