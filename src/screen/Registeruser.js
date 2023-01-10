import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import FormContainer from "../common/formController";
import { useDispatch,useSelector } from "react-redux";
import { RegisterUser } from "../redux/action/productListaction";


const Registerscreen = () => {
      const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("");
  const [confirmPassword,setConfirmPassword]=useState('');
  const [message,setMessage]=useState('');
  const {userRegister,userLoading,userInfo}=useSelector((state)=>state.getProductListFromReducer);
  console.log(userInfo)
  const dispatch=useDispatch();
  useEffect(()=>{
            if(Object.keys(userInfo).length!=0)
            {

              console.log(userInfo,Object.keys(userInfo).length);
              navigate("/")

            }
            
  },[userInfo])
  const submitHandler = (e) => {
      e.preventDefault() // this will prvent from going to the following url link and it also prevent from submitting the form
      if(password!=confirmPassword)
      setMessage('Passwor do not match')
      else
      dispatch(RegisterUser(name,email,password));
};
  const redirect = `/`;
  return (
    <>
    <FormContainer>
      <h1 style={{display:'flex',justifyContent:'center',color:'#e9e9e8',marginTop:5}}>Sign In</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
      
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirmpassword </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div style={{ marginTop: 10 }}>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </div>
      </Form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row className="py-2">
          <Col>
            Have an Account?
                  <Link to={redirect ? `/signup?redirect=${redirect}` : "/signin"} style={{marginLeft:4}}>
              login
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>

    </>
  );
};

export default Registerscreen;