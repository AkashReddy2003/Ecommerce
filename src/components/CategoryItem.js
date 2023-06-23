import React,{useEffect, useState} from 'react'
import { Col,Modal,Card,Button, Row } from 'react-bootstrap'
import { useUserContext } from '../context/userContext';
import axios from 'axios';
const CategoryItem = ({cat}) => {
    
  const [show, setShow] = useState(false);
  const {BASE_URL,user,setUse}=useUserContext();
const [prod,setProd]=useState([]);
  const getProd=async()=>{
    await axios.get(BASE_URL+"product/category/"+cat).then((res)=>{
        setProd(res.data);
        console.log(res.data);
    }).catch((e)=>{
        console.log(e);
    })
  }
  useEffect(()=>{
    getProd()
  },[])
  
  
  return (
    <>
        <Col className='cat_item' onClick={()=>setShow(true)} style={{backgroundColor:"#1F6E8C",color:"#F1C27B"}}>
            <h2>{cat}</h2>
        
        </Col>
        <Modal show={show} fullscreen="xxl-down" onHide={() => setShow(false)} style={{minHeight:"700px"}}>
        <Modal.Header closeButton>
          <Modal.Title onClick={()=>setShow(false)}>{cat+" Products"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {prod.map((p)=>{
                const add=async()=>{
                    await axios.post(BASE_URL+"product/add-to-cart",{userId:user._id,productId:p._id,price:p.price}).then((res)=>{
                        setUse(res.data);
                        alert("Added")
                    });
                    
                }
                if(p.stock>0){
                return(
                    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={p.pictures} style={{height:"200px"}}/>
      <Card.Body>
        <Card.Title>{p.name}</Card.Title>
        <Card.Text>
          Price:{" "+p.price}<br/>
          Stock:{" "+p.stock}
        </Card.Text>
        <Button variant="primary" onClick={add}>Add to cart</Button>
      </Card.Body>
    </Card>
                )}
            })
          }
            </Row>
        </Modal.Body>
      </Modal>
      </>
   
  )
}

export default CategoryItem